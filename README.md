# 🗳️ Decentralized Blockchain-Based Electronic Voting System

### Secure, Transparent, and Tamper-Proof Voting for the Digital Age

---

## 📘 Overview

This project is a **prototype implementation** of a **Blockchain-Based Electronic Voting System** enhanced with **biometric verification** and **PUF (Physically Unclonable Function)–based hardware security**.  
It aims to demonstrate how **India’s existing EVM–VVPAT system** can be extended into a **transparent, decentralized, and verifiable architecture** using blockchain smart contracts.

The system combines:
- Blockchain for **immutability and transparency**
- Biometrics for **voter authentication**
- PUF technology for **hardware-level attestation**
- A user-friendly **web-based interface** for casting votes securely

---

## 🎯 Objectives

- Ensure **end-to-end transparency** in the voting process  
- Eliminate single points of failure and insider tampering  
- Guarantee **one-person-one-vote** using biometric authentication  
- Enable **auditability** through blockchain and VVPAT slips  
- Provide a **realistic prototype** aligned with India’s electoral ecosystem

---

## ⚙️ System Architecture

The project is divided into **three layers of trust**:

### 1. Hardware Layer (Device Integrity)
- Each EVM device is embedded with an SRAM-based **PUF module**.
- Before voting, each device’s **Challenge–Response Pair (CRP)** is verified by the Election Commission.
- Only verified, untampered devices can participate.

### 2. Identity Layer (Voter Verification)
- Biometric authentication using fingerprint input ensures:
  - Only registered voters can vote.
  - No duplicate or proxy voting.

### 3. Blockchain Layer (Vote Recording)
- Votes are cryptographically hashed and recorded on an **Ethereum smart contract**.
- Smart contracts ensure:
  - Immutable record of every vote
  - Prevention of double voting
  - Decentralized result tallying

---

## 🧠 Prototype Workflow

### 🔹 1. System Initialization
- Power ON and establish secure BU–CU connection.
- CU performs **PUF challenge–response verification**.
- ✅ Valid → Proceed  
  ❌ Invalid → Device flagged as tampered

### 🔹 2. Voter Authentication
- Fingerprint scanned → hashed and compared against voter database.
- ✅ Verified and not voted → Unlock ballot unit  
  ❌ Invalid / Already voted → Deny access, log attempt

### 🔹 3. Vote Casting and Confirmation
- Voter selects candidate using on-screen interface.
- VVPAT generates a **paper slip** showing candidate and unique hash.
- Slip is displayed for 7 seconds, then sealed.

### 🔹 4. Blockchain Recording
- Vote → converted into anonymized hash `(voterID + candidateID)`
- Digitally signed by the CU’s private key.
- Sent to **Ethereum smart contract** → stored immutably.

### 🔹 5. Result Verification
- Votes are tallied directly from blockchain.
- Admin can verify via on-chain data.
- Blockchain results are **cross-verified with VVPAT audit slips** before certification.

---

## 🔗 Technology Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Smart Contract** | Solidity (Ethereum) | Secure blockchain backend for immutable voting |
| **Frontend** | React.js | Interactive web interface for voter and admin panels |
| **Backend** | Node.js + Express | API server connecting blockchain with frontend |
| **Blockchain Library** | Ethers.js | Handles blockchain deployment and interactions |
| **Styling** | CSS | Responsive design and improved UX |
| **Local Blockchain** | Hardhat / Ganache | Simulated Ethereum network for testing |

---

## 🧩 Features

- ✅ **PUF-Based Hardware Authentication**
- ✅ **Biometric Voter Verification**
- ✅ **Smart Contract-Based Vote Recording**
- ✅ **Real-Time Candidate Grid UI**
- ✅ **VVPAT Simulation (with Slip Generation)**
- ✅ **Admin Dashboard for Result Viewing**
- ✅ **Responsive and Professional Frontend Design**
- ✅ **Immutable Audit Trail on Blockchain**

---




