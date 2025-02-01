import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getPosts = async (req, res) => {
  // console.log(req.query)

  const query = req.query
  // console.log(query)

  try {
    const posts = await prisma.post.findMany({
      // (cách load data với filter)
      // (khai báo tất cả các fields của filter ra dây, undefined nghiã là ko nhập gì cả)
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    })

    // console.log(posts)

    if (!posts) return res.status(404).json({message: "No post"})

    // For testing Loading suspense
    // setTimeout(() => {
    // res.status(200).json(posts);
    // }, 3000);

    res.status(200).json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get posts !",
    })
  }
}

export const getPost = async (req, res) => {
  const id = req.params.id
  try {
    let post = await prisma.post.findUnique({
      where: {id},

      // (Inner Join model Post với 2 model postDetail và User)
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    })

    let userId

    // check xem post có trong list saved post ?
    const token = req.cookies?.jwt_estate

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          })

          // console.log(saved)

          post = {...post, isSaved: saved ? true : false}

          res.status(200).json(post)
        }
        // console.log(post)
      })
    } else {
      res.status(200).json({...post, isSaved: false})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to get post !",
    })
  }
}

export const addPost = async (req, res) => {
  const body = req.body
  const tokenUserId = req.userId

  try {
    // (cách create new data cho 2 Model Post và PostDetail cùng 1 lúc)
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        // xem hình cach_tao_new_post để hiều cách create new Post
        postDetail: {
          create: body.postDetail,
        },
      },
    })

    res.status(200).json(newPost)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to update post !",
    })
  }
}

export const updatePost = async (req, res) => {
  const id = req.params.id

  try {
    res.status(200).json({status: "success"})
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to update post !",
    })
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId

  try {
    const post = await prisma.post.findUnique({where: {id}})

    // chỉ owner mới delete dc porst của mình
    if (post.userId !== tokenUserId) {
      res.status(403).json({
        message: "Not authorized to delete post !",
      })
    }

    await prisma.post.delete({
      where: {id},
    })

    res.status(201).json({
      message: "Post Deleted Successfully !",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Failed to delete post !",
    })
  }
}
