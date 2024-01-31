import axios from "axios";
import React, { useRef, useState } from "react";

export const LoginForm:React.FC = () => {

    const [error, setError] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLoginUser = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
            try {
                const req = await axios.post('http://localhost:8000/auth/login', {
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
                setError(false);
                console.log(req.data.user);
            } catch (e) {
                setError(true);
            }
        }
    }
    return(
        <form className="login-form">
            <h2>Please Login</h2>
            {error ? <p className="login-form-error">Username or Password incorrect</p> : <></>}
            <div className="login-form-input-group">
                <h6>Email</h6>
                <input placeholder="email" name="email" required ref={emailRef} className="login-form-input" />
            </div>
            <div className="login-form-input-group">
                <h6>Password</h6>
                <input type="password" placeholder="password" name="password" required ref={passwordRef} className="login-form-input" />
            </div>
            <button className="login-form-submit" onClick={handleLoginUser}>Login</button>
            <p>
                Don't have an account? <span className="login-form-register">Create One Here</span>
            </p>
        </form>
    )
}