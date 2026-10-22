async function sha256(message) {
    const data = new TextEncoder().encode(message);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function mineBlock() {
    const data = document.getElementById("data").value;
    const difficulty =
        parseInt(document.getElementById("difficulty").value);

    const target = "0".repeat(difficulty);

    let nonce = 0;
    const start = performance.now();

    while (true) {
        const hash = await sha256(data + nonce);

        if (hash.startsWith(target)) {
            const end = performance.now();

            document.getElementById("result").innerHTML = `
                <h3>Block Mined Successfully</h3>
                <p><b>Data:</b> ${data}</p>
                <p><b>Nonce:</b> ${nonce}</p>
                <p><b>SHA-256 Hash:</b> ${hash}</p>
                <p><b>Difficulty:</b> ${difficulty}</p>
                <p><b>Mining Time:</b> ${(end-start).toFixed(2)} ms</p>
                <p><b>Consensus Mechanism:</b> Proof-of-Work</p>
<p><b>Target:</b> ${target}</p>
<p><b>Mining Attempts:</b> ${nonce + 1}</p>
            `;

            break;
        }

        nonce++;
    }
}