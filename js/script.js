const btnOpenChat = document.getElementById('btnOpenChat');
const chat = document.getElementById('chat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const backdrop = document.getElementById('backdrop');

backdrop.addEventListener("click", () => {
    chat.classList.remove('opened');
    backdrop.classList.remove('shown');
});

btnOpenChat.addEventListener("click", (e) => {
    chat.classList.toggle('opened');
    backdrop.classList.toggle('shown');
});

chatInput.addEventListener("keydown", async (e) => {
    if (e.key == "Enter" && chatInput.value != "") {
        const userQuestion = chatInput.value;
        chatInput.value = "";
        await sendQuestion(userQuestion);
    }
});

async function sendQuestion(message) {
    const senderMessage = document.createElement("div");
    senderMessage.classList.add("chat__message", "chat__message_sender");
    senderMessage.textContent = message;

    chatBody.appendChild(senderMessage);
    chatBody.scrollTo(0, chatBody.scrollHeight);

    chatInput.disabled = true;
    try {
        const receiverMessage = document.createElement("div");
        receiverMessage.classList.add("chat__message", "chat__message_receiver");
        receiverMessage.textContent = 'Loading...';
        chatBody.appendChild(receiverMessage);
        chatBody.scrollTo(0, chatBody.scrollHeight);

        const response = await fetch('https://ai-faq-server.onrender.com/question', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "https://ai-faq-server.onrender.com"
            },
            body: JSON.stringify({ question: message })
        });

        const data = await response.json();

        receiverMessage.textContent = data.response;
        chatBody.scrollTo(0, chatBody.scrollHeight);
    } catch (error) {
        console.log(error);
    } finally {
        chatInput.disabled = false;
    }
}
