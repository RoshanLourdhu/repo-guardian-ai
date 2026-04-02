\---



name: security-analyzer

description: Detects security vulnerabilities, unsafe patterns, and potential attack vectors with risk-based analysis

allowed-tools: Read

\-------------------



\# Security Analyzer



\## Purpose



Identify security vulnerabilities, misconfigurations, and unsafe coding practices that could expose the system to attacks or data breaches.



\---



\## Execution Strategy



\* Scan all supported files while ignoring irrelevant directories (e.g., node\_modules, .git)

\* Detect:



&#x20; \* Hardcoded secrets (API keys, tokens, credentials)

&#x20; \* Unsafe code execution (e.g., eval, dynamic execution)

&#x20; \* Insecure input handling (lack of validation or sanitization)

&#x20; \* Potential injection points (SQL, command, script injection)

&#x20; \* Misconfigurations or exposed sensitive data

\* Evaluate each finding based on exploitability and potential impact

\* Prioritize issues based on severity



\---



\## Risk Classification



Categorize findings as:



\* 🔴 Critical — Immediate exploitation risk (e.g., exposed API keys, arbitrary code execution)

\* 🟠 High — Serious vulnerabilities affecting security or data integrity

\* 🟡 Medium — Potential weaknesses that could be exploited under certain conditions

\* 🟢 Low — Minor risks or best practice violations



\---



\## Reasoning Guidelines



\* Explain \*how\* the vulnerability can be exploited

\* Describe the potential real-world impact (data leak, system compromise, unauthorized access)

\* Avoid false positives by considering context

\* Focus on actionable and relevant security risks



\---



\## Output Format



Produce a structured security report including:



\* 🔴 Critical Vulnerabilities

\* 🟠 High Risk Issues

\* 🟡 Medium Risk Issues

\* 🟢 Low Risk Observations



Each issue must include:



\* File name

\* Approximate location

\* Description of vulnerability

\* Exploitation risk

\* Suggested mitigation (if applicable)



\---



\## Example Output



\* Hardcoded API key found in config.js (line 12)

&#x20; → Risk: Unauthorized access if exposed publicly

&#x20; → Impact: External systems may be compromised



\* Unsafe eval usage in parser.js

&#x20; → Risk: Arbitrary code execution

&#x20; → Impact: Full system compromise possible



