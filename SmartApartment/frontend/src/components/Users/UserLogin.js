import React, { useState } from "react"
import axios from "axios"
import './Users.css'
import { Link } from 'react-router-dom';
function UserLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/login", { email, password })
            localStorage.setItem('token', response.data)
            window.location.href = '/api/devices'
        }
        catch (err) {
            if (err.response.data.user === true) {
                alert('You are Banned')
            } else {
                alert('Please check your email and password')
            }
        }
    }



    return (
        <div className="content">
            <h1>Login</h1>
            <form onSubmit={loginUser}>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email" /><br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password" /><br />
                <input type='submit' value="Login" className="button" />
            </form>
            <Link to="/api/registration" className="link">Create account</Link>
        </div>
    )
}

export default UserLogin