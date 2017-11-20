var socketConnection = "http://localhost:3000",
    socket = io.connect(socketConnection);

function sendMsg(msg) {
    console.log(msg);
    socket.emit("ClientLink", msg);
}

sendMsg(JSON.stringify({
    "deviceId": "test",
    "topic": "sampleTopic",
    "params": "Coord"
}));

socket.on("testcoord", (msg)=>{
    console.log(msg.toString());
});