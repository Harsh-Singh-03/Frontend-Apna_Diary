import React from 'react'
import { useState,useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NoteContext from "../context/notes/Notecontext"
import "./Auth.css"


const Login = () => {
    const context = useContext(NoteContext)
    const { bgMode, setloadDisplay } = context
    const [auth, setauth] = useState({email: "", password: ""})
    let history = useNavigate();
    const handleSubmit = async (e)=>{
        setloadDisplay("block")
        e.preventDefault(); 
        const response = await fetch(`https://backendapnadiary.herokuapp.com/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email: auth.email, password: auth.password})
        })
        const json = await response.json()
        if(json.success){
            localStorage.setItem("token", json.authToken);
            history("/")
        }
        else{
            alert("Invalid Email and password")
        }
        setloadDisplay("none")
    }
    const onChange =(e)=>{
        setauth({...auth, [e.target.name]: e.target.value})
    }

     return (
        <div className='container my-2 Loginbox'>
            <h2 style={{color: bgMode}}>LOG IN TO APNA DIARY</h2>
            <form onSubmit={handleSubmit} className="loginForm" style={{border: `1px solid ${bgMode}`, color: bgMode}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address :</label>
                    <input type="email" style={{color: bgMode, border: `1px solid ${bgMode}`}} className="form-control" value = {auth.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input type="password" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control" value = {auth.password} onChange={onChange} id="password" name='password' minLength={8} required/>
                </div>
                <button type="submit" className="btn btn-primary" style={{border: `1px solid ${bgMode}`,color: bgMode}} >Log In</button>
                <h5 className='my-2'>Dont't Have an Acount Then <Link to="/signup" style={{fontWeight: "bolder", color: bgMode, border: `1px solid ${bgMode}`}}>SIGN UP</Link></h5>
            </form>
        </div>
    )
}


export default Login