// const socket = io('http://localhost:8000')

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector('.container');
// var audio = new Audio('ting.mp3')

// const append = (message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message')
//     messageElement.classList.add(position)
//     if (position == 'left') {
//     audio.play()   
//     }

// }

// form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const message = messageInput.value
//     append(`You : ${message}`,'right')
//     socket.emit('send',message)
//     messageInput.value = ''
// })

// const name = prompt("Enter Name to Joim")
// socket.emit('new-user-joined', name)

// socket.on('user-joined', data =>{
//     append(`${name} joined the chat`,'right')
// })

// socket.on('recieved', data =>{
//     append(`${data.name}: ${data.message}`,'left')
// })

// socket.on('left', data =>{
//     append(`${name} left the chat`,'left')
// })


const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
// var audio = new Audio('ting.mp3');
var audio = new Audio('ting.mp3'); // Use leading slash to denote root path


const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement); // Append message to the container
    if (position === 'left') {
        audio.play();
    }
};

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

// Prompt for user's name and emit 'new-user-joined' event
const name = prompt("Enter Name to Join");
socket.emit('new-user-joined', name);

// Listen for 'user-joined' event and append message
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

// Listen for 'receive' event and append message
socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

// Listen for 'left' event and append message
socket.on('left', name => {
    append(`${name} left the chat`, 'right');
});
