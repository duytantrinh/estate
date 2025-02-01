import jwt from "jsonwebtoken"

export const loginFirst = async (req, res) => {
  // 1. check xem login chưa ?
  console.log(req.userId)

  res.status(200).json({message: "You are Authenticated !"})
}

export const adminFirst = async (req, res) => {
  // 1. check xem login chưa ?
  const token = req.cookies.jwt_estate
  console.log(token)

  if (!token) return res.status(401).json({message: "Not Authenticated !"})

  // 2.  check jwt
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({message: "Token is not valid !"})

    //check admin ?
    if (!payload.isAdmin) {
      return res.status(403).json({message: "Not authorized !"})
    }
  })
  res.status(200).json({message: "You are Authenticated !"})
}
