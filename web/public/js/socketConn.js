var socketConnection = "localhost:3000",
    socket = io.connect(socketConnection);

function sendMsg(msg) {
    // console.log(msg);
    console.log('echo');
    socket.emit("ClientLink", msg);
}

sendMsg(JSON.stringify({
    deviceId: "test",
    topic: "sampleTopic",
    params: {
        "lat":40.2184921,
        "lng":74.122346
    }
}));

// Going to have to run a forEach() on each device id tied to a 
// dogs friend in order to get their respective locations
socket.on("testcoord", (msg)=>{
    alert(msg.toString());
});