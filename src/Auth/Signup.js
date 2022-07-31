import React from 'react'
import { useState, useContext } from 'react';
import NoteContext from "../context/notes/Notecontext"
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const context = useContext(NoteContext)
  const { bgMode, setloadDisplay, setErrortext, seterrorDisplay } = context
  const [auth, setauth] = useState({ name: "", email: "", password: "", Cpassword: "" })
  const [auth1, setauth1] = useState({ email: "", otp: "" })
  const [authdisplay, setauthdisplay] = useState("block")
  const [authdisplay2, setauthdisplay2] = useState("none")
  let history = useNavigate();
  const handleSubmit = async (e) => {
    setloadDisplay("block")
    setauthdisplay("none")
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/singup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ name: auth.name, email: auth.email, password: auth.password, Cpassword: auth.Cpassword })
      })
      const json = await response.json()
      if (json.success) {
        seterrorDisplay("grid")
        setErrortext("OTP Send Successfully! Check Your Mail")
        // localStorage.setItem('token', json.authToken);
        setauthdisplay2("block")
        setauthdisplay("none")
      }
      else {
        setauthdisplay("block")
        seterrorDisplay("grid")
        setErrortext(`Error : ${json.error}`)
      }
    } catch (error) {
      seterrorDisplay("grid")
      setErrortext("Error: Oops! Some error occured!")
    }
    setloadDisplay("none")
  }
  const handleVerify = async (e) => {
    e.preventDefault();
    setauthdisplay2("none")
    setloadDisplay("block")
    try {
      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/verifygmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email: auth1.email, otp: auth1.otp })
      })
      const json = await response.json()
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        history("/")
        setauthdisplay2("none")
        setauthdisplay("block")
        seterrorDisplay("grid")
        setErrortext(`WELCOME!! ${auth.name}`)
      }
    } catch (error) {
      seterrorDisplay("grid")
      setErrortext(error)
      setauthdisplay2("block")
    }
     setloadDisplay("none")
  }
  const onChange = (e) => {
    setauth({ ...auth, [e.target.name]: e.target.value })
  }
  const onChange1 = (e) => {
    setauth1({ ...auth1, [e.target.name]: e.target.value })
  }
  return (
    <>

      <div className='container my-2 Loginbox' style={{ display: authdisplay }}>
        <h2 style={{ color: bgMode }}>SIGN UP TO APNA DIARY</h2>
        <form onSubmit={handleSubmit} className='loginForm' style={{ border: `1px solid ${bgMode}`, color: bgMode }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" style={{ color: bgMode, border: `1px solid ${bgMode}` }} className="form-control" value={auth.name} onChange={onChange} id="name" name='name' minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" style={{ color: bgMode, border: `1px solid ${bgMode}` }} className="form-control" value={auth.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" style={{ color: bgMode, border: `1px solid ${bgMode}` }} className="form-control" value={auth.password} onChange={onChange} minLength={8} id="password" name='password' required />
          </div>
          <div className="mb-3">
            <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
            <input type="password" style={{ color: bgMode, border: `1px solid ${bgMode}` }} className="form-control" value={auth.Cpassword} onChange={onChange} minLength={8} id="Cpassword" name='Cpassword' required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ border: `1px solid ${bgMode}`, color: bgMode }}>SIGN UP</button>
          <h5 className='my-2'>Already Have an Acount Then <Link to="/login" style={{ fontWeight: "bolder", color: bgMode, border: `1px solid ${bgMode}` }}>LOG IN</Link></h5>
        </form>
      </div>
      <div className='container my-2 Loginbox' style={{ display: authdisplay2 }}>
        <h2 style={{ color: bgMode }}>Verify Your Email..</h2>
        <form onSubmit={handleVerify} className='loginForm' style={{ border: `1px solid ${bgMode}`, color: bgMode }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address :</label>
            <input type="email" style={{ color: bgMode, border: `1px solid ${bgMode}` }} className="form-control" value={auth1.email} onChange={onChange1} id="email" name='email' aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP :</label>
            <input type="text" style={{ color: bgMode, border: `1px solid ${bgMode}` }} className="form-control" value={auth1.otp} onChange={onChange1} id="otp" name='otp' required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ border: `1px solid ${bgMode}`, color: bgMode }} >Verify</button>
        </form>
      </div>

    </>
  )
}

export default Signup;