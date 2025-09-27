import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext= createContext()
export default AuthContext

export const AuthProcess= ({all_data})=> {
    const [authToken, setAuthToken]= useState(()=> {
        const token= localStorage.getItem("authToken")
        return token ? JSON.parse(token) : null
    })

    const [user, setUser]= useState(()=> {
        const token= localStorage.getItem("authToken")
        return token ? jwtDecode(JSON.parse(token).access) : null
    })

    const [loading, setLoading]= useState(true)

    const next_page= useNavigate()

    // for logging in users
    const loginUser= async (email, password)=> {
        const user_data= await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json_user_data= await user_data.json()
        console.log(json_user_data)

        if (user_data.status===200) {
            setAuthToken(json_user_data)
            setUser(jwtDecode(json_user_data.access))
            localStorage.setItem("authToken", JSON.stringify(json_user_data))
            next_page('/')
        }

        else {
            console.log(user_data.error)
            alert("Something went wrong.", user_data.status)
        }
    }

    // for registering user
    const registerUser= async (username, email, password, password2)=> {
        const new_user= await fetch('http://127.0.0.1:8000/api/register/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, email, password, password2})
        })

        if (new_user.status===201) {
            console.log('registered')
            next_page('/login')
        }

        else {
            console.log(new_user.error)
            alert("Something went wrong.", new_user.status)
        }
    }

    // for user to loggout.
    const logoutUser= async ()=> {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authToken")
        next_page('/login')
    }


    const final_data= {authToken, setAuthToken, user, setUser, registerUser, loginUser, logoutUser}


    useEffect(()=> {
        if (authToken) {
            setUser(jwtDecode(authToken.access))
        }
        setLoading(false)
    }, [authToken, loading])


    return(
        <AuthContext.Provider value={final_data}>
            {
                loading ? null : all_data
            }
        </AuthContext.Provider>
    )
}
