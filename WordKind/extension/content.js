
let currentEditor = null;
let lastText = "";
let debounceTimer = null;
let latestSuggestion = null;
let sessionDismissed = false;

function showLoadingPanel() {

    let panel = document.getElementById("wordkind-panel");

    if (!panel) {

        panel = document.createElement("div");
        panel.id = "wordkind-panel";

        panel.innerHTML = `
            <div id="wordkind-header">
                <div>
                    <div class="wordkind-title">✨ WordKind</div>
                    <div class="wordkind-subtitle">
                        Think • Reflect • Rewrite
                    </div>
                </div>

                <button id="wordkind-close">&times;</button>
            </div>

            <div id="wordkind-content"></div>

            <div id="wordkind-footer">
                <button id="wk-close">Close</button>
            </div>
        `;

        document.body.appendChild(panel);

        document
            .getElementById("wordkind-close")
            .onclick = () => panel.remove();

        document
            .getElementById("wk-close")
            .onclick = () => panel.remove();
    }

    document.getElementById("wordkind-content").innerHTML = `
        <div class="wk-section" style="text-align:center;padding:40px;">
            <div class="wk-thinking">🤔</div>

            <h2 style="margin:15px 0 8px;">
                Analyzing...
            </h2>

            <p style="color:#666;">
                Reviewing your message and preparing suggestions...
            </p>
        </div>
    `;
}

function showWordKindPanel(content) {
	
	if (sessionDismissed) return;

    let panel = document.getElementById("wordkind-panel");

    if (!panel) {

        panel = document.createElement("div");

        panel.id = "wordkind-panel";

        panel.innerHTML = `
            <div id="wordkind-header">
                <div>
					<div class="wordkind-title">✨ WordKind</div>
					<div class="wordkind-subtitle">
						Think • Reflect • Rewrite
					</div>
				</div>

			<button id="wordkind-close">&times;</button>
			
			</div>

            <div id="wordkind-content"></div>

            <div id="wordkind-footer">
                <button id="wk-close">Close</button>
            </div>
        `;

        document.body.appendChild(panel);

        document
            .getElementById("wordkind-close")
            .addEventListener("click", () => {
                panel.remove();
            });

        document
            .getElementById("wk-close")
            .addEventListener("click", () => {
                panel.remove();
            });
    }

    document.getElementById("wordkind-content").innerHTML = `
        <div class="wk-section">
            <h3>🟠 Assessment</h3>
            <p>${content.assessment}</p>
        </div>

        <div class="wk-section">
            <h3>🔵 Rewrite 1</h3>
            <p>${content.rewrites[0]}</p>
            <button class="wk-use" data-index="0">📋 Copy this</button>
        </div>

        <div class="wk-section">
            <h3>🔵 Rewrite 2</h3>
            <p>${content.rewrites[1]}</p>
            <button class="wk-use" data-index="1">📋 Copy this</button>
        </div>

        <div class="wk-section">
            <h3>🔵 Rewrite 3</h3>
            <p>${content.rewrites[2]}</p>
            <button class="wk-use" data-index="2">📋 Copy this</button>
        </div>

        ${
            content.principle
                ? `<div class="wk-section">
                        <h3>🟢 Reflection</h3>
                        <p>${content.principle}</p>
                   </div>`
                : ""
        }

        ${
            content.verse
                ? `<div class="wk-section">
                        <h3>📖 Verse</h3>
                        <p>${content.verse}</p>
                   </div>`
                : ""
        }
    `;
document.querySelectorAll(".wk-use").forEach(button => {

    button.onclick = async () => {

        const index = Number(button.dataset.index);
        const newText = content.rewrites[index];

        try {

            await navigator.clipboard.writeText(newText);
			
			sessionDismissed = true;
			
document.getElementById("wordkind-panel")?.remove();

const toast = document.createElement("div");

toast.id = "wk-toast";

toast.innerHTML = `
<div class="wk-toast-title">✅ Rewrite copied</div>
<div class="wk-toast-text">
    Click inside your post.<br>
    Press <b>Ctrl + V</b> to paste.
</div>
`;

document.body.appendChild(toast);

setTimeout(() => {
    toast.remove();
}, 3500);

            const editor = document.querySelector('[role="textbox"]');
            if (editor) editor.focus();

            document.getElementById("wordkind-panel")?.remove();
            
        } catch (err) {
            console.error(err);
        }

    };

});

}
setInterval(() => {

	const editor = document.querySelector('[role="textbox"]');

	if (!editor) return;

	if (editor !== currentEditor) {
    currentEditor = editor;
    sessionDismissed = false;
    lastText = "";
}

    // Stop WordKind after the user clicked "Copy this"
    if (sessionDismissed) return;
	
    const text = editor.innerText.trim();

    // If suggestions are suppressed, wait until the user changes the text

    if (text === lastText) return;

    lastText = text;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {

        if (text.length < 15) return;

        
        try {

            const response = await fetch("http://localhost:3000/analyze", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })

            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            
            if (
                data.success &&
                data.result &&
                data.result.trim() !== "NO_SUGGESTION"
            ) {
				latestSuggestion = JSON.parse(data.result);
				
				showLoadingPanel();

				const rewrites = latestSuggestion.rewrites || [];

				const validRewrites =
					rewrites.filter(r => r && r.trim().length > 0);

				if (validRewrites.length === 0) {
				
				return;
}

if (sessionDismissed) {
    return;
}

setTimeout(() => {
    showWordKindPanel(latestSuggestion);
}, 500);

            } else {

                const panel = document.getElementById("wordkind-panel");

                if (panel) {
                    panel.remove();
                }

            }

        } catch (err) {

            throw (err);

        }

    }, 1200);

}, 1000);
