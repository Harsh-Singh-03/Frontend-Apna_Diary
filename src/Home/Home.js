import React , {useContext, useEffect}from 'react'
import Notes from './Notes'
import NoteContext from "../context/notes/Notecontext"
import { useNavigate } from 'react-router-dom';




export default function Home() {
  const context = useContext(NoteContext)
  const { bgMode, setcategory, getNotes, category, setErrortext, seterrorDisplay } = context
  let history = useNavigate();
  const gotoFav = () =>{
    setcategory(category === "fav"? "all": "fav")
    seterrorDisplay("grid")
      setErrortext(`Great! You Can See ${category === "fav" ? "All" : "Favourite"} Notes Now, Click Again To See ${category === "fav"? "Favourite": "All"} Notes.`)
  }
  useEffect(() => {
    // eslint-disable-next-line
    if(localStorage.getItem('token') !== null){
      getNotes()
      
    }
    else{
      history("/login")
    }
    // eslint-disable-next-line
  }, [category])
  return (
     
    <div className='tophead'>
      <h1 className='my-3 mx-3' style={{color: bgMode}}>SWAGATAM TO APNA DIARY</h1>
      <Notes/>
      <div className="favouritePage" style={{border: `1px solid ${bgMode}`}} onClick={gotoFav}>
        <span className='fas fa-heart' style={{color: bgMode}}></span>
      </div>
    </div>
  )
}
