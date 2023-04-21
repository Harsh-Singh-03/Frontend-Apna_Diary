import React from 'react'
import { useState,useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NoteContext from "../context/notes/Notecontext"
import "./Auth.css"


const Login = () => {
    const [labColor, setlabColor] = useState("")
    const [labTrans, setlabTrans] = useState("")
    const [labColor1, setlabColor1] = useState("")
    const [Slidertest, setSlidertest] = useState(0)
    const [labTrans1, setlabTrans1] = useState("")
    const context = useContext(NoteContext)
    const { bgMode, setloadDisplay, setErrortext, seterrorDisplay, setcategory } = context
    const [auth, setauth] = useState({email: "", password: ""})
    const [authdisplay, setauthdisplay] = useState("block")
    let history = useNavigate();
    useEffect(() => {
        setauth({email: "", password: ""})
            // eslint-disable-next-line
    }, [])
    useEffect(() => {
        setlabColor(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
        setlabColor1(labColor !== "#8f8f8f"? bgMode : "#8f8f8f")
        // let Rotatinganimation = document.getElementById('formBox')
        document.documentElement.style.setProperty('--color', bgMode)
    // eslint-disable-next-line
    }, [bgMode])
    
    const handleSubmit = async (e)=>{
        setloadDisplay("block")
        setauthdisplay("none")
        e.preventDefault(); 
        try {
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/login`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: auth.email, password: auth.password})
            })
            const json = await response.json()
            if(json.success){
                localStorage.setItem("token", json.authToken);
                history("/")
                setcategory("all")
                setauthdisplay("block")
                seterrorDisplay("grid")
                setErrortext(`Succesfully Login with ${auth.email}`)
            }
            else{
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
    const toggleLable = (e)=>{
        setSlidertest(1)
        if(auth.password === ""){
          setlabColor1("#8f8f8f")
          setlabTrans1("translate(10px, 30px)")
        }

            setlabColor(bgMode)
            setlabTrans("translate(0px, 0px)")
      }
    const toggleLable2 = (e)=>{
        if(Slidertest === 1){

            if(auth.password === ""){
              setlabColor1("#8f8f8f")
              setlabTrans1("translate(10px, 30px)")
            }
    
                setlabColor(bgMode)
                setlabTrans("translate(0px, 0px)")
        }
      }
      const toggleLable1 = (e)=>{
        setSlidertest(1)
        if(auth.email === ""){
          setlabColor("#8f8f8f")
          setlabTrans("translate(10px, 30px)")
        }
       setlabColor1(bgMode)
       setlabTrans1("translate(0px, 0px)")
      }
      const toggleLable3 = (e)=>{
        if(Slidertest === 1){
            if(auth.email === ""){
              setlabColor("#8f8f8f")
              setlabTrans("translate(10px, 30px)")
            }
           setlabColor1(bgMode)
           setlabTrans1("translate(0px, 0px)")

        }
      }
    const onChange =(e)=>{
        if(e.target.name === "email" && e.target.value !== ""){
            setlabColor(bgMode)
            setlabTrans("translate(0px, 0px)")
          }
          if(e.target.name === "password" && e.target.value !== ""){
            setlabColor1(bgMode)
            setlabTrans1("translate(0px, 0px)")
          }
        setauth({...auth, [e.target.name]: e.target.value})
    }
    // border: `1px solid ${bgMode}`
     return (
        <div className='container my-2 Loginbox' style={{display : authdisplay}}>
            <div className="formBox" id='formBox'>
            <form onSubmit={handleSubmit} className="loginForm newloginform" style={{ color: bgMode}}>
            <h2 style={{color: bgMode}}>LOG IN</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: labColor, transform: labTrans}}>Email address :</label>
                    <input type="email" style={{color: "#8f8f8f", borderBottom: `1.5px solid ${bgMode}`}} className="" value = {auth.email} onChange={onChange} onClick={toggleLable} onMouseEnter={toggleLable2} id="email" name='email' aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: labColor1, transform: labTrans1}}>Password :</label>
                    <input type="password" style={{color: "#8f8f8f" ,borderBottom: `1.5px solid ${bgMode}`}} className="" value = {auth.password} onChange={onChange} onClick={toggleLable1} onMouseEnter={toggleLable3} id="password" name='password' minLength={8} required/>
                </div>
                <button type="submit" className="BT" style={{borderBottom: `1px solid ${bgMode}`,color: bgMode}} >Log In</button>
                <h5 className='my-2'>Dont't Have an Acount Then <Link to="/signup" style={{fontWeight: "bolder", color: bgMode}}>SIGN UP</Link></h5>
            </form>
            </div>
        </div>
    )
}


export default Login