const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const readline = require("readline");
const http = require("http");
const { exec } = require("child_process");

const git = simpleGit();

// 🟢 Ensure Ollama
function ensureOllamaRunning() {
    return new Promise((resolve) => {
        const req = http.request(
            { hostname: "localhost", port: 11434, path: "/", method: "GET" },
            () => {
                console.log("🟢 Ollama is running");
                resolve();
            }
        );

        req.on("error", () => {
            console.log("⚠️ Starting Ollama...");
            exec("ollama serve");
            setTimeout(resolve, 4000);
        });

        req.end();
    });
}

// 📥 Clone repo
async function cloneRepo(repoUrl) {

    // 🔥 Extract repo name dynamically
    const repoName = repoUrl.split("/").pop().replace(".git", "");
    const folder = `repos/${repoName}`;

    if (fs.existsSync(folder)) {
        console.log("⚡ Using cached repository:", repoName);
        return folder;
    }

    console.log("📥 Cloning repo:", repoName);

    await git.clone(repoUrl.trim(), folder, ["--depth", "1"]);

    console.log("✅ Repo cloned");

    return folder;
}

// 📂 Scan files
function scanFiles(dir) {
    let files = [];
    const ignore = ["node_modules", ".git", "dist", "build"];

    for (const item of fs.readdirSync(dir)) {
        if (ignore.includes(item)) continue;

        const full = path.join(dir, item);

        if (fs.statSync(full).isDirectory()) {
            files = files.concat(scanFiles(full));
        } else if (
            item.endsWith(".js") ||
            item.endsWith(".ts") ||
            item.endsWith(".jsx") ||
            item.endsWith(".tsx")
        ) {
            files.push({
                file: full,
                content: fs.readFileSync(full, "utf-8")
            });
        }
    }

    return files;
}

// 📊 Metrics
function calculateMetrics(files) {
    let evalCount = 0, consoleCount = 0, httpCount = 0;

    files.forEach(f => {
        if (f.content.includes("eval(")) evalCount++;
        if (f.content.includes("console.log")) consoleCount++;
        if (f.content.includes("http://")) httpCount++;
    });

    return { evalCount, consoleCount, httpCount };
}

// 🧠 Detect type
function detectType(files) {
    const text = files.slice(0, 50).map(f => f.content).join(" ").toLowerCase();

    if (text.includes("react")) return "Frontend";
    if (text.includes("express")) return "Backend";
    return "General";
}

// 🟢 Strong summaries
function buildSummaries(files) {
    return files.map(f => {
        const c = f.content.toLowerCase();

        let parts = [];

        if (c.includes("react")) parts.push("react components");
        if (c.includes("useeffect") || c.includes("usestate")) parts.push("hooks");
        if (c.includes("render")) parts.push("ui rendering");
        if (c.includes("eval(")) parts.push("eval risk");
        if (c.includes("http://")) parts.push("http risk");

        if (parts.length === 0) parts.push("general logic");

        return { file: f.file, summary: parts.join(", ") };
    });
}

// 🧠 Intent detection
function detectIntent(q) {
    const l = q.toLowerCase();

    if (l.includes("how many") || l.includes("count")) return "count";
    if (l.includes("what is") || l.includes("explain")) return "concept";
    if (l.includes("summary") || l.includes("about")) return "summary";
    if (l.includes("vulnerab") || l.includes("issues")) return "security";
    if (l.includes("run") || l.includes("install")) return "setup";

    return "general";
}

// 🧠 Ollama call
function callOllama(prompt) {
    return new Promise((resolve) => {

        if (prompt.length > 3500) {
            prompt = prompt.slice(0, 3500);
        }

        const data = JSON.stringify({
            model: "llama3",
            prompt,
            stream: false
        });

        const req = http.request({
            hostname: "localhost",
            port: 11434,
            path: "/api/generate",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length
            }
        }, res => {

            let body = "";

            res.on("data", chunk => body += chunk);

            res.on("end", () => {
                try {
                    const parsed = JSON.parse(body);
                    if (!parsed.response || parsed.response.trim() === "") {
                        resolve("⚠️ AI couldn't answer from repo context.");
                    } else {
                        resolve(parsed.response);
                    }
                } catch {
                    resolve("⚠️ AI parsing error.");
                }
            });
        });

        req.on("error", () => resolve("❌ Ollama not reachable"));
        req.write(data);
        req.end();
    });
}

