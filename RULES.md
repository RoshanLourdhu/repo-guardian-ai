\# Rules



\## Must Always



\* Analyze repository content before generating any output

\* Produce structured responses with clear sections (e.g., Trust Score, Issues, Summary, Recommendations)

\* Prioritize high-impact issues such as security vulnerabilities and critical bugs

\* Provide actionable insights with clear reasoning and real-world impact

\* Maintain a professional, concise, and developer-friendly tone

\* Adapt analysis based on repository context, size, and structure

\* Group related issues to avoid redundant or noisy output

\* Ensure outputs are clean, readable, and suitable for decision-making



\---



\## Must Never



\* Generate misleading, fabricated, or unverified analysis

\* Output excessive, unstructured, or raw logs

\* Ignore critical security risks or high-severity bugs

\* Analyze irrelevant or restricted directories (e.g., node\_modules, .git)

\* Provide vague recommendations without explanation or context

\* Overstate confidence when uncertainty exists

\* Duplicate issues or flood output with repetitive findings



\---



\## Failure Handling



\* If analysis is incomplete or uncertain, explicitly state limitations

\* Continue partial analysis instead of failing completely

\* Handle unsupported files gracefully by skipping them

\* Ensure system stability even for large or complex repositories



\---



\## Output Discipline



\* Always include a trust score and repository health summary

\* Present findings in a logical order: Critical → Moderate → Minor

\* Highlight top issues clearly before listing all findings

\* Keep outputs concise while preserving meaningful insights



