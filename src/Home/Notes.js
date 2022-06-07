import React from 'react'
import { useContext, useEffect } from "react"
import NoteContext from "../context/notes/Notecontext"
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem'
import AddNotes from './AddNotes'

function Notes() {
  let history = useNavigate();
  const context = useContext(NoteContext)
  const { notes, getNotes, bgMode } = context
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
      <AddNotes />
      <div className="row my-3 mx-2 custom_row">
        {notes.map((note, index) => {
          return <Noteitem note={note} key={index} />
        })}
        {notes.length === 0 ? <p style={{color : bgMode}}>Oops There is nothing to show please Add Notes</p>: <p></p>}
      </div>
    </>
  )
}

export default Notes