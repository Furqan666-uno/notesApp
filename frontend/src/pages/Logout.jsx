import React, { useContext, useEffect } from 'react'
import AuthContext from '../api/authenticate'

const Logout = () => {
    const {logoutUser}= useContext(AuthContext)
    
    useEffect(()=> {
        if (logoutUser) {
            logoutUser()
        }
    }, [logoutUser])
    
    return (
        <p>Logging out....</p>
    )
}

export default Logout