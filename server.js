app.post("/analyze", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({ error: "Resume is required" });
    }

    return res.json({
      result: "Backend is working ✅ Resume received successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});