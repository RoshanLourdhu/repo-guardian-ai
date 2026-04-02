const fs = require("fs");
const path = require("path");

const skills = [
  {
    name: "bug-analyzer",
    content: `---
name: bug-analyzer
description: Detects bugs and potential issues in repository code
allowed-tools: Bash Read
---

# Bug Analyzer

## Instructions
Run: node run.cjs bugs
`
  },
  {
    name: "security-analyzer",
    content: `---
name: security-analyzer
description: Identifies security vulnerabilities in repository
allowed-tools: Bash Read
---

# Security Analyzer

## Instructions
Run: node run.cjs security
`
  },
  {
    name: "improvement-engine",
    content: `---
name: improvement-engine
description: Suggests improvements for code quality
allowed-tools: Bash Read
---

# Improvement Engine

## Instructions
Run: node run.cjs improvements
`
  },
  {
    name: "summary-generator",
    content: `---
name: summary-generator
description: Generates repository summary and trust score
allowed-tools: Bash Read
---

# Summary Generator

## Instructions
Run: node run.cjs summary
`
  }
];

fs.mkdirSync("skills", { recursive: true });

skills.forEach(skill => {
  const dir = path.join("skills", skill.name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "SKILL.md"), skill.content, { encoding: "utf8" });
});

console.log("✅ Skills created cleanly");