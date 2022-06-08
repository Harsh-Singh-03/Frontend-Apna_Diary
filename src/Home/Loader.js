import React,{useContext} from 'react'
import NoteContext from "../context/notes/Notecontext"

const Loader = () => {
    const context = useContext(NoteContext)
    const { bgMode, loadDisplay } = context
  return (
    <div className='lodingMast' style={{background:bgMode, display: loadDisplay }}>

    </div>
  )
}

export default Loader