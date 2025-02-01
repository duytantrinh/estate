import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get users !",
    })
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id
  try {
    // (phải viết theo prisma query syntax)
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    res.status(200).json(user)
  } catch (err) {
    // console.log(err)
    res.status(500).json({
      message: "Failed to get user !",
    })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id
  // khi login sẽ lưu id từ token vào req.tokenId
  const tokenUserId = req.userId

  // so sánh nếu currentLoginUser chỉ update đc chính nó
  if (id !== tokenUserId)
    return res.status(403).json({
      message: "You only can update your info  !",
    })

  // phân biết password và phần còn lại
  const {password, avatar, ...inputs} = req.body

  let updatedPassword = null
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 12)
    }

    const updatedUser = await prisma.user.update({
      where: {id},
      data: {
        ...inputs,
        ...(updatedPassword && {password: updatedPassword}),
        // vì dùng PUT request nên phải khai báo thêm avatar ở đây, nếu ko update thì dùng avatar, password cũ
        // nếu ko code update sẽ để password và avatar empty
        ...(avatar && {avatar}),
      },
    })

    res.status(200).json(updatedUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to update user !",
    })
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id
  // khi login sẽ lưu id từ token vào req.tokenId
  const tokenUserId = req.userId

  // so sánh nếu currentLoginUser chỉ update đc chính nó
  if (id !== tokenUserId)
    return res.status(403).json({
      message: "You only can update your info  !",
    })

  try {
    await prisma.user.delete({where: {id}})

    res.status(201).json({
      message: "Deleted Successfully !",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to delete user !",
    })
  }
}

export const savePost = async (req, res) => {
  const postId = req.body.postId

  console.log(postId)

  // khi login sẽ lưu id từ token vào req.tokenId
  const tokenUserId = req.userId

  // console.log(tokenUserId)

  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    })

    // console.log(savedPost)

    // toggle save post tại UI
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      })
      res.status(200).json({
        message: "Post removed from saved list Successfully !",
      })
    } else {
      // console.log("hello")
      await prisma.savedPost.create({
        data: {
          userId: tokenUserId,
          postId,
        },
      })
      res.status(200).json({
        message: "Post saved successfully !",
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to delete saved post !",
    })
  }
}

export const profilePosts = async (req, res) => {
  const tokenUserId = req.params.userId

  try {
    const userPosts = await prisma.post.findMany({where: {userId: tokenUserId}})

    const saved = await prisma.savedPost.findMany({
      where: {userId: tokenUserId},
      include: {
        post: true,
      },
    })

    // chỉ cần lấy post bên trong saved
    const savedPosts = saved.map((item) => item.post)

    // console.log(savedPosts)

    res.status(201).json({
      userPosts,
      savedPosts,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get profile posts !",
    })
  }
}

// for Notifictaion
export const getNotificationNumber = async (req, res) => {
  const tokenUserId = req.userId

  try {
    const number = await prisma.chat.count({
      where: {
        userIDs: {
          // has: tokenUserId,
          hasSome: [tokenUserId],
        },
        // nhưng message chưa đc xem -> notification
        NOT: {
          seenBy: {
            hasSome: [tokenUserId],
          },
        },
      },
    })

    res.status(200).json(number)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get Notification !",
    })
  }
}
