import { useState } from 'react';
import { loginUser } from '../../stroe/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);
        return dispatch(loginUser({credential, password}))
            .catch(async (res) => {
                let data;
                try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                } catch {
                    data = await res.text(); // Will hit this case if, e.g., server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(loginUser({email: 'jspartan@sanangelespd.io', password: '3seashells'}))
    }

    return (
        <div className='login-form-container'>
            <h1>Login Form</h1>
            <form className='login-form'onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        id='credential'
                        placeholder='Username or Email'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input
                        type='password'
                        id='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <input className='login-form-button' type="submit" value="Login"/>
                <button className='login-form-button' onClick={e => demoLogin(e)}>Demo Login</button>
            </form>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
    )
}

export default LoginForm;