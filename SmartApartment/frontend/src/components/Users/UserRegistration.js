import React, { useState } from "react"
import axios from "axios"
import './Users.css'
import { Link } from 'react-router-dom';

function UserRegistration() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registrationUser(e) {
        e.preventDefault();
        try {
            const newEmail = email.toLowerCase()
            if (password.length > 7) {
                await axios.post("http://localhost:3001/api/registration", { email: newEmail, password: password })
                alert('Registration successful, Log in')
            } else {
                alert('Too short a password must be at least 8 characters long')
            }

        }
        catch (err) {
            if (err.response.data.isEmptyEmail) {
                alert('Please check email and password')
            } else {
                alert('This email is already taken')
            }
        }

    }


    return (
        <div className="content">
            <h1>Create Account </h1>
            <form onSubmit={registrationUser}>
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
                <input type='submit' value="Create" className="button" />
            </form>
            <Link to="/api/login" className="link">Login</Link>
        </div>
    )
}

export default UserRegistration