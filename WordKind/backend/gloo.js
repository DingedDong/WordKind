import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

let cachedToken = null;
let expiresAt = 0;

export async function getAccessToken() {

    if (cachedToken && Date.now() < expiresAt) {
        return cachedToken;
    }

    const credentials = Buffer.from(
        `${process.env.GLOO_CLIENT_ID}:${process.env.GLOO_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(
        "https://platform.ai.gloo.com/oauth2/token",
        {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                grant_type: "client_credentials",
                scope: "api/access"
            })
        }
    );

    if (!response.ok) {
        throw new Error(`OAuth failed: ${response.status}`);
    }

    const data = await response.json();

    cachedToken = data.access_token;
    expiresAt = Date.now() + (data.expires_in - 60) * 1000;

    return cachedToken;
}

export async function analyzeWithGloo(prompt) {

    const token = await getAccessToken();

    const response = await fetch(
        "https://platform.ai.gloo.com/ai/v1/responses",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: process.env.GLOO_MODEL,
                input: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        }
    );

    if (!response.ok) {
        throw new Error(await response.text());
    }

    const data = await response.json();

return data.output[0].content[0].text;
}