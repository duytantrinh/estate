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

// (Start Cors Middleware) 
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'https://tantrinh-estate.vercel.app/')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  next()
})

// [Middleware connect client http://localhost:5173/ to Expressjs backend]
app.use(cors({origin: "https://tantrinh-estate.vercel.app/", credentials: true}))


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
