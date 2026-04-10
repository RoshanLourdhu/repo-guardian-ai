const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Analyze Repo
app.post("/analyze", (req, res) => {
  const { repoUrl } = req.body;

  exec(`node run.cjs ${repoUrl}`, (err, stdout) => {
    if (err) return res.status(500).send(err.message);
    res.json({ output: stdout });
  });
});

// 💬 Ask Question
app.post("/ask", (req, res) => {
  const { question } = req.body;

  exec(`node run.cjs "${question}"`, (err, stdout) => {
    if (err) return res.status(500).send(err.message);
    res.json({ output: stdout });
  });
});

app.listen(5000, () => {
  console.log("🚀 Backend running at http://localhost:5000");
});