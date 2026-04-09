app.get("/test", (req, res) => {
  res.send("API working fast ✅");
});
app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "Resume is required" });
    }

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `Give short analysis of this resume:
- Strengths
- Weaknesses
- Suggestions

Resume:
${resume}`,
      max_output_tokens: 200, // ✅ LIMIT → prevents timeout
    });

    res.json({
      result: response.output_text, // ✅ safer parsing
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI failed" });
  }
});