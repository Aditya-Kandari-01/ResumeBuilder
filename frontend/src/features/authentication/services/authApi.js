import axios from "axios"
axios.create({
    baseURL:"http://localhost:10000",
    withCredentials: true
})

// when we use axios it doesn't give the access to cookies to client server
const register = async ({ username, email, password }) => {
    try {
        const response = await axios.post('/api/auth/register', {
            username, email, password
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const login = async ({ email, password }) => {
    try {
        const response = await axios.post("/api/auth/login", {
            email, password
        })
        return response.data

    } catch (error) {
        console.log(error)
    }
}

const logOut = async() =>{
    try{
        const response = await axios.post("/api/auth/logout")
        return response.data
    }catch(error){
        console.log(error)
    }
}

const getMe = async() =>{
    try {
        const response = await axios.get("/api/auth/get-me")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default {register,login,logOut,getMe};
