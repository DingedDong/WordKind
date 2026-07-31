import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeWithGloo } from "./gloo.js";
import { buildPrompt } from "./prompt.js";
//import { analyzeVerse } from "./gemini.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "chrome-extension://*",
        "https://x.com",
        "https://twitter.com"
    ]
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "WordKind Backend is running!",
        provider: process.env.AI_PROVIDER
    });
});

app.post("/analyze", async (req, res) => {

    try {

        const { text } = req.body;

        let result;

        if (process.env.AI_PROVIDER === "gloo") {

            const prompt = buildPrompt(text);
			
            result = await analyzeWithGloo(prompt);
            

        } else {

            result = await analyzeVerse(verse, text);

        }

        res.json({
            success: true,
            result
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});