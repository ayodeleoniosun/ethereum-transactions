let messages = document.getElementById('messages');

const socket = io('http://localhost:3001');
io('http://localhost:3001/admin');

socket.on('connect', () => {
    displayMessage("You connected with id " + socket.id);
});

function displayMessage(message) {
    const item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}