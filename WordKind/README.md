# WordKind

**Think • Reflect • Rewrite**

WordKind is an AI-powered Chrome browser extension currently for **X (formerly Twitter)** that helps users communicate more thoughtfully before publishing posts. It analyzes the tone of a post in real time and, when appropriate, suggests respectful rewrites while encouraging reflection through relevant Scripture.

Built for the **Gloo AI + YouVersion Hackathon**.

## Current Platform Support

The current prototype is designed for **X (formerly Twitter)**.

WordKind monitors posts before they are published, provides AI-powered rewrite suggestions using **Gloo AI Studio**, and presents contextually relevant Scripture through the **YouVersion Platform API**.

The architecture is designed to support additional social media platforms in future versions.
---

## Features

- Real-time analysis of social media posts
- AI-generated respectful rewrite suggestions
- Explains why language may be harmful
- Reflection prompts that encourage empathy
- Contextual Bible verses using the YouVersion Platform API
- One-click copy and paste workflow
- Non-intrusive Chrome extension interface

---

## Tech Stack

### Frontend

- HTML
- CSS
- JavaScript
- Chrome Extension (Manifest V3)

### Backend

- Node.js
- Express.js

### AI

- Gloo AI Studio

### Scripture Integration

- YouVersion Platform API

---

## Project Structure

```
WordKind/
│
├── extension/
│   ├── manifest.json
│   ├── content.js
│   ├── panel.css
│   ├── popup.html
│   ├── popup.js
│   └── icons/
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── README.md
└── LICENSE
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/WordKind.git
cd WordKind
```

---

### 2. Install dependencies

```bash
cd server
npm install
```

---

### 3. Configure API Keys

Create a `.env` file inside the `server` folder.

```env
GLOO_API_KEY=YOUR_GLOO_API_KEY
YOUVERSION_API_KEY=YOUR_YOUVERSION_API_KEY
```

> Never commit API keys to GitHub.

---

### 4. Start the backend

```bash
node server.js
```

The backend starts at:

```
http://localhost:3000
```

---

### 5. Load the Chrome Extension

1. Open Chrome.
2. Navigate to:

```
chrome://extensions
```

3. Enable **Developer Mode**.
4. Click **Load unpacked**.
5. Select the **extension** folder.

---

## How It Works

1. The user begins typing a social media post.
2. WordKind monitors the text locally.
3. The content is securely analyzed using Gloo AI Studio.
4. If potentially harmful language is detected:

   - An assessment is generated.
   - Respectful rewrites are suggested.
   - A reflection prompt is displayed.
   - A relevant Bible verse is retrieved using the YouVersion Platform API.

5. The user may copy a rewritten version before publishing.

WordKind never posts content automatically. The user remains in complete control.

---

## Example Workflow

Original

> Those people are idiots and nobody should listen to them.

↓

WordKind analyzes the message.

↓

Suggested Rewrite

> I strongly disagree with their viewpoint and believe it deserves further discussion.

↓

Reflection Prompt

> How might someone receiving this message feel?

↓

Bible Verse

> "A gentle answer turns away wrath, but a harsh word stirs up anger."  
> Proverbs 15:1

---

## Architecture

```
Chrome Extension
        │
        ▼
Content Script
        │
        ▼
Node.js Backend
        │
        ▼
Gloo AI Studio
        │
        ├──────────────► Language Analysis
        ├──────────────► Rewrite Suggestions
        └──────────────► Reflection Prompt

                │
                ▼

YouVersion Platform API
        │
        ▼
Relevant Scripture
```

---

## Privacy

- No automatic posting.
- No permanent storage of user posts.
- Users choose whether to accept AI suggestions.

---

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
