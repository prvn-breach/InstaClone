const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const http = require("http");
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const { addUser, getUser } = require("./users");

io.on('connection', (socketClient) => {
    let user_id = socketClient.handshake.query.user;
    if (user_id != undefined) {
        addUser(user_id, socketClient);
    }
    
    socketClient.on('typing', ({ receiver_id, sender_id }) => {
        let client = getUser(receiver_id);
        if (client) {
            client.emit('typing', sender_id);
        }
    });
    
    socketClient.on('active', () => {
        socketClient.broadcast.emit('active');
    });

    socketClient.on('inactive', () => {
        socketClient.broadcast.emit('active');
    })
});

// bodyParser Middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// images
app.use('/uploads', express.static(path.join('uploads')));

// cors
app.use(cors());

// Routes
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const users = require('./routes/api/users');
const chat = require('./routes/api/chat');

// Route Base Middleware
app.use('/api', auth);
app.use('/api', posts);
app.use('/api', users);
app.use('/api', chat);

// Headers
app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
});

// DB Config
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8ugy9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("MONGO DB CONNECTED!"))
    .catch((err) => console.log(err))

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./passport')(passport);

// Mention Sever PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));