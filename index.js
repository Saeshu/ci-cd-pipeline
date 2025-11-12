import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("🔥 CI/CD pipeline is live and running on port 3000!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
