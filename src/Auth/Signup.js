import React from 'react'
import { useState, useContext } from 'react';
import NoteContext from "../context/notes/Notecontext"
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const context = useContext(NoteContext)
    const { bgMode,setloadDisplay } = context
  const [auth, setauth] = useState({name: "", email: "", password: "", Cpassword:""})
  const [authdisplay, setauthdisplay] = useState("block")
  let history = useNavigate();
  const handleSubmit = async (e)=>{
    setloadDisplay("block")
    setauthdisplay("none")
      e.preventDefault(); 
    
      const response = await fetch(`https://backendapnadiary.herokuapp.com/api/auth/singup`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({name: auth.name, email: auth.email, password: auth.password, Cpassword: auth.Cpassword})
      })
      const json = await response.json()
      if(json.success){
          localStorage.setItem('token', json.authToken);
          history("/")
          setauthdisplay("block")
      }
      else{
        setauthdisplay("block")
          alert(json.error)
      }
      setloadDisplay("none")
  }
  const onChange =(e)=>{
      setauth({...auth, [e.target.name]: e.target.value})
  }

  return (
    <div className='container my-2 Loginbox' style={{display : authdisplay}}>
             <h2 style={{color: bgMode}}>SIGN UP TO APNA DIARY</h2>
      <form onSubmit={handleSubmit} className='loginForm' style={{border: `1px solid ${bgMode}`, color: bgMode}}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control" value = {auth.name} onChange={onChange} id="name" name='name' minLength={3} required/>
          </div>
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control" value = {auth.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control" value = {auth.password} onChange={onChange} minLength={8} id="password" name='password' required/>
          </div>
          <div className="mb-3">
              <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
              <input type="password" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control" value = {auth.Cpassword} onChange={onChange} minLength={8} id="Cpassword" name='Cpassword' required/>
          </div>
          <button type="submit" className="btn btn-primary" style={{border: `1px solid ${bgMode}`, color: bgMode}}>SIGN UP</button>
          <h5 className='my-2'>Already Have an Acount Then <Link to="/login" style={{fontWeight: "bolder", color: bgMode, border: `1px solid ${bgMode}`}}>LOG IN</Link></h5>
      </form>
</div>
  )
}

export default Signup;