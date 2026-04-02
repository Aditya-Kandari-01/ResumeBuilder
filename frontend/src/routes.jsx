import {createBrowserRouter} from "react-router"

import Protected from "./features/authentication/components/Protected"
import Login from "./features/authentication/pages/Login"
import Register from "./features/authentication/pages/Register"


export const router = createBrowserRouter([
    {
        path : "/login",
        element : <Login></Login>
    },
    {
        path : "/register",
        element : <Register></Register>
    },
    {
        path:"/",
        element : <Protected><h1>Home</h1></Protected>
    }
])