// 🚀 MAIN
async function main() {

    await ensureOllamaRunning();

    const repoUrl = process.argv[2];

    if (!repoUrl) {
        console.log("❌ Usage: npm start <repo-url>");
        process.exit(1);
    }

    console.log("🧠 RepoGuardian AI Agent Activated...");
    console.log("🔍 Analyzing:", repoUrl);

    const repoPath = await cloneRepo(repoUrl);

    console.log("🔍 Scanning repo...");
    const files = scanFiles(repoPath);

    const summaries = buildSummaries(files);
    const metrics = calculateMetrics(files);
    const type = detectType(files);

    let score = 100;
    score -= metrics.evalCount ? 10 : 0;
    score -= metrics.consoleCount > 50 ? 10 : 0;
    score -= metrics.httpCount ? 5 : 0;

    let risk = score < 60 ? "HIGH" : score < 80 ? "MEDIUM" : "LOW";

    console.log("\n===========================================");
    console.log("📊 REPO ANALYSIS REPORT");
    console.log("===========================================\n");

    console.log("📌 Repo:", repoUrl);
    console.log("📁 Files:", files.length);
    console.log("🧠 Type:", type);

    console.log("\n-------------------------------------------\n");

    console.log("📊 Score:", score + "/100");
    console.log("⚠️ Risk:", risk);

    console.log("\n-------------------------------------------\n");

    console.log("🚨 Vulnerabilities:");
    console.log(`• eval → ${metrics.evalCount} (code execution risk)`);
    console.log(`• console.log → ${metrics.consoleCount} (data exposure)`);
    console.log(`• HTTP → ${metrics.httpCount} (insecure communication)`);

    console.log("\n📊 Metrics:");
    console.log(metrics);

    console.log("\n💬 Ask anything (type 'exit')");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask() {
        rl.question("\n👉 You: ", async (q) => {

            const lower = q?.toLowerCase().trim();

            if (!q || lower === "exit") {
                console.log("👋 Exiting...");
                rl.close();
                return;
            }

            const intent = detectIntent(q);

            // COUNT
            if (intent === "count") {
                if (lower.includes("eval"))
                    return console.log(`🤖 AI: eval is used ${metrics.evalCount} times.`), ask();

                if (lower.includes("console"))
                    return console.log(`🤖 AI: console.log is used ${metrics.consoleCount} times.`), ask();

                if (lower.includes("http"))
                    return console.log(`🤖 AI: HTTP is used ${metrics.httpCount} times.`), ask();
            }

            // SUMMARY
            if (intent === "summary") {
                const prompt = `
Repo Type: ${type}
Files: ${files.length}

Summaries:
${summaries.slice(0, 20).map(s => s.summary).join(", ")}

Give a repository-specific summary.
`;
                const ans = await callOllama(prompt);
                console.log("\n🤖 AI:", ans);
                return ask();
            }

            // CONCEPT
            if (intent === "concept") {
                const prompt = `
Explain in JavaScript context:

${q}

Relate to repo if possible.
`;
                const ans = await callOllama(prompt);
                console.log("\n🤖 AI:", ans);
                return ask();
            }

            // SECURITY
            if (intent === "security" || lower.includes("issues")) {
                const prompt = `
You are RepoGuardian AI.

Use ONLY the data below.

eval: ${metrics.evalCount}
console.log: ${metrics.consoleCount}
http: ${metrics.httpCount}

Explain vulnerabilities clearly.
`;
                const ans = await callOllama(prompt);
                console.log("\n🤖 AI:", ans);
                return ask();
            }

            // SETUP
            if (intent === "setup") {
                const prompt = `
Explain how to run a ${type} JavaScript project locally.
`;
                const ans = await callOllama(prompt);
                console.log("\n🤖 AI:", ans);
                return ask();
            }

            // GENERAL
            const prompt = `
Answer ONLY from repo context.

Repo Type: ${type}
Files: ${files.length}

${summaries.slice(0, 10).map(s => s.summary).join(", ")}

Question:
${q}
`;

            const ans = await callOllama(prompt);
            console.log("\n🤖 AI:", ans);

            ask();
        });
    }

    ask();
}

main();