import React from 'react'
import { useContext, useEffect } from "react"
import NoteContext from "../context/notes/Notecontext"
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem'
import AddNotes from './AddNotes'

function Notes() {
  const changeDisplayRead= ()=>{
    console.log("read")
    setread("none")
    setopacity("")
  }
  let history = useNavigate();
  const context = useContext(NoteContext)
  const { notes, getNotes, bgMode, read, setread, viewNote, opacity, setopacity } = context

  useEffect(() => {
    // eslint-disable-next-line
    if(localStorage.getItem('token') !== null){
      getNotes()
    }
    else{
      history("/login")
    }
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="readMode" style={{color: bgMode,border: `1px solid ${bgMode}`, display: read}}  >
            <i className="fas fa-times hover" onClick={changeDisplayRead}></i>
                <h5 className='card-title'>READ MODE ONLY</h5>
                <h3 className='card-title'>{viewNote.rtitle}</h3>
                <p className='card-text'>{viewNote.rdescription}</p>
                <p style={{ textAlign: "right"}}>@{viewNote.rtag}</p>
            </div>
      <AddNotes />
      <div className={`row my-3 mx-2 custom_row ${opacity}`} style={{transition: "all 2s ease"}}>
        {notes.map((note, index) => {
          return <Noteitem note={note} key={index} />
        })}
        {notes.length === 0 ? <p style={{color : bgMode}}>Oops There is nothing to show please Add Notes</p>: <p></p>}
      </div>
    </>
  )
}

export default Notes