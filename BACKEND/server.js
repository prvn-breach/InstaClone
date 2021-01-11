const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

const app = express();

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

// Route Base Middleware
app.use('/api', auth);
app.use('/api', posts);
app.use('/api', users);

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
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log("MONGO DB CONNECTED!"))
    .catch((err) => console.log(err))

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./passport')(passport);

// Mention Sever PORT
const port = process.env.PORT || 5000;

app.listen(port);

// WEBSOCKET SERVER
require("./websocket");

