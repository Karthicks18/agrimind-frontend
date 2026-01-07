console.log("✅ crop.js loaded");

window.recommendCrop = async function () {
    const district = document.getElementById("district").value.trim();
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

        console.log("API RESPONSE:", data);

        if (!data.success) {
            resultBox.innerHTML = "❌ " + (data.error || "Unknown error");
            return;
        }

        const cropsText =
            data.local_crops && data.local_crops.length > 0
                ? data.local_crops.join(", ")
                : "No local crop data available";

        resultBox.innerHTML = `
            <b>${data.message}</b><br><br>
            🌱 <b>Local crops:</b> ${cropsText}
        `;
    } catch (err) {
        console.error(err);
        resultBox.innerHTML = "❌ Backend not reachable.";
    }
};
