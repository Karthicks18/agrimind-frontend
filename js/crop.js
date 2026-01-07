console.log("✅ crop.js loaded");

window.recommendCrop = async function () {

    const district = document.getElementById("district").value;
    const N = document.getElementById("nitrogen").value;
    const P = document.getElementById("phosphorus").value;
    const K = document.getElementById("potassium").value;
    const ph = document.getElementById("ph").value;

    const resultBox = document.getElementById("result");

    if (!district || !N || !P || !K || !ph) {
        resultBox.innerHTML = "❌ Please fill all fields.";
        return;
    }

    const url =
        `https://agrimind-oxrb.onrender.com/recommend_crop` +
        `?district=${encodeURIComponent(district)}` +
        `&N=${N}&P=${P}&K=${K}&ph=${ph}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 🔍 DEBUG — THIS IS THE KEY
        console.log("🌾 Crop API response:", data);

        if (!data || data.success !== true) {
            resultBox.innerHTML = "❌ Invalid response from server";
            return;
        }

        const crops = Array.isArray(data.local_crops)
            ? data.local_crops.join(", ")
            : "No crop data available";

        resultBox.innerHTML = `
            ✅ <b>District:</b> ${data.district}<br>
            🌱 <b>Recommended Crops:</b> ${crops}
        `;

    } catch (err) {
        console.error("❌ Fetch error:", err);
        resultBox.innerHTML = "❌ Backend not reachable.";
    }
};
