const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { recordVote } = require("./control");
const { getCandidates, getResults } = require("./admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ||"0x5FbDB2315678afecb367f032d93F642f64180aa3";

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.get("/api/candidates", async (_, res) => {
  const list = await getCandidates(CONTRACT_ADDRESS);
  res.json(list);
});

app.post("/api/vote", async (req, res) => {
  const { voterId, fingerprint, candidateId } = req.body;
  const result = await recordVote(Number(voterId), fingerprint, Number(candidateId), CONTRACT_ADDRESS);
  res.json(result);
});

app.get("/api/results", async (_, res) => {
  const results = await getResults(CONTRACT_ADDRESS);
  res.json(results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend API running on http://localhost:${PORT}`));
