import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
  // 1. check xem login chưa ?
  const token = req.cookies.jwt_estate

  if (!token) return res.status(401).json({message: "Not Authenticated !"})

  // 2.  check jwt
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({message: "Token is not valid !"})
    // payload là data trả về từ jwt.sign() bên login() tai auth.controller.js nếu verify successfully
    //    payload = {
    //         id: '679685124ac5c7bb65eabf9b',
    //         isAdmin: true,
    //         iat: 1737927381,
    //         exp: 2342727381
    //       }
    req.userId = payload.id

    next()
  })
}
