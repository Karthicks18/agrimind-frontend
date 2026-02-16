const API_BASE = "https://agrimind-oxrb.onrender.com";

window.askChatbot = async function () {
    const input = document.getElementById("chat-input");
    const output = document.getElementById("chat-response");

    if (!input.value.trim()) {
        output.innerHTML = "❌ Ask something.";
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/chat`, {
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
