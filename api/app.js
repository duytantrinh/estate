import express from "express"
import cookieParser from "cookie-parser"
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"

import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"

import messageRoute from "./routes/message.route.js"
import chatRoute from "./routes/chat.route.js"

import dotenv from "dotenv"
import cors from "cors"

//read tất cả các biến trong config.env và save trong Enviroment Variables
dotenv.config({
  path: "./.env",
})
const app = express()

// (Start Cors Middleware) Set middleware of CORS ngăn lỗi Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  )
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  )
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader("Access-Control-Allow-Private-Network", true)
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200)

  next()
})

// [Middleware để kết nối client http://localhost:5173/ với Expressjs backend]
app.use(cors({origin: "tantrinh-estate.vercel.app", credentials: true}))
// `credentials:true` : allow to send cookie đến client side để check
// app.use(cors({origin: "http://localhost:5173/"}))

// (End Cors Middleware)

// Body parser, phải có dòng này thì mới send json data được
app.use(express.json())

// for using cookie jwt
app.use(cookieParser())

app.use("/api/posts", postRoute)
app.use("/api/auth", authRoute)
app.use("/api/test", testRoute)
app.use("/api/users", userRoute)
app.use("/api/messages", messageRoute)
app.use("/api/chats", chatRoute)

app.listen(process.env.PORT || 8800, () => {
  console.log(`Server is running`)
})
