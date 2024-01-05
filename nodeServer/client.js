const socket = io('http://localhost:8000', { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInpt = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInpt.value;
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
    messageInpt.value = ""
})

let code = prompt("Enter code");
if(code==null) window.close();
let names = "";
if(parseInt(code) === 73 || code.toLowerCase() === "dumbo") {
    names = "Waliya";
} else if(parseInt(code) === 143 || code.toLowerCase() === "wfa") {
    names = "Ashal";
} else alert("Wrong code inputted! Access denied.")

socket.emit('new-user-joined', names);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', name => {
    append(`${name} has left the chat`, 'left')
})