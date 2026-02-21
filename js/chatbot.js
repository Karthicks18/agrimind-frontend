// Use localhost for testing. Change this back to "https://agrimind-oxrb.onrender.com" before pushing to GitHub!
const API_BASE = "https://agrimind-oxrb.onrender.com";

window.askChatbot = async function (voiceQuery = null) {
    const input = document.getElementById("chat-input");
    const output = document.getElementById("chat-response");
    const langSelect = document.getElementById("lang-select");
    
    const query = voiceQuery || input.value;

    if (!query.trim()) {
        output.innerHTML = "❌ Ask something.";
        return;
    }

    output.innerHTML = "🤖 Thinking...";

    try {
        const res = await fetch(`${API_BASE}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                query: query,
                language: langSelect.value
            })
        });

        const data = await res.json();
        
        if(data.success) {
            output.innerHTML = "🤖 " + data.response;
            speakResponse(data.response, langSelect.value);
        } else {
            output.innerHTML = "❌ Error: " + data.response;
        }
        
    } catch (e) {
        output.innerHTML = "❌ Server not reachable. Is Uvicorn running?";
    }
};

// Voice Assistant Logic
const micBtn = document.getElementById('mic-btn');
const langSelect = document.getElementById('lang-select');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;

    micBtn.addEventListener('click', () => {
        recognition.lang = langSelect.value;
        recognition.start();
        micBtn.style.background = "#9e9e9e";
    });

    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById("chat-input").value = transcript; 
        await window.askChatbot(transcript); 
        micBtn.style.background = "#4caf50";
    };

    recognition.onerror = (event) => {
        console.error("Mic error:", event.error);
        micBtn.style.background = "#4caf50";
    };
}

// Text to Speech Helper
function speakResponse(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
}