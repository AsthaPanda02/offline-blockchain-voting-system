import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bjp from '../assets/bjp.jpg';
import congress from '../assets/congress.png';
import aap from '../assets/aap.jpg';
import bsp from '../assets/bsp.jpg';
import trinamool from '../assets/trinamool.jpg';

export default function Voter() {
  const [voterId, setVoterId] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/candidates')
      .then((res) => setCandidates(res.data))
      .catch((err) => console.log(err));
  }, []);

  const images = {
    BJP: bjp,
    Congress: congress,
    AAP: aap,
    BSP: bsp,
    Trinamool: trinamool,
  };

  async function castVote() {
    if (!selected) {
      alert('Please select a candidate before casting your vote.');
      return;
    }
    const res = await axios.post('http://localhost:5000/api/vote', {
      voterId,
      fingerprint,
      candidateId: selected,
    });
    setReceipt(res.data);
  }

  return (
    <div className="main-wrapper">
      <div className="container">
        <h1>Electronic Voting Machine</h1>
        <p>Enter your credentials and select your candidate below</p>

        <div className="input-row">
          <input
            placeholder="Voter ID"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
          />
          <input
            placeholder="Fingerprint (mock)"
            value={fingerprint}
            onChange={(e) => setFingerprint(e.target.value)}
          />
        </div>

        <div className="candidate-grid">
          {candidates.map((c) => (
            <div
              key={c.id}
              className={`candidate-card ${selected === c.id ? 'selected' : ''}`}
              onClick={() => setSelected(c.id)}
            >
              <img src={images[c.name] || bjp} alt={c.name} />
              <h3>{c.name}</h3>
              <button>{selected === c.id ? 'Selected' : 'Vote'}</button>
            </div>
          ))}
        </div>

        <div className="button-row">
          <button disabled={!selected} onClick={castVote}>
            Cast Vote
          </button>
        </div>

        <div className={`vvpat-wrapper ${receipt ? 'show' : ''}`}>
          {receipt && (
            <div className="receipt animate-slip">
              {receipt.success ? (
                <>
                  <h3>🧾 VVPAT Slip</h3>
                  <p>
                    <strong>Voter Hash:</strong>{' '}
                    <span className="hash-text">{receipt.voterHash}</span>
                  </p>
                  <p>
                    <strong>Candidate:</strong> {receipt.candidateName}
                  </p>
                  <p>
                    <strong>Tx Hash:</strong>{' '}
                    <span className="hash-text">{receipt.txHash}</span>
                  </p>
                </>
              ) : (
                <p className="error">{receipt.error}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .main-wrapper {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            background: linear-gradient(180deg, #e8f0fe 0%, #f5f7fa 100%);
            padding: 40px 0;
            box-sizing: border-box;
          }

          .container {
            width: 950px;
            background: white;
            border-radius: 12px;
            box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.08);
            padding: 40px;
            box-sizing: border-box;
            transition: all 0.3s ease;
          }

          h1 {
            text-align: center;
            color: #222;
            font-size: 28px;
            margin-bottom: 10px;
          }

          p {
            text-align: center;
            color: #555;
            margin-bottom: 30px;
          }

          .input-row {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }

          .input-row input {
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            width: 240px;
            font-size: 14px;
          }

          .candidate-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            justify-content: center;
            align-items: stretch;
            width: 100%;
            margin: 0 auto;
          }

          .candidate-card {
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            background-color: #fff;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            width: 100%;
            box-sizing: border-box;
            min-height: 200px;
          }

          .candidate-card:hover {
            transform: scale(1.03);
            box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          }

          .candidate-card.selected {
            border-color: green;
            background-color: #eaffea;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.15);
          }

          .candidate-card img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
            border: 2px solid #ddd;
          }

          .candidate-card h3 {
            color: #222;
            font-weight: bold;
            margin-bottom: 8px;
          }

          .candidate-card button {
            background-color: #1a73e8;
            color: white;
            padding: 8px 15px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
          }

          .candidate-card.selected button {
            background-color: #0f9d58;
          }

          .button-row {
            text-align: center;
            margin-top: 30px;
          }

          .button-row button {
            background-color: #1a73e8;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s;
          }

          .button-row button:disabled {
            background-color: #999;
            cursor: not-allowed;
          }

          .vvpat-wrapper {
            min-height: 180px; /* Reserve fixed space to prevent layout shift */
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin-top: 30px;
          }

          .receipt {
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
            width: 100%;
            max-width: 850px;
            overflow-wrap: break-word;
            word-break: break-all;
            text-align: left;
            box-sizing: border-box;
          }

          .receipt h3 {
            color: green;
            text-align: center;
            margin-bottom: 10px;
          }

          .hash-text {
            display: inline-block;
            word-break: break-all;
            max-width: 100%;
          }

          .error {
            color: red;
            text-align: center;
          }

          /* Animation */
          @keyframes slipOut {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-slip {
            animation: slipOut 0.6s ease forwards;
          }

          @media (max-width: 900px) {
            .candidate-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 600px) {
            .candidate-grid {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </div>
  );
}
