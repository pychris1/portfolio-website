document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendButton = document.querySelector("#chat-input-container button");
    const chatCircle = document.getElementById("chat-circle");
    const chatboxContainer = document.getElementById("chatbox-container");
    const closeChat = document.getElementById("close-chat");

    const responses = [
        { key: "work experience", value: "You can view my resume here: <a href='https://docs.google.com/document/d/1PMoSe2bNeFD1VEN3WDCwDdUOLTCOyPiixkL_4rPqwvE/edit?usp=sharing' target='_blank'>Download Resume</a>" },
        { key: "resume", value: "You can view my resume here: <a href='https://docs.google.com/document/d/1PMoSe2bNeFD1VEN3WDCwDdUOLTCOyPiixkL_4rPqwvE/edit?usp=sharing' target='_blank'>Download Resume</a>" },
        { key: "certifications", value: "Here are my certifications:<br>- AZ-900: Microsoft Azure Fundamentals<br>- Network+ (in progress)<br>- AWS Certified Cloud Practitioner<br>- TestOut Fundamentals IT Pro" },
        { key: "socials", value: "Connect with me:<br>👾 Reddit: <a href='https://www.reddit.com/u/that-one_ITguu/s/H2iSNcFjgF' target='_blank'>Reddit</a><br>💼 LinkedIn: <a href='https://www.linkedin.com/in/james-robertson2002' target='_blank'>LinkedIn</a><br>🦋 BlueSky: <a href='https://bsky.app/profile/chrisdevs.bsky.social' target='_blank'>BlueSky</a>" },
        { key: "projects", value: "Check out my GitHub:<br>🔗 GitHub: <a href='https://github.com/pychris1' target='_blank'>GitHub</a>" },
        { key: "portfolio", value: "Check out my GitHub:<br>🔗 GitHub: <a href='https://github.com/pychris1' target='_blank'>GitHub</a>" }
    ];

    const fuse = new Fuse(responses, {
        keys: ['key'],
        threshold: 0.5, // Adjusting threshold for better matching
        includeScore: true
    });

    function preprocessInput(input) {
        return input.toLowerCase().trim();
    }

    function extractKeywords(input) {
        const keywords = ["resume", "certifications", "socials", "projects", "portfolio", "work experience"];

        // Check if input contains any of the keywords
        return keywords.find(keyword => input.includes(keyword)) || null;
    }

    function getBestResponse(userInput) {
        const normalizedInput = preprocessInput(userInput);
        console.log(`User input: ${normalizedInput}`); // Debug log

        const keywordMatch = extractKeywords(normalizedInput);

        if (keywordMatch) {
            console.log(`Keyword found: ${keywordMatch}`); // Debug log
            const foundResponse = responses.find(r => r.key.includes(keywordMatch));
            if (foundResponse) return foundResponse.value;
        }

        // Fuzzy search fallback
        const results = fuse.search(normalizedInput);
        console.log("Fuse.js results:", results); // Debug log

        if (results.length > 0) {
            return results[0].item.value;
        }

        return "I'm not sure about that. Try asking for 'resume', 'certifications', 'social media', or 'projects'.";
    }

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        messageElement.innerHTML = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function showThinkingAnimation() {
        const thinkingBubble = document.createElement("div");
        thinkingBubble.classList.add("bot-message", "thinking-bubble");
        thinkingBubble.innerHTML = "<span></span><span></span><span></span>";
        chatbox.appendChild(thinkingBubble);
        chatbox.scrollTop = chatbox.scrollHeight;
        return thinkingBubble;
    }

    function handleUserInput() {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, true);
        userInput.value = "";

        const thinkingBubble = showThinkingAnimation();

        setTimeout(() => {
            thinkingBubble.remove();
            addMessage(getBestResponse(text));
        }, 1000);
    }

    sendButton.addEventListener("click", handleUserInput);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            handleUserInput();
        }
    });

    chatCircle.addEventListener("click", function () {
        chatboxContainer.style.display = "flex";
        chatCircle.style.display = "none";

        setTimeout(() => {
            chatboxContainer.style.opacity = "1";
            chatboxContainer.style.transform = "scale(1)";
        }, 100);
    });

    closeChat.addEventListener("click", function () {
        chatboxContainer.style.opacity = "0";
        chatboxContainer.style.transform = "scale(0.7)";

        setTimeout(() => {
            chatboxContainer.style.display = "none";
            chatCircle.style.display = "flex";
        }, 300);
    });
});
