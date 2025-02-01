import express from "express"
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  savePost,
  profilePosts,
  getNotificationNumber,
} from "../controllers/user.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getUsers)
// (currentLoginUser chỉ get/update/delete đc chính nó)
// router.get("/:id", verifyToken, getUser)
router.put("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)

router.post("/save", verifyToken, savePost)

router.get("/profilePosts", verifyToken, profilePosts)

// for notifictaion on Navbar UI
router.get("/notification", verifyToken, getNotificationNumber)

export default router
