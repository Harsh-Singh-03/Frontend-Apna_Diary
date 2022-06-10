import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/Notecontext"
import "./Navbar.css"

export default function Navbar() {
    const context = useContext(NoteContext)
    const { bgMode, setbgMode, setread } = context
    const [displaycog, setdisplaycog] = useState("none")
    const pathName = useLocation();
    const navigate = useNavigate();
    const [Display, setDisplay] = useState("block")
    const [Display1, setDisplay1] = useState("none")
    const bgModeChange = ()=>{
        setbgMode("#ff0404")
        setdisplaycog("none")
    }
    const bgModeChange1 = ()=>{
        setbgMode("#FF4D00")
        setdisplaycog("none")
    }
    const bgModeChange2 = ()=>{
        setbgMode("#FE089C")
        setdisplaycog("none")
    }
    const bgModeChange3 = ()=>{
        setbgMode("#00ff8c")
        setdisplaycog("none")
    }
    const bgModeChange4 = ()=>{
        setbgMode("#00D1FF")
        setdisplaycog("none")
    }
    const bgModeChange5 = ()=>{
        setbgMode("#BD02FF")
        setdisplaycog("none")
    }
    const handleCog = ()=>{
        setdisplaycog(displaycog==="none"?"flex":"none")
    }
    const logOut = (e) => {
        e.preventDefault();
        const confirmation = window.confirm("Hey: sure want to log out")
        if (confirmation === true) {
            setread("none")
            localStorage.removeItem('token')
            navigate("/login")
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setDisplay1("block")
            setDisplay("none")
        }
        else {
            setDisplay1("none")
            setDisplay("block")
        }
    }, [pathName])

    return (
        <>
            <nav className='nav_custom' style={{ color: bgMode }}>
                <Link to="/"><h2 style={{ color: bgMode }}>APNA DIARY</h2></Link>
                <div className='nav-right'>
                <div className="ColorDOM" style={{display: displaycog}}>
                <div className="selectColor bg_1" onClick={bgModeChange}></div>
                <div className="selectColor bg_2" onClick={bgModeChange1}></div>
                <div className="selectColor bg_3" onClick={bgModeChange2}></div>
                <div className="selectColor bg_4" onClick={bgModeChange3}></div>
                <div className="selectColor bg_5" onClick={bgModeChange4}></div>
                <div className="selectColor bg_6" onClick={bgModeChange5}></div>
                </div>
                <i className="fas fa-cog rotaionCog" onClick={handleCog}></i>
                <Link className="btn mx-2 hover" style={{ display: Display, border: `1px solid ${bgMode}` }} to="/login" role="button"><i className="fas fa-user " style={{ color: bgMode }}></i></Link>
                <button className="btn hover" style={{ display: Display1, color: bgMode, border: `1px solid ${bgMode}` }} onClick={logOut}><i className="fas fa-sign-out-alt" style={{ color: bgMode }}></i></button>
                </div>
            </nav>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav_custom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">APNA DIARY</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        </ul>
                        <form className="d-flex">
                         
                            <Link className="btn btn-outline-primary mx-2" style={{display: Display}} to="/login" role="button"><i className="fas fa-user"></i></Link>
                            <button className="btn btn-outline-primary" style={{display: Display1}}  onClick={logOut}><i className="fas fa-sign-out-alt"></i></button>
                            
                        </form>
                    </div>
                </div>
            </nav> */}
        </>
    )
}
