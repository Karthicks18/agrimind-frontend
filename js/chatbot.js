console.log("✅ chatbot.js loaded");

window.askChatbot = async function () {
    const input = document.getElementById("chat-input");
    const output = document.getElementById("chat-response");

    if (!input.value.trim()) {
        output.innerHTML = "❌ Please ask something.";
        return;
    }

    output.innerHTML = "⏳ Thinking...";

    try {
        const res = await fetch("https://agrimind-oxrb.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: input.value })
        });

        const data = await res.json();
        output.innerHTML = "🤖 " + data.response;

    } catch (e) {
        output.innerHTML = "❌ Server not reachable.";
    }
};
