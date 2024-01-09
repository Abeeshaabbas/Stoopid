const socket = io('https://stoopid-website.up.railway.app', { transports: ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

function scroll() {
    let chatContainer = document.querySelector(".container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value;
    append(`${msg}`, 'right');
    scroll();
    socket.emit('send', msg);
    messageInput.value = "";
});

let names = "";
let n = prompt("Enter name: ");

if (n.toString().toLowerCase().includes("ashal") || n.toString().toLowerCase().includes("waliya")) {
    let code = prompt("Enter code");
    if (code == null) window.close();
    
    fetch('/config').then(response => response.json()).then(data => {
        if ((code.toLowerCase() === data.secret1) || (code.toLowerCase() === data.secret2)) {
        names = (code.toLowerCase() === data.secret1) ? "Waliya" : "Ashal";
        socket.emit('new-user-joined', { name: names, room: "sudoclass" });
        });
    } else {
        names = "Unauthorised user";
    }
    });
} else {
    names = n;
    socket.emit('new-user-joined', { name: names, room: "unknown" });
}

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
    scroll();
});

socket.on('leave', name => {
    append(`${name} has left the chat`, 'left');
});
