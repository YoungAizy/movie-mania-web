import { io } from "socket.io-client";

const socket = io('http://localhost:4000',{autoConnect: true});

onmessage = (form)=>{
    socket.emit('register', form.data, (ack: any)=>{
        console.log('recieved:', ack);
    });
}

socket.on('success',(payload)=>{
    postMessage(payload)
});
socket.on('failure',(error)=>{
    postMessage(error);
});

socket.on('disconnect',()=>{
    postMessage({type: 'onClose', disconnected: socket.disconnected});
});