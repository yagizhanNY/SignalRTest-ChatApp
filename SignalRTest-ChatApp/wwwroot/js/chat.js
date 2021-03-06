var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMessage = user + " says: " + msg;

    var liElement = document.createElement("li");
    liElement.textContent = encodedMessage;

    document.getElementById("messagesList").appendChild(liElement);
})

connection.start().then(() => {
    document.getElementById("sendButton").disabled = false;
}).catch((error) => {
    return console.error(error.toString());
})

connection.onclose(document.getElementById("sendButton").disabled = true);

document.getElementById("sendButton").addEventListener("click", (event) => {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch((error) => {
        return console.error(error.toString());
    });

    event.preventDefault();
})