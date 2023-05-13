import { useRef, useState } from "react";
import {Link} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser,setToken} = useStateContext();
    const [errors,setErrors] = useState(null);
    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }
        axiosClient.post('/login',payload)
            .then(({data})=>{
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                console.log(response.data.errors);
                if(response && response.status === 422 ){
                    if(response.data.errors)
                    {
                        setErrors(response.data.errors);
                    }else{
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                    
                }
            });
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {errors && <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" name="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" name="email" placeholder="Password"/>
                    <button type="submit" className="btn btn-block">Login</button>
                </form>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </div>
        </div>
    )
}
