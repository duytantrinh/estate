import {Server} from "socket.io"
import {createServer} from "http"

const httpServer = createServer()

// for cors policy
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173/",
    // allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST"],
    credentials: true,
  },
})

let onlineUser = []

// add user to start message
const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId)

  if (!userExits) {
    onlineUser.push({userId, socketId})
  }
}

// close current chat box => disconnect socket
const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId)
}

// receive message from server
io.on("connection", (socket) => {
  //   console.log(socket.id)
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id)
    // console.log(onlineUser)
  })

  socket.on("sendMessage", ({receiverId, data}) => {
    const receiver = getUser(receiverId)

    io.to(receiver).emit("getMessage", data)
  })

  socket.on("disconnect", () => {
    removeUser(socket.id)
  })

  // for text button tai Chat.jsx from client
  //   socket.on("test", (data) => {
  //     console.log(data)
  //   })
})

// tạo port number for socket
httpServer.listen("4000")
