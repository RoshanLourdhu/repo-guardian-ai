\---



name: improvement-engine

description: Provides context-aware optimizations to improve code quality, performance, and maintainability

allowed-tools: Read

\-------------------



\# Improvement Engine



\## Purpose



Enhance repository quality by identifying inefficiencies, improving maintainability, and recommending scalable engineering practices.



\---



\## Execution Strategy



\* Analyze code structure, duplication, and complexity

\* Detect:



&#x20; \* Redundant or repeated logic

&#x20; \* Inefficient algorithms or patterns

&#x20; \* Poor modularization or tightly coupled code

&#x20; \* Lack of documentation or unclear naming

\* Evaluate improvements based on real-world impact (performance, readability, scalability)

\* Avoid over-optimization; focus only on meaningful improvements



\---



\## Reasoning Guidelines



\* Explain \*why\* an improvement is beneficial

\* Highlight impact on:



&#x20; \* Performance

&#x20; \* Maintainability

&#x20; \* Scalability

\* Prefer practical, implementable suggestions over theoretical ones

\* Avoid suggesting changes that introduce unnecessary complexity



\---



\## Output Format



Produce structured suggestions categorized as:



\* ⚡ Performance Improvements

\* 🧩 Code Quality \& Maintainability

\* 📚 Documentation \& Readability



Each suggestion must include:



\* File name or area

\* Description of current issue

\* Recommended improvement

\* Expected benefit



\---



\## Example Output



\* Duplicate logic found in utils.js and helpers.js

&#x20; → Refactor into a shared module to reduce redundancy and improve maintainability



\* Inefficient loop in dataProcessor.py

&#x20; → Replace nested loop with hashmap lookup to improve performance from O(n²) to O(n)



