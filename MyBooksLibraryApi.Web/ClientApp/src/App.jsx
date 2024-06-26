import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Logout from './Pages/Logout'
import Search from './Pages/Search'
import MyFavorites from './Pages/MyFavorites'
import { AuthenticationContextComponent } from './AuthenticationContext'
import PrivateRoute from './PrivateRoute'


const App = () => {
    return (
        <AuthenticationContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                    </PrivateRoute>} />
                    <Route path='/search' element={<Search />} />
                    <Route path='myfavorites/' element={
                        <PrivateRoute>
                            <MyFavorites />
                        </PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthenticationContextComponent>
    );
}

export default App;