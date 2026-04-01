# RepoGuardian AI

## Description
RepoGuardian AI is a tool designed to analyze code repositories, providing insights into project summaries, bugs, security issues, and potential improvements using AI. It reads JavaScript and Python files from the repository and generates a comprehensive report based on user input.

## Features
- **Hybrid Intelligence Mode**: Combines AI analysis with user input for detailed insights.
- **Code Analysis**: Automatically reads and analyzes `.js` and `.py` files in the repository.
- **Custom Reports**: Generate summaries, bug lists, security issues, and improvement suggestions.
- **Documentation Generation**: Create a clean README-style documentation for the project.

## How to Run
1. **Install Dependencies**: Ensure you have Node.js installed. Run `npm install` to install necessary packages.
2. **Set Up Environment**: Create a `.env` file in the root directory and add your API key:
   ```
   API_KEY=your_api_key_here
   ```
3. **Run the Tool**: Execute the script with the desired mode:
   ```
   node run.js [mode]
   ```
   Replace `[mode]` with one of the following options:
   - `summary`: Get a project summary.
   - `bugs`: List potential bugs.
   - `security`: Identify security issues.
   - `improvements`: Suggest improvements.
   - `docs`: Generate documentation.
   - Leave blank for hybrid analysis (default). 

Make sure to run the script in the directory containing your code files.