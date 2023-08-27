import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './store/AuthContext';
import './loginForm.css';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7208/api/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    RememberMe: false
                })
            });

            if (response.ok && response.headers.get("content-type").includes("application/json")) {
                const data = await response.json();

                login(data.token); // Call the login function

                
                setEmail("");
                setPassword("");
                setErrorMessage("");
                console.log('login successful')
                setTimeout(() => navigate('/add-task', { replace: true }), 0)
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.error || "Login failed!");
            }
        } catch (error) { 
            setErrorMessage(error.message);
        }
    }

    return (
        <div className ='container'>
        <form onSubmit={handleSubmit}>
            <label>
              
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='EMAIL' />
            </label>
            <label>
               
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='PASSWORD' />
            </label>
            {/* Display the error message, if any */}
            {errorMessage && <p>{errorMessage}</p>}
            <input type="submit" value="Log in" />
            </form>
        </div>
    );
}

export default LoginForm;
