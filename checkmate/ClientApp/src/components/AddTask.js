//import React, { useState, useEffect, useContext } from 'react';
//import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';
//import { AuthContext } from './store/AuthContext'; 
//import { useNavigate } from 'react-router-dom';

//function AddTask() {
//    const [task, setTask] = useState({ name: "", date: "", time: "" });
//    const [tasks, setTasks] = useState([]);
//    const { logout } = useContext(AuthContext);
//    const navigate = useNavigate();

//    const handleInputChange = (e) => {
//        setTask({ ...task, [e.target.name]: e.target.value });
//    }

//    const addTask = (e) => {
//        e.preventDefault();
//        setTasks([...tasks, { ...task, startDate: Date.now(), remainingTime: task.time * 60 * 1000 }]);
//        setTask({ name: "", date: "", time: "" });
//    }

//    const deleteTask = (index) => {
//        setTasks(tasks.filter((task, i) => i !== index));
//    }

//    const handleLogout = () => {
//        logout();
//        navigate('/login');
//    }

//    useEffect(() => {
//        const interval = setInterval(() => {
//            setTasks(tasks.map(t => {
//                const elapsed = Date.now() - t.startDate;
//                return { ...t, remainingTime: t.time * 60 * 1000 - elapsed };
//            }))
//        }, 1000);
//        return () => clearInterval(interval);
//    }, [tasks]);

//    return (
//        <div>
//            <button onClick={handleLogout}>Logout</button>
//            <form onSubmit={addTask}>
//                <input name="name" value={task.name} onChange={handleInputChange} placeholder="Task name" required />
//                <input type="date" name="date" value={task.date} onChange={handleInputChange} required />
//                <input type="number" name="time" value={task.time} onChange={handleInputChange} placeholder="Time in minutes" required />
//                <button type="submit">Add Task</button>
//            </form>
//            {tasks.map((t, index) => (
//                <div key={index}>
//                    <h2>{t.name}</h2>
//                    <p>{new Date(t.date).toLocaleDateString()}</p>
//                    <CircularProgressbar
//                        value={(t.time * 60 * 1000 - t.remainingTime) / (t.time * 60 * 1000) * 100}
//                        text={`${Math.round(t.remainingTime / 60000)} min remaining`}
//                        styles={buildStyles({ rotation: 0.5, strokeLinecap: "butt" })}
//                    />
//                    <button onClick={() => deleteTask(index)}>Delete task</button>
//                </div>
//            ))}
//        </div>
//    )
//}

//export default AddTask;

import React, { useState, useEffect, useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AuthContext } from './store/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './addTask.css'






function AddTask() {
    const initialTasks = JSON.parse(localStorage.getItem('tasks'))?.data || [];
    const [task, setTask] = useState({ name: "", date: "", time: "" });
    const [tasks, setTasks] = useState(initialTasks);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify({ data: tasks, expiry: new Date().getTime() + 7 * 24 * 60 * 60 * 1000 })); // 7 days from now
    }, [tasks]);

    const handleInputChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const addTask = (e) => {
        e.preventDefault();
        setTasks([...tasks, { ...task, startDate: Date.now(), remainingTime: task.time * 60 * 1000 }]);
        setTask({ name: "", date: "", time: "" });
    }

    const deleteTask = (index) => {
        setTasks(tasks.filter((task, i) => i !== index));
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(tasks.map(t => {
                const elapsed = Date.now() - t.startDate;
                return { ...t, remainingTime: t.time * 60 * 1000 - elapsed };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [tasks]);

    return (
        <div  className = 'wrapper' >
            <div className='form-container' >
            <button onClick={handleLogout}>Logout</button>
               <form onSubmit={addTask}>
                <input name="name" value={task.name} onChange={handleInputChange} placeholder="Task name" required />
                <input type="date" name="date" value={task.date} onChange={handleInputChange} required />
               <input type="number" name="time" value={task.time} onChange={handleInputChange} placeholder="Time in minutes" required />
                <button type="submit">Add Task</button>
                </form>
            </div>
            {tasks.map((t, index) => (
                <div key={index}   className = 'todo-container' >
                   <h2>{t.name}</h2>
                    <p>{new Date(t.date).toLocaleDateString()}</p>
                    <div style={{ width: 100, height: 50, display: 'flex' }} > 
                        <CircularProgressbar
                            value={t.remainingTime <= 0 ? 100 : (t.time * 60 * 1000 - t.remainingTime) / (t.time * 60 * 1000) * 100}
                            text={t.remainingTime <= 0 ? 'Done' : `${Math.round(t.remainingTime / 60000)} min remaining`}
                            styles={buildStyles({ rotation: 0.5, strokeLinecap: "butt", textSize: '10px' })}
                        />

                    </div>
                   <button onClick={() => deleteTask(index)}>Delete task</button>
                </div>
        ))}
        </div>
    )
}

export default AddTask;

