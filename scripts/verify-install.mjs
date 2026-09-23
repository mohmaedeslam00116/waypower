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
  report = JSON.parse(readFileSync(reportPath, 'utf8'));
} catch (e) {
  console.error(`install report does not parse: ${e.message}`);
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
