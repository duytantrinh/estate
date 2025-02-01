import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const {username, email, password} = req.body

  // console.log(req.body)

  try {
    //  1. Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // console.log(hashedPassword)

    // 2 . Create a new user and save it to Prisma Db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    // console.log(newUser)

    res.status(201).json({
      message: "User created successfully!!!",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to created user",
    })
  }
}

export const login = async (req, res) => {
  const {username, password} = req.body
  try {
    // 1. check if the user exists
    const user = await prisma.user.findUnique({where: {username}})

    if (!user)
      return res.status(401).json({
        message: "Invalid Credential !",
      })

    // 2. check password correct ?
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invalid Credential !",
      })

    // 3. Create Cookie token (jwt) and send to user
    const age = 1000 * 60 * 60 * 24 * 7 // 1 week
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true, //gỏi kèm thuộc tính isAdmin đe check admin ?
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    )

    // destructure password và phần cỏn lại trong data
    const {password: userPassword, ...userInfo} = user

    res
      .cookie("jwt_estate", token, {
        httpOnly: true,
        // secure: true, ( chỉ https mới chạy đc === more secure at production)
        maxAge: age,
      })
      .status(200)
      .json(userInfo)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to login",
    })
  }
}

export const logout = (req, res) => {
  // res.clearCookie("cookie name đã tạo tại login")
  res.clearCookie("jwt_estate").status(200).json({
    message: "Logout successfully !!!",
  })
}
