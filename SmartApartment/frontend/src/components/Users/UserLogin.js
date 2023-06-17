import React, { useState } from "react"
import axios from "axios"
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
            console.log(err.response.data)
            if (err.response.data.user === true) {
                alert('You are Banned')
            } else {
                alert('Please check your username and password')
            }
        }
    }



    return (
        <div>
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
                    placeholder="Hasło" /><br />
                <input type='submit' value="Login" />
            </form>
            <Link to="/api/register">Rejestracaja</Link>
        </div>
    )
}

export default UserLogin