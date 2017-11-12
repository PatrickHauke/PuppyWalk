var express = require('express'),
    app = express(),
    io = require('socket.io'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    engine = require('ejs-mate'),
    connectAssets = require('connect-assets');

var socketServer = require('./controllers/socketOverExpress');
var mqttServer = require('./controllers/mqtt_websockets');


socketServer.createSocketWithAppServer(app);


app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

// var routes = require('./routes/routing');
// app.use('/', routes);

mqttServer.connectToSocket();

socketServer.server().listen(socketServer.port(), function(){console.log("Server loaded and attached to app");});
