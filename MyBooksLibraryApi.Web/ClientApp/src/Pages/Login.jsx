import React, { useState } from 'react'
import axios from 'axios'
import { useAuthentication } from '../AuthenticationContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [isValidLogin, setIsValidLogin] = useState(true)
    const navigate = useNavigate()
    const { setUser } = useAuthentication()


    const onTextChange = e => {
        const copy = { ...form };
        copy[e.target.name] = e.target.value;
        setForm(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/users/login', form);
        const isValid = !!(data);
        setIsValidLogin(isValid);
        if (isValid) {
            setUser(data);
            navigate('/myfavorites');
        }
    }


    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={form.email} type="text" name="email" placeholder="Email" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={form.password} type="password" name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <Link to="/signup">Sign up for a new account</Link>
            </div>
        </div>
    )
}



export default Login