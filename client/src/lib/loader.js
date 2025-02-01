import {defer} from "react-router-dom"
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) => {
  const res = await apiRequest(`/posts/${params.id}`)

  return res.data
}

export const listPageLoader = async ({request, params}) => {
  //E.g : url: http://localhost:5173/list?bed=2&price=100
  // console.log(request.url)
  const query = request.url.split("?")[1]

  const postPromise = apiRequest("/posts?" + query)

  // for Reatc Router Loading

  return defer({
    postResponse: postPromise,
  })
}

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts")
  const chatPromise = apiRequest("/chats")
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  })
}
