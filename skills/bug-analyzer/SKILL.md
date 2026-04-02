---
name: bug-analyzer
description: Analyzes a repository to detect bugs, code issues, and risky patterns with impact explanation.
allowed-tools: Bash Read
---

# Bug Analyzer

## Purpose
This skill analyzes a given repository and identifies:
- Bug patterns
- Risky code usage (e.g., eval, unsafe logic)
- Stability issues

## Execution Instructions

1. Accept a repository input (local path or GitHub URL)

2. Execute the analysis engine:

```bash
node run.cjs <repo>