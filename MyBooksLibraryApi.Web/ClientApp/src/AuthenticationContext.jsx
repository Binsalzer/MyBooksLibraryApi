import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthenticationContext = createContext()

const AuthenticationContextComponent = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await axios.get('/api/users/getcurrentuser')
            setUser(data)
        }

        loadUser()
    }, [])


    return (
        <AuthenticationContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

const useAuthentication = () => {
    return useContext(AuthenticationContext)
}

export { AuthenticationContextComponent, useAuthentication }