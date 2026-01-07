console.log("✅ crop.js loaded");

window.recommendCrop = async function () {

    const district = document.getElementById("district").value.trim();
    const N = document.getElementById("nitrogen").value;
    const P = document.getElementById("phosphorus").value;
    const K = document.getElementById("potassium").value;
    const ph = document.getElementById("ph").value;

    const resultBox = document.getElementById("result");

    // Clear previous result
    resultBox.innerHTML = "";

    if (!district || !N || !P || !K || !ph) {
        resultBox.innerHTML = "❌ Please fill all fields.";
        return;
    }

    const apiUrl =
        "https://agrimind-oxrb.onrender.com/recommend_crop" +
        `?district=${encodeURIComponent(district)}` +
        `&N=${Number(N)}` +
        `&P=${Number(P)}` +
        `&K=${Number(K)}` +
        `&ph=${Number(ph)}`;

    console.log("Calling API:", apiUrl);

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("API HTTP error");
        }

        const data = await response.json();
        console.log("API RESPONSE:", data);

        if (!data.success) {
            resultBox.innerHTML = "❌ " + (data.error || "Prediction failed");
            return;
        }

        const crops =
            Array.isArray(data.local_crops) && data.local_crops.length > 0
                ? data.local_crops.join(", ")
                : "No district-wise crop data available";

        resultBox.innerHTML = `
            <div style="color:#4ade80;">
                <b>${data.message.replace(/\n/g, "<br>")}</b><br><br>
                🌱 <b>Local crops:</b> ${crops}
            </div>
        `;

    } catch (error) {
        console.error("Fetch error:", error);
        resultBox.innerHTML = "❌ Unable to connect to server.";
    }
};
