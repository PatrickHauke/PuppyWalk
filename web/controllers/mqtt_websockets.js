const mqtt = require('mqtt'),
    io = require('socket.io'),
    http = require('http');

const socketOverExpress = require('./socketOverExpress');

const broker = "http://34.210.16.173";

exports.connectToSocket = ()=> {
    let server = socketOverExpress.server(),
        socket = socketOverExpress.socket(),
        express = socketOverExpress.expressApp(),
        mqttClient = mqtt.connect(broker);

    mqttClient.on('connect', ()=>{
        console.log('MQTT is connected to '+ broker + '.\n'+
        'Verify by running < mosquitto_sub -v -t "#" > through broker.');
        
        mqttMessageToClient(mqttClient, socket);
    });

}

// let subList = ['+/DeviceMovement'];
let subList = ['+'];
function mqttMessageToClient(mqttClient, socket){
    console.log("Loaded");
    subList.forEach(function(topic){
        mqttClient.subscribe(topic);
    });

    mqttClient.on('message', (topic, msg)=>{
        // The message comes in as a buffer
        console.log(msg.toString());
        socket.volatile.emit(topic, msg.toString());
    })
}

// function clientMessageToMQTT(mqttClient, socket){
//     let obj = '';
//     // Define connections coming from the client. Maybe pass this as part of the obj?
//     socket.on('connect', () =>{
//         server.on('ClientLink', (msg)=>{
//             obj = JSON.parse(msg);
//             console.log(obj);
//             // obj : {
//             //     deviceId : 'id',
//             //     topic : 'topic',
//             //     params : 'param'
//             // }
//             mqttClient.publish(obj.deviceId + '/' +obj.topic, obj.params);
//         })
//     })
// }