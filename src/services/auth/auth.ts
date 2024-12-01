import axios from "../../lib/utils/axios"

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("/auth/login", { email, password })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed")
  }
}

export const register = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post("/auth/register", { email, password, name })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed")
  }
}
