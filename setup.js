import fs from "fs";
import path from "path";

const baseDir = "repo-guardian-rag";

function createFile(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
}

// 📁 Create base folder
fs.mkdirSync(baseDir, { recursive: true });

// 📦 package.json
createFile(`${baseDir}/package.json`, `
{
  "name": "repo-guardian-rag",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "chromadb": "^1.8.1",
    "node-fetch": "^3.3.2"
  }
}
`);

// 📄 chunk.js
createFile(`${baseDir}/chunk.js`, `
export function chunkFile(content, chunkSize = 300, overlap = 50) {
    const lines = content.split("\\n");
    let chunks = [];

    for (let i = 0; i < lines.length; i += (chunkSize - overlap)) {
        const chunk = lines.slice(i, i + chunkSize).join("\\n");

        chunks.push({
            text: chunk,
            startLine: i,
            endLine: i + chunkSize
        });
    }

    return chunks;
}
`);

// 📄 embed.js
createFile(`${baseDir}/embed.js`, `
import fetch from "node-fetch";

export async function getEmbedding(text) {
    const res = await fetch("http://localhost:11434/api/embeddings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "nomic-embed-text",
            prompt: text
        })
    });

    const data = await res.json();
    return data.embedding;
}
`);

// 📄 vectorStore.js
createFile(`${baseDir}/vectorStore.js`, `
import { ChromaClient } from "chromadb";

const client = new ChromaClient();

export const collection = await client.getOrCreateCollection({
    name: "repo-code"
});
`);

// 📄 scanner.js
createFile(`${baseDir}/scanner.js`, `
import fs from "fs";
import path from "path";
import { chunkFile } from "./chunk.js";
import { getEmbedding } from "./embed.js";
import { collection } from "./vectorStore.js";

async function processFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkFile(content);

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];

        const embedding = await getEmbedding(chunk.text);

        await collection.add({
            ids: [\`\${filePath}-\${i}\`],
            embeddings: [embedding],
            metadatas: [{ file: filePath }],
            documents: [chunk.text]
        });

        console.log(\`Indexed: \${filePath} chunk \${i}\`);
    }
}

export async function scanRepo(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            await scanRepo(fullPath);
        } else if (file.endsWith(".js")) {
            await processFile(fullPath);
        }
    }
}
`);

// 📄 llm.js
createFile(`${baseDir}/llm.js`, `
import fetch from "node-fetch";

export async function askLLM(prompt) {
    const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "llama3",
            prompt: prompt,
            stream: false
        })
    });

    const data = await res.json();
    return data.response;
}
`);

// 📄 index.js
createFile(`${baseDir}/index.js`, `
import readline from "readline";
import { scanRepo } from "./scanner.js";
import { getEmbedding } from "./embed.js";
import { collection } from "./vectorStore.js";
import { askLLM } from "./llm.js";

let chatHistory = [];

async function answerQuestion(query) {
    const queryEmbedding = await getEmbedding(query);

    const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: 5
    });

    const context = results.documents.join("\\n\\n");

    const historyText = chatHistory
        .map(h => \`Q: \${h.q}\\nA: \${h.a}\`)
        .join("\\n");

    const prompt = \`
You are an AI repository analysis system.

STRICT RULES:
- Answer ONLY using the provided context
- Do NOT guess

Previous Conversation:
\${historyText}

Context:
\${context}

Question:
\${query}
\`;

    const answer = await askLLM(prompt);

    chatHistory.push({ q: query, a: answer });

    return answer;
}

async function main() {
    console.log("🔍 Scanning repo...");
    await scanRepo("./your-repo");

    console.log("✅ Indexing complete");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask() {
        rl.question("\\n💬 Ask a question (exit to quit): ", async (q) => {
            if (q === "exit") {
                rl.close();
                return;
            }

            const ans = await answerQuestion(q);
            console.log("\\n🧠 Answer:\\n", ans);

            ask();
        });
    }

    ask();
}

main();
`);

console.log("✅ Project created successfully!");