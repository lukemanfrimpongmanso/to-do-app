import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';




function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate(); 
    

    const handleSubmit = async e => {
        e.preventDefault();
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('https://localhost:7208/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    ConfirmPassword: confirmPassword
                })
            });

            if (response.ok) {
                navigate('/add-task');
                
            } else {
                const responseData = await response.json();
                const errors = Object.values(responseData).flat();
                setErrorMessage(errors.join('\n') || "Registration failed!");
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage(error.toString());
        }
    }

    return (
        <div className =  'container' >
        <form onSubmit={handleSubmit}>
            <label>
          
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='EMAIL' />
            </label>
            <label>
    
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='PASSWORD' />
            </label>
            <label>
               
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='  CONFIRM PASSWORD' />
            </label>
            <input type="submit" value="Register" />
            {errorMessage && <p>{errorMessage}<br></br></p>}
            </form>
        </div>
    );
}

export default RegisterForm;
