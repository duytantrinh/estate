import axios from "axios"

const apiRequest = axios.create({
  baseURL: `${process.env.VITE_API_ENDPOINT}/api`,
  withCredentials: true,
})

export default apiRequest
