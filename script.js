document.addEventListener("DOMContentLoaded", function() {
    // --- Navigation ---
    const navLinks = document.querySelectorAll("nav ul li a");
    const pages = document.querySelectorAll(".page");
  
    function showPage(pageId) {
      pages.forEach(page => {
        if(page.id === pageId) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });
    }
  
    navLinks.forEach(link => {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        const pageToShow = link.getAttribute("data-page");
        showPage(pageToShow);
      });
    });
  
    // Initially display the Home page.
    showPage("home");
  
    // --- Simple Chat Functionality ---
    const generateButton = document.getElementById("generateButton");
    const queryInput = document.getElementById("queryInput");
    const responseBox = document.getElementById("responseBox");
  
    if (generateButton) {
      generateButton.addEventListener("click", async function() {
        const query = queryInput.value.trim();
        if (!query) {
          alert("Please enter a query");
          return;
        }
        try {
          // Replace YOUR_API_KEY with your actual API key, or use a mock URL for testing.
          const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBGJQLl485eq4t8u3V7JsxNArfntMkepbo";
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: query }] }] })
          });
          const data = await response.json();
          const textResponse = (
            data &&
            data.candidates &&
            data.candidates[0] &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts[0] &&
            data.candidates[0].content.parts[0].text
          ) || "No response received.";
  
          // --- Formatter Code ---
          const formattedResponse = textResponse
            .replace(/\n\n/g, "<br/><br/>")
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
              return `<pre><code class="${lang || ''}">${code.trim()}</code></pre>`;
            })
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\* (.*?)\n/g, "<li>$1</li>");
  
          responseBox.innerHTML = formattedResponse;
        } catch (error) {
          alert("Failed to fetch AI response");
          console.error(error);
        }
      });
    }
  });
  
