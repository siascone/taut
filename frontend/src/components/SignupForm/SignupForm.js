import { useState } from 'react';
import { signupUser, loginUser } from '../../stroe/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);

        return dispatch(signupUser({email, username, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
    }

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(loginUser({ email: 'jspartan@sanangelespd.io', password: '3seashells' }))
    }

    return (
        <div className='signup-form-container'>
            <h1>Signup Form</h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="text"
                        id='username'
                        placeholder='username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input 
                        type="text"
                        id='email'
                        placeholder='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input 
                        type="password"
                        id='password'
                        placeholder='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <input className='signup-form-button' type="submit" value="Sign Up" />
                <br />
                <button className='login-form-button' onClick={e => demoLogin(e)}>Demo Login</button>
                <br />
            </form>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
    )
}

export default SignupForm;