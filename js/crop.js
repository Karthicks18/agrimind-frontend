console.log("✅ crop.js loaded");

/* Attach function globally */
window.recommendCrop = async function () {

    const district = document.getElementById("district")?.value?.trim();
    const N = document.getElementById("nitrogen")?.value;
    const P = document.getElementById("phosphorus")?.value;
    const K = document.getElementById("potassium")?.value;
    const ph = document.getElementById("ph")?.value;

    const resultBox = document.getElementById("result");

    // Safety check
    if (!district || !N || !P || !K || !ph) {
        resultBox.innerHTML = "❌ Please fill all fields.";
        return;
    }

    // ✅ CORRECT BACKEND ENDPOINT
    const url =
        `https://agrimind-oxrb.onrender.com/recommend_crop` +
        `?district=${encodeURIComponent(district)}` +
        `&N=${N}&P=${P}&K=${K}&ph=${ph}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("✅ API RESPONSE:", data); // debug

        if (!data || data.success !== true) {
            resultBox.innerHTML = "❌ Failed to get crop recommendation.";
            return;
        }

        // ✅ SAFE handling for empty / missing array
        let cropsText = "No district-wise crop data available";
        if (Array.isArray(data.local_crops) && data.local_crops.length > 0) {
            cropsText = data.local_crops.join(", ");
        }

        resultBox.innerHTML = `
            <b>${data.message}</b><br><br>
            🌱 <b>Local crops:</b> ${cropsText}
        `;

    } catch (err) {
        console.error("❌ Fetch error:", err);
        resultBox.innerHTML = "❌ Backend not reachable.";
    }
};
