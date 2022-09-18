import React from 'react'
import { useState, useContext, useEffect } from 'react';
import NoteContext from "../context/notes/Notecontext"
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const context = useContext(NoteContext)
  const { bgMode, setloadDisplay, setErrortext, seterrorDisplay } = context
  const [auth, setauth] = useState({ name: "", email: "", password: "", Cpassword: "" })
  const [auth1, setauth1] = useState({ email: "", otp: "" })
  const [authdisplay, setauthdisplay] = useState("block")
  const [authdisplay2, setauthdisplay2] = useState("none")

  const [labColor, setlabColor] = useState("#8f8f8f")
  const [labTrans, setlabTrans] = useState("translate(10px, 30px)")
  const [labColor1, setlabColor1] = useState("#8f8f8f")
  const [labTrans1, setlabTrans1] = useState("translate(10px, 30px)")
  const [labColor2, setlabColor2] = useState("#8f8f8f")
  const [labTrans2, setlabTrans2] = useState("translate(10px, 30px)")
  const [labColor3, setlabColor3] = useState("#8f8f8f")
  const [labTrans3, setlabTrans3] = useState("translate(10px, 30px)")
  const [labColor4, setlabColor4] = useState("#8f8f8f")
  const [labTrans4, setlabTrans4] = useState("translate(10px, 30px)")
  const [labColor5, setlabColor5] = useState("#8f8f8f")
  const [labTrans5, setlabTrans5] = useState("translate(10px, 30px)")
  useEffect(() => {
    setlabColor(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
    setlabColor1(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
    setlabColor2(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
    setlabColor3(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
    setlabColor4(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
    setlabColor5(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
    document.documentElement.style.setProperty('--color', bgMode)
    // eslint-disable-next-line
  }, [bgMode])
  
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
  const toggleLable = (e)=>{
    if(auth.email === ""){
      setlabColor1("#8f8f8f")
      setlabTrans1("translate(10px, 30px)")
    }
    if(auth.password === ""){
      setlabColor2("#8f8f8f")
      setlabTrans2("translate(10px, 30px)")

    }
    if(auth.Cpassword === ""){
      setlabColor3("#8f8f8f")
      setlabTrans3("translate(10px, 30px)")
    }
   setlabColor(bgMode)
   setlabTrans("translate(0px, 0px)")
  }
  const toggleLable1 = (e)=>{
    if(auth.name === ""){
      setlabColor("#8f8f8f")
      setlabTrans("translate(10px, 30px)")
    }
    if(auth.password === ""){
      setlabColor2("#8f8f8f")
      setlabTrans2("translate(10px, 30px)")

    }
    if(auth.Cpassword === ""){
      setlabColor3("#8f8f8f")
      setlabTrans3("translate(10px, 30px)")
    }
   setlabColor1(bgMode)
   setlabTrans1("translate(0px, 0px)")
  }
  const toggleLable2 = (e)=>{
    if(auth.email === ""){
      setlabColor1("#8f8f8f")
      setlabTrans1("translate(10px, 30px)")
    }
    if(auth.name === ""){
      setlabColor("#8f8f8f")
      setlabTrans("translate(10px, 30px)")

    }
    if(auth.Cpassword === ""){
      setlabColor3("#8f8f8f")
      setlabTrans3("translate(10px, 30px)")
    }
   setlabColor2(bgMode)
   setlabTrans2("translate(0px, 0px)")
  }
  const toggleLable3 = (e)=>{
    if(auth.email === ""){
      setlabColor1("#8f8f8f")
      setlabTrans1("translate(10px, 30px)")
    }
    if(auth.password === ""){
      setlabColor2("#8f8f8f")
      setlabTrans2("translate(10px, 30px)")

    }
    if(auth.name === ""){
      setlabColor("#8f8f8f")
      setlabTrans("translate(10px, 30px)")
    }
   setlabColor3(bgMode)
   setlabTrans3("translate(0px, 0px)")
  }
  const toggleLable4 = (e)=>{
    if(auth1.otp === ""){
      setlabColor5("#8f8f8f")
      setlabTrans5("translate(10px, 30px)")
    }

   setlabColor4(bgMode)
   setlabTrans4("translate(0px, 0px)")
  }
  const toggleLable5 = (e)=>{
    if(auth1.email === ""){
      setlabColor4("#8f8f8f")
      setlabTrans4("translate(10px, 30px)")
    }

   setlabColor5(bgMode)
   setlabTrans5("translate(0px, 0px)")
  }
  const onChange = (e) => {
    setauth({ ...auth, [e.target.name]: e.target.value })
    if(e.target.name === "name" && e.target.value !== ""){
      setlabColor(bgMode)
      setlabTrans("translate(0px, 0px)")
    }
    if(e.target.name === "email" && e.target.value !== ""){
      setlabColor1(bgMode)
      setlabTrans1("translate(0px, 0px)")
    }
    if(e.target.name === "password" && e.target.value !== ""){
      setlabColor2(bgMode)
      setlabTrans2("translate(0px, 0px)")
    }
    if(e.target.name === "Cpassword" && e.target.value !== ""){
      setlabColor3(bgMode)
      setlabTrans3("translate(0px, 0px)")
    }

  }
  const onChange1 = (e) => {
    if(e.target.name === "email" && e.target.value !== ""){
      setlabColor4(bgMode)
      setlabTrans4("translate(0px, 0px)")
    }
    if(e.target.name === "otp" && e.target.value !== ""){
      setlabColor5(bgMode)
      setlabTrans5("translate(0px, 0px)")
    }
    setauth1({ ...auth1, [e.target.name]: e.target.value })
  }
  return (
    <>

      <div className='container my-2 Loginbox' style={{ display: authdisplay }}>
        <div className="formBox formBox1">

       
        <form onSubmit={handleSubmit} className='loginForm newloginform' style={{color: bgMode }}>
        <h2 style={{ color: bgMode }}>SIGN UP</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ color: labColor, transform: labTrans}}>Name :</label>
            <input type="text" style={{ color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}` }} className="textInputnew" value={auth.name} onChange={onChange}  onClick={toggleLable} onMouseEnter={toggleLable} id="name" name='name' minLength={3} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: labColor1, transform: labTrans1}}>Email address :</label>
            <input type="email" style={{ color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}` }} onClick={toggleLable1} onMouseEnter={toggleLable1} className="" value={auth.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: labColor2, transform: labTrans2}}>Password :</label>
            <input type="password" style={{ color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}` }}  onClick={toggleLable2} onMouseEnter={toggleLable2} className="" value={auth.password} onChange={onChange} minLength={8} id="password" name='password' required />
          </div>
          <div className="mb-3">
            <label htmlFor="Cpassword" className="form-label" style={{ color: labColor3, transform: labTrans3}}>Confirm Password :</label>
            <input type="password" style={{ color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}` }}  onClick={toggleLable3} onMouseEnter={toggleLable3} className="" value={auth.Cpassword} onChange={onChange} minLength={8} id="Cpassword" name='Cpassword' required />
          </div>
          <button type="submit" className="" style={{ borderBottom: `1px solid ${bgMode}`, color: bgMode }}>SIGN UP</button>
          <h5 className='my-2'>Already Have an Acount Then <Link to="/login" style={{ fontWeight: "bolder", color: bgMode }}>LOG IN</Link></h5>
        </form>
        </div>
      </div>
      <div className='container my-2 Loginbox' style={{ display: authdisplay2 }}>
        <div className="formBox">

        <form onSubmit={handleVerify} className='loginForm newloginform' style={{ color: bgMode }}>
           <h2 style={{ color: bgMode }}>Verify Your Email..</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: labColor4, transform: labTrans4}}>Email address :</label>
            <input type="email" style={{ color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}` }} onClick={toggleLable4} onMouseEnter={toggleLable4} className="" value={auth1.email} onChange={onChange1} id="email" name='email' aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label" style={{ color: labColor5, transform: labTrans5}}>OTP :</label>
            <input type="text" style={{ color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}` }} onClick={toggleLable5} onMouseEnter={toggleLable5} className="" value={auth1.otp} onChange={onChange1} id="otp" name='otp' required />
          </div>

          <button type="submit" className="" style={{ borderBottom: `1px solid ${bgMode}`, color: bgMode }} >Verify</button>
        </form>
        </div>
      </div>

    </>
  )
}

export default Signup;