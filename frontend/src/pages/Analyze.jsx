import React, { useState } from "react";

export default function Analyze() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
    try {
      const response = await fetch(
        "https://smarthire-backend-4pl5.onrender.com/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume }),
        }
      );

      const data = await response.json();
      setResult(data.result || "No response");

    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    }
  };

  return (
    <div>
      <h2>AI Resume Analyzer</h2>

      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your resume..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAnalyze}>Analyze</button>

      <h3>Result:</h3>
      <pre>{result}</pre>
    </div>
  );
}