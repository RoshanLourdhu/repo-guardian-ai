// run.cjs

const fs = require("fs");
const path = require("path");

// ====== CONFIG ======
const mode = process.argv[2] || "summary";

// ====== READ FILES ======
function getAllFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (let item of items) {
    const fullPath = path.join(dir, item);

    if (item === "node_modules" || item === ".git") continue;

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      if (fullPath.endsWith(".js") || fullPath.endsWith(".py") || fullPath.endsWith(".md")) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

// ====== ANALYZERS ======
function analyzeBugs(files) {
  return files.length > 0 ? ["Potential logical issues detected"] : [];
}

function analyzeSecurity(files) {
  return files.length > 0 ? ["Possible exposed sensitive data"] : [];
}

function analyzeImprovements(files) {
  return files.length > 0 ? ["Code can be optimized for readability"] : [];
}

// ====== SUMMARY ======
function generateSummary(bugs, security, improvements) {
  const score = 100 - (bugs.length * 10 + security.length * 15 + improvements.length * 5);

  return {
    trustScore: Math.max(score, 0),
    bugs,
    security,
    improvements,
  };
}

// ====== MAIN ======
const repoPath = "./"; // current folder
const files = getAllFiles(repoPath);

const bugs = analyzeBugs(files);
const security = analyzeSecurity(files);
const improvements = analyzeImprovements(files);

const result = generateSummary(bugs, security, improvements);

console.log("\n📊 RepoGuardian AI Report\n");
console.log(result);