const { createServer } = require("http")
const { Server } = require("socket.io")
require('dotenv').config()

const httpServer = createServer()
const frontendUrl = process.env.FRONTEND_URL
const io = new Server(httpServer, {
    cors: {
        origin: frontendUrl,
        methods: ["GET", "POST"]
    }
})

let onlineUser = []
let alertData
io.on("connection", (socket) => {
console.log(socket.id);
    onlineUser.push(socket.id)
    socket.on("alertFromClient", (message) => {
        console.log(message);
        io.emit("alert", message)
    });

    socket.on("disconnect", () => {
        console.log("disconnected ", socket.id);
        onlineUser = onlineUser.filter((user) => user !== socket.id);
        io.emit("onlineUsers", onlineUser);
    });
});


const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
