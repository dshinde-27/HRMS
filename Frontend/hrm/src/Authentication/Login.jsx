import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Authentication/Auth.css'
import { GiMushroomHouse } from "react-icons/gi";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateInput = () => {
        const userValid = /^[\w@.-]+$/.test(username);
        const passValid = /^[\w@.-]{8,}$/.test(password);
        if (!userValid) return 'Invalid username.';
        if (!passValid) return 'Password must be at least 8 characters.';
        return null;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validation = validateInput();
        if (validation) {
            setError(validation);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert('Login successful!');
                navigate('/adminDashboard'); 
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (err) {
            console.error('Login error:', err.message);
            setError('Server error.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='login-page'>
            <div className='login-container'>
                <GiMushroomHouse className='login-logo' />
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password (min 8 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="register-link" onClick={() => navigate('/register')}>
                    Don't have an account? Register
                </p>
            </div>
        </div>
    )
}

export default Login