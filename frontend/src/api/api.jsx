import React, { useContext } from 'react'
import AuthContext from './authenticate'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'


baseURL= 'http://127.0.0.1:8000/api'

export const api= ()=> {
  const {authToken, setAuthToken, setUser}= useContext(AuthContext)

  const useAxios= axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authToken?.access}`}
  })

  useAxios.interceptors.request.use(async (requirements)=> {
        user= jwtDecode(authToken.access)
        expiry= dayjs.unix(user.exp).diff(dayjs(), "second")
        
        if (expiry > 1) {
            return requirements
        }

        const refresh_token= await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authToken.refresh
        })
        localStorage.setItem("authToken", JSON.stringify(refresh_token.data))

        setAuthToken(refresh_token.data)
        setUser(jwtDecode(refresh_token.data.access))

        requirements.headers.Authorization= `Bearer ${refresh_token.data.access}`
        return requirements
  })

  return useAxios
}
