import axios from "axios"

const api = "http://localhost:3000/auth/signin"

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post(api, {
            email: email,
            password: password
        })
        return data.data
    } catch (error) {
        console.log(error)
    }
}