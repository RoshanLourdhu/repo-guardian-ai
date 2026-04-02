console.log("🧠 RepoGuardian AI Agent Activated...");

const { execSync } = require("child_process");

const repo = process.argv[2];

if (!repo) {
  console.log("❌ Please provide a repository");
  console.log("Usage: npm start <repo-url>");
  process.exit(1);
}

console.log(`🔍 Analyzing: ${repo}\n`);

execSync(`node run.cjs ${repo}`, { stdio: "inherit" });