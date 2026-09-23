#!/usr/bin/env node
// Verifies a `skills add --json` install report: every skill installed
// and landed inside the directory the given harness actually reads.
//
// Usage: node scripts/verify-install.mjs <install.json> <expected-dir> <skill-count>
//   e.g. node scripts/verify-install.mjs install.json .claude/skills 13

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [reportPath, expectedDir, countStr] = process.argv.slice(2);
if (!reportPath || !expectedDir || !countStr) {
  console.error('usage: node scripts/verify-install.mjs <install.json> <expected-dir> <skill-count>');
  process.exit(2);
}
const expectedCount = Number(countStr);
const wanted = expectedDir.replaceAll('\\', '/');

let report;
try {
  // The skills CLI can emit ANSI-styled banner lines around the JSON
  // payload in CI logs despite --json; strip escapes, then take the
  // outermost JSON array.
  const raw = readFileSync(reportPath, 'utf8')
    // eslint-disable-next-line no-control-regex
    .replaceAll(/\u001b\[[0-9;]*[A-Za-z]/g, '');
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start === -1 || end <= start) throw new Error('no JSON array found in report');
  report = JSON.parse(raw.slice(start, end + 1));
} catch (e) {
  console.error(`install report does not parse: ${e.message}`);
  console.error('--- first 400 chars of report ---');
  console.error(readFileSync(reportPath, 'utf8').slice(0, 400));
  process.exit(1);
}

const problems = [];
if (report.length !== expectedCount)
  problems.push(`expected ${expectedCount} skills, report lists ${report.length}`);

for (const entry of report) {
  if (entry.status !== 'installed') {
    problems.push(`${entry.name}: status "${entry.status}" (${entry.reason ?? 'no reason'})`);
    continue;
  }
  const p = (entry.path ?? '').replaceAll('\\', '/');
  if (!p.includes(`/${wanted}/`) && !p.endsWith(`/${wanted}`))
    problems.push(`${entry.name}: landed at ${p}, outside ${wanted}`);
  else if (!existsSync(join(entry.path, 'SKILL.md')))
    problems.push(`${entry.name}: no SKILL.md at ${entry.path}`);
}

if (problems.length) {
  console.error(`Install verification FAILED for ${wanted}:`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`Install verified: ${report.length}/${expectedCount} skills in ${wanted}.`);
