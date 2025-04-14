const HomeScreen = () => {
    const [query, setQuery] = React.useState("");
    const navigate = ReactRouterDOM.useNavigate();
  
    const fetchAIResponse = async () => {
      if (!query.trim()) {
        alert("Please enter a query");
        return;
      }
      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBGJQLl485eq4t8u3V7JsxNArfntMkepbo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] }),
          }
        );
        const data = await response.json();
        const textResponse =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  
        // Navigate to the ResponseScreen route passing the textResponse in state
        navigate("/responsescreen", { state: { responseText: textResponse } });
      } catch (error) {
        alert("Failed to fetch AI response");
      }
    };
  
    return (
      <div style={homeStyles.container}>
        <h1>AI Content Generator</h1>
        <p style={homeStyles.description}>Enter your query below to generate AI-based content.</p>
        <input
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={homeStyles.input}
        />
        <button onClick={fetchAIResponse} style={homeStyles.button}>
          Generate
        </button>
      </div>
    );
  };
  
  const homeStyles = {
    container: { textAlign: "center", padding: "20px", maxWidth: "600px", margin: "auto" },
    description: { fontSize: "16px", color: "#555", marginBottom: "15px" },
    input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" },
    button: { padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" },
  };
  
  // Expose HomeScreen globally so that it can be used in app.js
  window.HomeScreen = HomeScreen;
  
