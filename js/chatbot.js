console.log("✅ chatbot.js loaded");

const API_URL = "https://agrimind-oxrb.onrender.com/chat";

/* ===============================
   SEND TEXT TO CHATBOT
================================ */
window.askChatbot = async function () {

    const input = document.getElementById("chat-input");
    const output = document.getElementById("chat-response");

    if (!input || !output) {
        console.error("❌ chat-input or chat-response missing");
        return;
    }

    const query = input.value.trim();

    if (!query) {
        output.innerHTML = "❌ Please ask something.";
        return;
    }

    output.innerHTML = "⏳ Thinking...";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        });

        const data = await res.json();

        if (!data.success) {
            output.innerHTML = "❌ Chatbot error.";
            return;
        }

        output.innerHTML = "🤖 " + data.response;

        speakResponse(data.response);

    } catch (e) {
        console.error(e);
        output.innerHTML = "❌ Backend not reachable.";
    }
};

/* ===============================
   VOICE INPUT (Tamil / English)
================================ */
window.startVoice = function (lang) {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice input not supported in this browser");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
        document.getElementById("chat-input").value =
            event.results[0][0].transcript;
    };

    recognition.onerror = function (event) {
        console.error("Voice error:", event.error);
    };

    recognition.start();
};

/* ===============================
   VOICE OUTPUT (Auto detect)
================================ */
function speakResponse(text) {
    if (!("speechSynthesis" in window)) return;

    const utter = new SpeechSynthesisUtterance(text);

    // Tamil Unicode range detection
    utter.lang = /[\u0B80-\u0BFF]/.test(text) ? "ta-IN" : "en-US";

    speechSynthesis.speak(utter);
}
