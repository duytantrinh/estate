import prisma from "../lib/prisma.js"

export const getChats = async (req, res) => {
  const tokenUserId = req.userId

  // console.log(tokenUserId)

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          // vì userIds dạng String[] trong prisma nên phải dùng hasSome để lọc nó
          hasSome: [tokenUserId],
        },
      },
    })

    // show message of receiver
    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId)

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      })
      chat.receiver = receiver
    }

    res.status(200).json(chats)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get chats !",
    })
  }
}

export const getChat = async (req, res) => {
  const tokenUserId = req.userId
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },

      // JOIN 2 model Chat và Message bằng fields messages
      include: {
        // show tất cả message của this chat
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    })

    // update currentuserId cho field seenBy trong chat
    await prisma.chat.update({
      where: {
        id: req.params.id,
      },

      // update new data cho field seenBy
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    })

    res.status(200).json(chat)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get chat !",
    })
  }
}

export const addChat = async (req, res) => {
  const tokenUserId = req.userId
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    })

    res.status(200).json(newChat)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to add chat !",
    })
  }
}

export const readChat = async (req, res) => {
  const tokenUserId = req.userId

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },

      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    })

    res.status(200).json(chat)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to read chats !",
    })
  }
}
