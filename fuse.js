document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendButton = document.querySelector("#chat-input-container button");
    const chatCircle = document.getElementById("chat-circle");
    const chatboxContainer = document.getElementById("chatbox-container");
    const closeChat = document.getElementById("close-chat");

    const responses = {
        "work experience": "You can view my resume here: <a href='https://docs.google.com/document/d/1PMoSe2bNeFD1VEN3WDCwDdUOLTCOyPiixkL_4rPqwvE/edit?usp=sharing' target='_blank'>Download Resume</a>",
        "resume": "You can view my resume here: <a href='https://docs.google.com/document/d/1PMoSe2bNeFD1VEN3WDCwDdUOLTCOyPiixkL_4rPqwvE/edit?usp=sharing' target='_blank'>Download Resume</a>",
        "certifications": "Here are my certifications:<br>- AZ-900: Microsoft Azure Fundamentals<br>- Network+ (in progress)<br>- AWS Certified Cloud Practitioner<br>- TestOut Fundamentals IT Pro",
        "socials": "Connect with me:<br>👾 Reddit: <a href='https://www.reddit.com/u/that-one_ITguu/s/H2iSNcFjgF' target='_blank'>Reddit</a><br>💼 LinkedIn: <a href='https://www.linkedin.com/in/james-robertson2002' target='_blank'>LinkedIn</a><br>🦋 BlueSky: <a href='https://bsky.app/profile/chrisdevs.bsky.social' target='_blank'>BlueSky</a>",
        "projects": "Check out my GitHub:<br>🔗 GitHub: <a href='https://github.com/pychris1' target='_blank'>GitHub</a>",
        "portfolio": "Check out my GitHub:<br>🔗 GitHub: <a href='https://github.com/pychris1' target='_blank'>GitHub</a>"
    };

    // Direct match for variations of "his socials", "his experience", and "his resume"
function preprocessInput(input) {
    const lowerInput = input.toLowerCase().trim();

    if (/his\s+socials|where.*his\s+socials|how.*his\s+socials|find.*his\s+socials/.test(lowerInput)) {
        return "socials"; // Normalize all variations to "socials"
    }

    if (/his\s+experience|what.*his\s+experience|tell.*his\s+experience/.test(lowerInput)) {
        return "work experience"; // Normalize all variations to "work experience"
    }

    if (/his\s+resume|where.*his\s+resume|how.*his\s+resume|find.*his\s+resume/.test(lowerInput)) {
        return "resume"; // Normalize all variations to "resume"
    }

    return lowerInput;
}


    function getBestResponse(userInput) {
        const normalizedInput = preprocessInput(userInput);

        if (responses[normalizedInput]) {
            return responses[normalizedInput];
        }

        return "I'm not sure about that. Try asking for 'resume', 'certifications', 'social media', or 'projects'.";
    }

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function (match) {
            const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" };
            return escapeMap[match];
        });
    }

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(isUser ? "user-message" : "bot-message");
        messageElement.innerHTML = isUser ? escapeHTML(message) : message;
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
        }, 1500);
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
