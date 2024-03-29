const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const chats = require('./data/chats');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const dotenv = require('dotenv')
const cors = require('cors');
const routes = require('./Routes/index');
const authenticate = require('./middleware/auth');
const Chat = require('./models/ChatModel');
const { sendMessage } = require('./controller/messageController');
dotenv.config();

app.use(cors({
    origin: "http://localhost:5173",
}))


app.use(routes)

app.get("/", (req, res) => {
    return res.send("Completed 5");
})
app.get("/api/all-chats", (req, res) => {
    res.status(200).send(chats);
})

app.get("/access-chats", authenticate, async (req, res, next) => {
    return res.status(200).send(req.userInfo)
})

app.use((error, req, res, next) => {
    const message = error.message ? error.message : 'Server error occured'
    const status = error.status ? error.status : 500
    res.status(status).send(message)
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, async () => {
    console.log(`server running at http://localhost:${PORT}`);
    await connectDB();
})


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://localhost:5173"]
    }
})
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on('send-msg', (message, room) => {
        console.log("room", room);
        socket.broadcast.emit('receive-msg', message)
        if (room === '' ) {
            socket.broadcast.emit('receive-msg', message)
            console.log("Hi from open chat");
        } else {
            socket.to(room).emit('receive-msg', message)
            console.log("Hi from room");
        }
    })
});

// io.on("connection", (socket) => {
//     console.log("Connected to socket oi");
//     socket.on("setup", (userData) => {
//         socket.join(userData._id);
//         socket.emit("connected");
//     });
//     socket.on("join chat", (room) => {
//         socket.join(room);
//         console.log("User joined room: " + room);
//     });
//     socket.on("new message", (newMessageRecieved) => {
//         const chat = newMessageRecieved.chat;
//         if (!chat) {

//             console.log("User not defined");
//             return
//         }
//         chat.users.forEach((user) => {
//             console.log(`USER:${user}`);

//            if (user._id == newMessageRecieved.sender._id) return;
//             socket.in(user._id).emit("message received", newMessageRecieved);
//             console.log(newMessageRecieved);
//         })
//     })
//     socket.off("setup", () => {
//         console.log("USER DISCONNECTED");
//         socket.leave(userData._id);
//     });
// });
