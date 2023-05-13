import {Link} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import axiosClient from "../axios-client";
import {useStateContext} from "../context/ContextProvider";

export default function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const {setUser,setToken} = useStateContext();
    const [errors,setErrors] = useState(null);
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            password_confirmation : passwordConfirmationRef.current.value
        }
        axiosClient.post('/signup',payload)
            .then(({data})=>{
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                console.log(response.data.errors);
                if(response && response.status === 422 ){
                    //console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    {errors && <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" name="full_name" placeholder="Full Name"/>
                    <input ref={emailRef} type="email" name="email" placeholder="Email Address"/>
                    <input ref={passwordRef} type="password" name="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" name="confirm_password" placeholder="Confirm Password"/>
                    <button className="btn btn-block">Signup</button>
                </form>
                <p className="message">
                    Already Registered? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    )
}
