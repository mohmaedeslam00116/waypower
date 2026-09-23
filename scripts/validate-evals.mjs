#!/usr/bin/env node
// Structural eval gate for the waypower pack.
// Behavioral paired runs (baseline vs with-skill) stay manual per
// authoring-skills — this script gates what CI can guarantee:
// frontmatter validity, evals.json shape, and the required eval mix
// (happy-path + temptation + positive/negative trigger checks).
//
// Usage: node scripts/validate-evals.mjs   (exit 1 + report on failure)

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SKILLS_DIR = new URL('../skills', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

const failures = [];
const fail = (skill, msg) => failures.push(`${skill}: ${msg}`);

function parseFrontmatter(skill, content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return fail(skill, 'SKILL.md has no YAML frontmatter block');
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }
  return fm;
}

const skills = readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (skills.length === 0) {
  console.error('No skills found under skills/');
  process.exit(1);
}

for (const skill of skills) {
  const dir = join(SKILLS_DIR, skill);

  // --- SKILL.md frontmatter ---
  const skillPath = join(dir, 'SKILL.md');
  if (!existsSync(skillPath)) {
    fail(skill, 'missing SKILL.md');
    continue;
  }
  const fm = parseFrontmatter(skill, readFileSync(skillPath, 'utf8'));
  if (!fm) continue;
  if (fm.name !== skill) fail(skill, `frontmatter name "${fm.name}" != directory "${skill}"`);
  if (!/^[a-z0-9-]+$/.test(fm.name ?? '')) fail(skill, `name "${fm.name}" must be kebab-case`);
  if (!fm.description) fail(skill, 'frontmatter missing description');
  else if (fm.description.length > 1024)
    fail(skill, `description is ${fm.description.length} chars (max 1024)`);

  // --- evals/evals.json shape ---
  const evalsPath = join(dir, 'evals', 'evals.json');
  if (!existsSync(evalsPath)) {
    fail(skill, 'missing evals/evals.json');
    continue;
  }
  let evals;
  try {
    evals = JSON.parse(readFileSync(evalsPath, 'utf8')).evals;
  } catch (e) {
    fail(skill, `evals.json does not parse: ${e.message}`);
    continue;
  }
  if (!Array.isArray(evals) || evals.length < 4) {
    fail(skill, `needs >= 4 evals (happy, temptation, +trigger, -trigger), found ${evals?.length}`);
    continue;
  }
  for (const e of evals) {
    const tag = `eval ${e?.id ?? '?'}`;
    if (typeof e?.id !== 'number') fail(skill, `${tag}: missing numeric id`);
    if (!e?.prompt?.trim()) fail(skill, `${tag}: empty prompt`);
    if (!e?.expected_output?.trim()) fail(skill, `${tag}: empty expected_output`);
    if (!Array.isArray(e?.expectations) || e.expectations.length === 0)
      fail(skill, `${tag}: expectations must be a non-empty array`);
    else if (e.expectations.some((x) => typeof x !== 'string' || !x.trim()))
      fail(skill, `${tag}: expectations contain empty entries`);
  }
  const outputs = evals.map((e) => e.expected_output.toLowerCase());
  const isTrigger = (s) => s.includes('trigger check');
  if (!outputs.some((s) => s.includes('trigger check (positive)')))
    fail(skill, 'no positive trigger-check eval');
  if (!outputs.some((s) => s.includes('trigger check (negative)')))
    fail(skill, 'no negative trigger-check eval');
  if (outputs.filter((s) => !isTrigger(s)).length < 2)
    fail(skill, 'needs at least 2 behavioral evals (happy path + temptation)');
}

if (failures.length) {
  console.error(`Eval gate FAILED — ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`Eval gate OK — ${skills.length} skills, all structurally valid.`);
