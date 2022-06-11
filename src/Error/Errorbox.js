import React, {useContext} from 'react'
import NoteContext from "../context/notes/Notecontext"
import "./error.css"

const Errorbox = () => {
    const context = useContext(NoteContext)
    const { bgMode, Errortext,errorDisplay,seterrorDisplay  } = context;

  return (
    <div className='errorbox' style={{display: errorDisplay, color: bgMode, border: `1px solid ${bgMode}`}}>
          <i className="fas fa-times hover" onClick={()=>seterrorDisplay("none")}></i>
          <p style={{fontSize: "20px"}}>{Errortext}</p>
    </div>
  )
}

export default Errorbox