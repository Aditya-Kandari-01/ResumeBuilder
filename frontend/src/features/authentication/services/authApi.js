import axios from "axios"
const api = axios.create({
    baseURL:"http://localhost:10000",
    withCredentials: true
})

// when we use axios it doesn't give the access to cookies to client server
const register = async ({ username, email, password }) => {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const login = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        })
        return response.data

    } catch (error) {
        console.log(error)
    }
}

const logout = async() =>{
    try{
        const response = await api.post("/api/auth/logout")
        return response.data
    }catch(error){
        console.log(error)
    }
}

const getMe = async() =>{
    try {
        const response = await api.get("/api/auth/get-me")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {register,login,logout,getMe};
