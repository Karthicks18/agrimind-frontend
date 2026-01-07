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
            resultBox.innerHTML = "❌ " + (data.error || "Something went wrong");
            return;
        }

        // ✅ SAFE handling
        let localCropsText = "Not available for this district";
        if (Array.isArray(data.local_crops) && data.local_crops.length > 0) {
            localCropsText = data.local_crops.join(", ");
        }

        resultBox.innerHTML = `
            <b>${data.message.replaceAll("\n", "<br>")}</b><br><br>
            🌱 <b>District-wise crops:</b> ${localCropsText}
        `;

    } catch (error) {
        console.error(error);
        resultBox.innerHTML = "❌ Backend not reachable.";
    }
};
