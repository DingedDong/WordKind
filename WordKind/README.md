# WordKind

# Think • Reflect • Rewrite

WordKind is an AI-powered Chrome browser extension for **X (formerly Twitter)** that helps users communicate more thoughtfully before publishing posts.

As users compose a post, WordKind analyzes the text in real time and, when appropriate, suggests respectful rewrites, reflection prompts, and contextually relevant Bible verses to encourage healthier online conversations.

Built for the **Gloo AI + YouVersion Hackathon**.

---

# Current Platform Support

The current prototype is designed for **X (formerly Twitter)**.

WordKind analyzes posts before they are published and provides:

- AI-powered tone assessment
- Respectful rewrite suggestions
- Reflection prompts
- Contextual Bible verses using the YouVersion Platform API

The architecture is modular and can be extended to additional social media platforms in future versions.

---

# Features

- Real-time analysis of X posts before publishing
- AI-generated respectful rewrite suggestions
- Explains why language may be harmful
- Reflection prompts encouraging empathy
- Contextual Bible verses
- One-click copy and paste workflow
- Lightweight Chrome Extension
- User always remains in control

---

# Tech Stack

## Frontend

- HTML
- CSS
- JavaScript
- Chrome Extension (Manifest V3)

## Backend

- Node.js
- Express.js

## AI

Primary

- Gloo AI Studio

Alternative

- Google Gemini

## Scripture

- YouVersion Platform API

---

# Project Structure

```
WordKind/
│
├── backend/
│   ├── server.js
│   ├── gloo.js
│   ├── gemini.js
│   ├── prompt.js
│   ├── package.json
│   └── package-lock.json
│
├── extension/
│   ├── manifest.json
│   ├── content.js
│   ├── panel.js
│   ├── panel.css
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
│
├── README.md
└── LICENSE
```

---

# Prerequisites

Before installing WordKind, ensure you have:

- Google Chrome
- Node.js 18 or newer
- npm
- A Gloo AI Studio API key or Google Gemini API key
- A YouVersion Platform API key

---

# Installation

## 1. Download the project

Clone the repository

```bash
git clone https://github.com/DingedDong/WordKind.git
```

or download the ZIP from GitHub and extract it.

---

## 2. Open the project

```bash
cd WordKind
```

---

## 3. Install backend dependencies

Open a terminal inside the backend folder.

```bash
cd backend
npm install
```

This installs all required Node.js packages.

---

## 4. Configure API Keys

Create a file named

```
.env
```

inside the **backend** folder.

### Option A (Recommended)

Use Gloo AI Studio

```env
GLOO_API_KEY=YOUR_GLOO_API_KEY
YOUVERSION_API_KEY=YOUR_YOUVERSION_API_KEY
```

### Option B (Alternative)

Use Google Gemini

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
YOUVERSION_API_KEY=YOUR_YOUVERSION_API_KEY
```

Replace the placeholder values with your own API keys.

**Do not commit your `.env` file to GitHub.**

---

## 5. Start the backend server

Inside the backend folder run

```bash
node server.js
```

If successful you should see something similar to

```
Server running on http://localhost:3000
```

Keep this terminal window open while using WordKind.

---

## 6. Load the Chrome Extension

Open Chrome.

Go to

```
chrome://extensions
```

Enable

```
Developer Mode
```

Click

```
Load unpacked
```

Select the

```
extension
```

folder from the project.

The WordKind extension should now appear in Chrome.

---

## 7. Test WordKind

Open

```
https://x.com
```

Begin writing a post.

When WordKind detects language that could be more respectful, it will automatically display suggestions.

---

# How WordKind Works

1. User writes a post on X.
2. The Chrome Extension detects new text.
3. The text is securely sent to the local backend.
4. The backend sends the request to either:

- Gloo AI Studio (recommended), or
- Google Gemini (alternative)

5. The AI returns:

- Assessment
- Three respectful rewrites
- Reflection prompt

6. The backend retrieves a relevant Bible verse using the YouVersion Platform API.

7. WordKind displays everything inside the browser.

8. The user may copy a rewrite before publishing.

WordKind never edits or publishes posts automatically.

---

# Example

Original

> People who disagree with me are idiots. Nobody should listen to them.

↓

Suggested Rewrite

> I strongly disagree with their viewpoint, but I believe respectful discussion helps everyone better understand the issue.

↓

Reflection Prompt

> How might someone receiving this message feel?

↓

Bible Verse

> "A gentle answer turns away wrath, but a harsh word stirs up anger."
>
> Proverbs 15:1

---

# Architecture

```
Chrome Extension
        │
        ▼
Node.js Backend
        │
        ▼
Gloo AI Studio
or
Google Gemini
        │
        ▼
Assessment
Rewrite Suggestions
Reflection Prompt
        │
        ▼
YouVersion Platform API
        │
        ▼
Relevant Scripture
        │
        ▼
WordKind Popup
```

---

# Current Limitations

- Currently supports **X (formerly Twitter)**.
- Requires a locally running backend server.
- Requires valid API keys.
- Prototype developed for the Gloo AI + YouVersion Hackathon.

---

# Future Improvements

- Facebook support
- LinkedIn support
- Reddit support
- Threads support
- Bluesky support
- Personalized communication styles
- Multilingual support
- Mobile browser support

---

# Privacy

- WordKind never publishes posts automatically.
- User approval is required before using any rewrite.
- API keys remain local inside the `.env` file.
- Do not upload your `.env` file to GitHub.

## Demo

YouTube

```
https://youtu.be/WQYuiIsa70s
```

---

## License

MIT License

---

## Built For

**Gloo AI + YouVersion Hackathon**

WordKind demonstrates how AI and biblical wisdom can work together to encourage healthier, more respectful conversations across social media.
