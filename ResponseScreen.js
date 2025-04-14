const ResponseScreen = () => {
    const location = ReactRouterDOM.useLocation();
    const navigate = ReactRouterDOM.useNavigate();
    const responseText = location.state?.responseText || "No response available.";
  
    // Format the response string into readable HTML
    const formattedResponse = responseText
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="${lang || ''}">${code.trim()}</code></pre>`;
      })
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\* (.*?)\n/g, "<li>$1</li>");
  
    return (
      <div style={responseStyles.container}>
        <h1>AI Generated Response</h1>
        <div style={responseStyles.responseBox} dangerouslySetInnerHTML={{ __html: formattedResponse }}></div>
        <button style={responseStyles.button} onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  };
  
  const responseStyles = {
    container: { textAlign: "center", padding: "20px", maxWidth: "800px", margin: "auto" },
    responseBox: { padding: "20px", borderRadius: "8px", backgroundColor: "#f9f9f9", textAlign: "left", lineHeight: "1.6" },
    button: { marginTop: "20px", padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" },
  };
  
  window.ResponseScreen = ResponseScreen;
  