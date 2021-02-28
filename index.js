const express = require('express');
const path = require("path");
const app = express();
const http = require('http');
var server = http.Server(app);
const passport = require("passport");
const cors = require("cors");
const port = process.env.PORT || 4000;
const SocketManager = require("./SocketManager");

// initializing the io server side with cors enabled
var io =  module.exports.io = require('socket.io')(server);

app.use(cors())

//parsing the info from req.body
app.use(express.json())

// conect to database
const connectToDB = require("./config/Connectdb");
const db = require('./config/Myurl').host;
connectToDB(db);

//initialize the passport middleware
app.use(passport.initialize());

// config for JWT strategy
require("./config/JwtStrategy")(passport);

// bringing the auth routes
const auth = require("./routes/api/auth");
app.use("/api",auth);

//bringing the channel routes
const channel = require("./routes/api/channel");
app.use("/api",channel);

//bringing the chat routes
const chat = require("./routes/api/chat");
app.use("/api",chat);

// bringing the test routes
const test = require("./routes/api/test");
app.use("/api",test);

io.on('connection', SocketManager);



// //serve static assets in production
// if (process.env.NODE_ENV === 'production') {
    //Set static folder
     app.use(express.static('client/build'));

    app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) });



server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
