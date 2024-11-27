const btnOpenChat = document.getElementById('btnOpenChat');
const chat = document.getElementById('chat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

btnOpenChat.addEventListener("click", () => {
    chat.classList.toggle('opened');
});

chatInput.addEventListener("keydown", async (e) => {
    if (e.key == "Enter" && chatInput.value != "") {
        const userMessage = chatInput.value;
        await sendMessage(userMessage);
        chatInput.value = "";
    }
});


async function sendMessage(message) {
    const senderMessage = document.createElement("div");
    senderMessage.classList.add("chat__message", "chat__message_sender");
    senderMessage.textContent = message;

    chatBody.appendChild(senderMessage);
    chatBody.scrollTo(0, chatBody.scrollHeight);

    try {
        const response = await fetch('https://ai-faq-server.onrender.com/question', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "https://ai-faq-server.onrender.com"
            },
            body: JSON.stringify({ question: message })
        });


        const data = await response.json();
        receiveMessage(data.response);

        return data;
    } catch (error) {
        console.log(error);
    }

    return null;
}

function receiveMessage(answer) {
    const receiverMessage = document.createElement("div");
    receiverMessage.classList.add("chat__message", "chat__message_receiver");
    receiverMessage.textContent = answer;

    chatBody.appendChild(receiverMessage);
    chatBody.scrollTo(0, chatBody.scrollHeight);
}


