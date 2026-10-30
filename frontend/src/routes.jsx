import {createBrowserRouter} from "react-router"

import Protected from "./features/authentication/components/Protected"
import Login from "./features/authentication/pages/Login"
import Register from "./features/authentication/pages/Register"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"


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
        element : <Protected><Home></Home></Protected>
    },
    {
        path:"/interview/:interviewId",
        element:<Protected><Interview></Interview></Protected>
    }
])