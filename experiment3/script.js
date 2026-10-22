let publicKey = null;
let privateKey = null;
let encryptedData = null;

async function generateKeys() {

    try {

        const keyPair = await crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256"
            },
            true,
            ["encrypt", "decrypt"]
        );

        publicKey = keyPair.publicKey;
        privateKey = keyPair.privateKey;

        document.getElementById("keyStatus").textContent =
            "RSA 2048-bit public/private key pair generated successfully.";

    } catch (error) {

        document.getElementById("keyStatus").textContent =
            "Key generation failed: " + error.message;
    }
}


async function encryptMessage() {

    if (!publicKey) {
        alert("Please generate RSA keys first.");
        return;
    }

    try {

        const message =
            document.getElementById("message").value;

        const encodedMessage =
            new TextEncoder().encode(message);

        encryptedData = await crypto.subtle.encrypt(
            {
                name: "RSA-OAEP"
            },
            publicKey,
            encodedMessage
        );

        const encryptedArray =
            new Uint8Array(encryptedData);

        let binary = "";

        encryptedArray.forEach(byte => {
            binary += String.fromCharCode(byte);
        });

        const base64 =
            btoa(binary);

        document.getElementById("encrypted").value =
            base64;

    } catch (error) {

        alert("Encryption failed: " + error.message);
    }
}


async function decryptMessage() {

    if (!privateKey || !encryptedData) {
        alert("Please generate keys and encrypt a message first.");
        return;
    }

    try {

        const decryptedData =
            await crypto.subtle.decrypt(
                {
                    name: "RSA-OAEP"
                },
                privateKey,
                encryptedData
            );

        const decryptedMessage =
            new TextDecoder().decode(decryptedData);

        document.getElementById("decrypted").value =
            decryptedMessage;

    } catch (error) {

        alert("Decryption failed: " + error.message);
    }
}