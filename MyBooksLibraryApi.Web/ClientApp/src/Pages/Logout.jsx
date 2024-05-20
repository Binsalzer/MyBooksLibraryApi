import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../AuthenticationContext'

const Logout = () => {
    const navigate = useNavigate()
    const { setUser } = useAuthentication()
    useEffect(() => {
        const doLogout = async () => {
            await axios.post('/api/users/logout')
            setUser(null)
            navigate('/')
        }
        doLogout()
    }, [])

    return (<></>)
}

export default Logout