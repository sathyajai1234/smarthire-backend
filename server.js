app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    const { GoogleGenerativeAI } = await import("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `Analyze this resume and give:
      - Strengths
      - Weaknesses
      - Suggestions

      Resume:
      ${resume}`
    );

    const response = await result.response;
    const text = response.text();

    res.json({ result: text });

  } catch (error) {
    console.error(error);
    res.json({
      result: "AI failed but backend working ✅",
    });
  }
});