// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// export default function Admin(){
//   const [results, setResults] = useState([])

//   useEffect(()=>{ fetchResults() },[])

//   async function fetchResults(){
//     const res = await axios.get('http://localhost:5000/api/results')
//     setResults(res.data)
//   }

//   return (
//     <div className="container">
//       <h1>Admin Panel</h1>
//       <button onClick={fetchResults}>Refresh</button>
//       {results.map(r=> (
//         <div key={r.id}>
//           <h3>{r.name}: {r.votes} votes</h3>
//           <details>
//             <summary>Voter Hashes</summary>
//             <ul>{r.voterHashes.map((h,i)=><li key={i}>{h}</li>)}</ul>
//           </details>
//         </div>
//       ))}
//     </div>
//   )
// }





import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [results, setResults] = useState([]);

  useEffect(() => { fetchResults(); }, []);

  async function fetchResults() {
    const res = await axios.get('http://localhost:5000/api/results');
    setResults(res.data);
  }

  return (
    <div className="container">
      <h1>Election Commission Dashboard</h1>
      <p style={{ textAlign: "center", color: "#555" }}>View live vote counts and voter hashes</p>
      <div style={{ textAlign: "center" }}>
        <button onClick={fetchResults}>Refresh Results</button>
      </div>

      {results.map(r => (
        <div key={r.id} className="candidate-card" style={{ marginTop: "20px" }}>
          <h3>{r.name} — {r.votes} votes</h3>
          <details>
            <summary style={{ cursor: 'pointer' }}>Voter Hashes ({r.voterHashes.length})</summary>
            <ul style={{ textAlign: "left", fontSize: "14px" }}>
              {r.voterHashes.map((h, idx) => <li key={idx}>{h}</li>)}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}
