import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Authentication/Auth.css';
import { GiMushroomHouse } from "react-icons/gi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Register() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmails] = useState('');
    const [dob, setDOB] = useState(null);
    const [phonenumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [regId, setRegId] = useState('');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        const validation = validateInput();
        if (validation) {
            setError(validation);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    dob,
                    phonenumber,
                    username,
                    password,
                    gender,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setRegId(data.regId); // <-- Set the returned RegId
                alert(`Registration successful!\nYour Registration ID: ${data.regId}`);
                navigate('/');
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Registration error:', err.message);
            setError('Server error.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='register-page'>
            <div className='register-container'>
                <GiMushroomHouse className='logo' />
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    {regId && (
                        <div className="input-group" style={{ flex: '1 1 100%' }}>
                            <input
                                type="text"
                                value={regId}
                                readOnly
                                style={{ backgroundColor: '#eee', fontWeight: 'bold' }}
                            />
                            <label style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#333' }}>
                                Your Registration ID
                            </label>
                        </div>
                    )}
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmails(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password (min 8 chars)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <DatePicker
                            selected={dob}
                            onChange={(date) => setDOB(date)}
                            dateFormat="dd/MM/yyyy" // customize format
                            placeholderText="Select DOB"
                            className="custom-date-input"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            maxDate={new Date()} // prevent future DOB
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phonenumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="login-link" onClick={() => navigate('/register')}>
                    Don't have an account? Register
                </p>
            </div>
        </div>
    )
}

export default Register