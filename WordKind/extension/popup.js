const analyzeBtn = document.getElementById("analyzeBtn");
const verseInput = document.getElementById("verseInput");
const output = document.getElementById("output");

analyzeBtn.addEventListener("click", async () => {

    const text = verseInput.value.trim();

    if (!text) {
        output.textContent = "Please enter a Bible verse.";
        return;
    }

    output.textContent = "Analyzing...";

    try {

        const response = await fetch("http://localhost:3000/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                verse: "User Input",
                text: text

            })

        });

        const data = await response.json();

        if (data.success) {

            output.textContent = data.result;

        } else {

            output.textContent = data.error;

        }

    } catch (err) {

        output.textContent = err.message;

    }

});