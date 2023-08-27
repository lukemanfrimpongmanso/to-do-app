import React, { useContext, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
import AddTask from './components/AddTask'
import { AuthContext  } from './components/store/AuthContext';  


function App() {
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks && new Date().getTime() > tasks.expiry) {
            localStorage.removeItem('tasks');
        }
    }, []);
    return (
        <div>
            {!isAuthenticated && (
                <nav>
                    <ul>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>
            )}

            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/add-task" element={<ProtectedRoute element={<AddTask />} />} />

                <Route path="/register" element={<RegisterForm />} />
              
            </Routes>
        </div>
    );
}

export default App;
