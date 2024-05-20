import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })


    const onTextChange = e => {
        const copy = { ...form }
        copy[e.target.name] = e.target.value
        setForm(copy)
    }

    const onFormSubmit = async e => {
        e.preventDefault()
        await axios.post('/api/users/signup', form)
        navigate('/login')
    }



    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Sign up for a new account</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={form.name} type="text" name="name" placeholder="Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={form.email} type="text" name="email" placeholder="Email" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={form.password} type="password" name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp