const API_BASE = "https://agrimind-oxrb.onrender.com";

window.recommendCrop = async function () {
    const district = document.getElementById("district").value;
    const N = document.getElementById("nitrogen").value;
    const P = document.getElementById("phosphorus").value;
    const K = document.getElementById("potassium").value;
    const ph = document.getElementById("ph").value;

    const resultBox = document.getElementById("result");

    const url = `${API_BASE}/recommend_crop?district=${district}&N=${N}&P=${P}&K=${K}&ph=${ph}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.success) {
    resultBox.innerHTML = "❌ " + data.error;
    return;
}

resultBox.innerHTML = `
    ✅ <b>${data.message}</b><br>
    🌱 Suitable crops: ${data.local_crops.join(", ")}
`;

    } catch (e) {
        resultBox.innerHTML = "❌ Server not reachable.";
    }
};
