app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "Resume is required" });
    }

    // ✅ Lazy load OpenAI (safe for Render)
    const { default: OpenAI } = await import("openai");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `Analyze this resume and give:
- Strengths
- Weaknesses
- Suggestions

Resume:
${resume}`,
      max_output_tokens: 200,
    });

    res.json({
      result: response.output_text || "No response",
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ error: "AI failed" });
  }
});