import axios from "axios"

const apiRequest = axios.create({
  baseURL: "https://estate-back.onrender.com/api",
  withCredentials: true,
})

export default apiRequest
