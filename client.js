const socket = io('https://stoopid-website.up.railway.app', { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInpt = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
function scroll() {
  let chatCont = document.getElementById("cont");
  chatCont.scrollTop = chatCont.scrollHeight;
}

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
    scroll();
    socket.emit('send', msg);
    messageInpt.value = ""
})
let names = "";
let n = prompt("Enter name: ");
if(n.toString().toLowerCase().includes("ashal") || n.toString().toLowerCase().includes("waliya")) {
    let code = prompt("Enter code");
if(code==null) window.close();

if(parseInt(code) === 73 || code.toLowerCase() === "dumbo") {
    names = "Waliya";
} else if(parseInt(code) === 143 || code.toLowerCase() === "wfa") {
    names = "Ashal";
}  else {
    names = "Unauthorised user";
}
} else names = n;


socket.emit('new-user-joined', names);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
    scroll();
})

socket.on('leave', name => {
    append(`${name} has left the chat`, 'left')
})
