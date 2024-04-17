import { io } from "socket.io-client";

const socket = io('ws://localhost:3100',{autoConnect: true});
console.log("worker started");
onmessage = ({data})=>{
    console.log('connecting socket:',data);
    console.log('connected?',socket.connected)
    if(!socket.connected){
        socket.connect();
        socket.on('connect',()=>{
            socket.emit('register', data, (ack: any)=>{
                console.log('data recieved:', ack);
            });
        })
    }else{
        socket.emit('register', data, (ack: any)=>{
            console.log('recieved:', ack);
        });
    }
}
socket.on('connect',()=>{
    console.log('connection established');
});

socket.on('success',(payload)=>{
    console.log("returned data:", payload);
    postMessage(payload)
});
socket.on('failure',(error)=>{
    postMessage(error);
});

socket.on('disconnect',()=>{
    console.log('connection closing!')
    postMessage({type: 'close', disconnected: socket.disconnected});
});