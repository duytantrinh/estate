import express from "express"

import {loginFirst, adminFirst} from "../controllers/test.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/should-be-login", verifyToken, loginFirst)

router.get("/should-be-admin", adminFirst)

export default router
