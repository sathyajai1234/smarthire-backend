const handleAnalyze = async () => {
  try {
    const res = await fetch(
      "https://smarthire-backend-production-9091.up.railway.app/analyze",
      {
        method: "POST", // ✅ VERY IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: resumeText, // make sure variable name matches
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    
    alert(data.message || "Success");

  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};