const mqtt = require('mqtt'),
    io = require('socket.io'),
    http = require('http');

const socketOverExpress = require('./socketOverExpress');

const broker = "http://broker.hivemq.com:1883";

exports.connectToSocket = ()=> {
    let server = socketOverExpress.server(),
        socket = socketOverExpress.socket(),
        express = socketOverExpress.expressApp(),
        mqttClient = mqtt.connect(broker);

    mqttClient.on('connect', ()=>{
        console.log('MQTT is connected to '+ broker + '.\n'+
        'Verify by running < mosquitto_sub -v -t "#" > through broker.');
        
        mqttMessageToClient(mqttClient, socket);
        clientMessageToMQTT(mqttClient, socket);
    });

}

// let subList = ['+/Child'];
// let subList = ['+'];
let subList = [
    'listenTest',
    '+/sampleTopic'
]
function mqttMessageToClient(mqttClient, socket){
    console.log("Loaded");
    subList.forEach(function(topic){
        mqttClient.subscribe(topic);
    });

    mqttClient.on('message', (topic, msg)=>{
        // The message comes in as a buffer. Needs to be converted back to string
        console.log("Incoming Data :: " + msg.toString());
        // socket.volatile.emit(topic, msg.toString());
        socket.emit('testcoord', msg.toString());
    })
}

function clientMessageToMQTT(mqttClient, socket){
    let obj = '';
    // Define connections coming from the client. Maybe pass this as part of the obj?
    // It's important to note that the open socket connection is built and made accessible 
    // from the callback
    socket.on('connect', (openSocket) =>{
        openSocket.on('ClientLink', (msg)=>{
            obj = JSON.parse(msg);
            // obj : {
            //     deviceId : 'id',
            //     topic : 'topic',
            //     params : 'param'
            // }
            // mqttClient.publish(obj.deviceId + '/' +obj.topic, obj.params);
            console.log(obj);
            let {deviceId, topic, params} = obj;
            console.log(params);
            // mqttClient.publish("listenTest", msg);
            mqttClient.publish(deviceId + "/" + topic, JSON.stringify(params));
        })
    })
}