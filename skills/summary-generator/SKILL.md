\---



name: summary-generator

description: Generates an intelligent repository health report with trust scoring and actionable insights

allowed-tools: Read

\-------------------



\# Summary Generator



\## Purpose



Provide a comprehensive, decision-ready assessment of repository health by synthesizing findings from bug, security, and improvement analyses.



\---



\## Execution Strategy



\* Aggregate results from:



&#x20; \* Bug Analyzer

&#x20; \* Security Analyzer

&#x20; \* Improvement Engine

\* Categorize issues by severity and type

\* Identify the most critical risks affecting the repository

\* Evaluate overall code reliability, security posture, and maintainability



\---



\## Trust Score Calculation



Calculate a trust score (0–100) based on weighted factors:



\* Security Issues → 40% weight

\* Bugs \& Reliability → 30% weight

\* Code Quality \& Maintainability → 20% weight

\* Documentation \& Readability → 10% weight



Deduct points based on severity and frequency of issues.



\---



\## Decision Framework



Determine repository status:



\* 🟢 \*\*Production Ready\*\* → Minimal issues, no critical risks

\* 🟡 \*\*Needs Improvement\*\* → Moderate issues, manageable risks

\* 🔴 \*\*High Risk\*\* → Critical vulnerabilities or major instability



\---



\## Reasoning Guidelines



\* Highlight the most impactful issues first

\* Explain \*why\* the repository received its trust score

\* Provide a clear recommendation developers can act on

\* Avoid overloading with raw data — focus on meaningful insights



\---



\## Output Format



Generate a structured report:



\### 📊 Repository Health Summary



\* Total Issues: X

\* Critical Issues: X

\* Security Risks: X

\* Improvement Areas: X



\### 🔍 Key Findings



\* Top 3–5 most critical issues with impact



\### 📈 Trust Score



\* Score: XX/100

\* Risk Level: Low / Medium / High



\### 🧠 AI Insight



\* Brief interpretation of repository condition



\### 🚨 Recommendation



\* Final decision (Production Ready / Needs Improvement / High Risk)

\* Suggested next steps



\---



\## Example Output



📊 Repository Health Summary



\* Total Issues: 12

\* Critical Issues: 3

\* Security Risks: 4



📈 Trust Score: 68/100

Risk Level: Medium



🧠 AI Insight:

The repository contains multiple security risks and moderate code instability. While functional, it is not safe for production deployment without fixes.



🚨 Recommendation:

Needs Improvement — address security vulnerabilities and critical bugs before deployment.



