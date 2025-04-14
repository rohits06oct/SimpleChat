document.addEventListener("DOMContentLoaded", function() {
    const homeScreen = document.getElementById("homeScreen");
    const responseScreen = document.getElementById("responseScreen");
    const queryInput = document.getElementById("queryInput");
    const generateButton = document.getElementById("generateButton");
    const backButton = document.getElementById("backButton");
    const responseBox = document.getElementById("responseBox");
  
    generateButton.addEventListener("click", async function() {
      const query = queryInput.value.trim();
      if (!query) {
        alert("Enter your simple query");
        return;
      }
  
      try {
        // Replace YOUR_API_KEY with your actual API key if testing against a real endpoint.
        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBGJQLl485eq4t8u3V7JsxNArfntMkepbo";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
        });
        const data = await response.json();
        
        // Safely accessing the API response:
        const textResponse = (
          data &&
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content &&
          data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0] &&
          data.candidates[0].content.parts[0].text
        ) || "No response received.";
  
        // Use the formatter code to convert the raw response into HTML
      const formattedResponse = textResponse
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="${lang || ''}">${code.trim()}</code></pre>`;
      })
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\* (.*?)\n/g, "<li>$1</li>");

    // Insert the formatted content into the responseBox.
    responseBox.innerHTML = formattedResponse;
  
        // Show the response screen and hide the home screen.
        homeScreen.style.display = "none";
        responseScreen.style.display = "block";
      } catch (error) {
        alert("Failed to fetch AI response");
        console.error(error);
      }
    });
  
    backButton.addEventListener("click", function() {
      responseScreen.style.display = "none";
      homeScreen.style.display = "block";
    });
  });
  
