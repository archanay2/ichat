const socket = io('http://localhost:5500');

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp')
const messageContainer =  document.querySelector(".container")
var audio = new Audio(ting1.mp3);

const append = (message,position)=>{
    const messageElement  = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    if (position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append('You: ${message}','right');
    socket.emit('send',message);
})

const name = prompt("Enter your name to join")
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
     append('${name} joined the chat', 'right')
})

socket.on('recieve', data =>{
    append('${data.message}:${data.user}', 'left')
})
socket.on('left', name =>{
    append('${data.name} left the chat', 'left')
})