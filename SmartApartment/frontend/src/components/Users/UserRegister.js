import React, { useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom';

function UserRegister() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/api/register", { email, password })
            alert('Rejestracja pomyślna, Zaloguj się')
        }
        catch (err) {
            alert('Ten email jest już zajęty')
        }

    }


    return (
        <div>
            <h1>Rejestracaja</h1>
            <form onSubmit={registerUser}>
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
                <input type='submit' value="Register" />
            </form>
            <Link to="/api/login">Logowanie</Link>
        </div>
    )
}

export default UserRegister