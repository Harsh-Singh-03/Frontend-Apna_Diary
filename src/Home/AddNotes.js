import React from 'react'
import {useContext, useState} from "react"
import NoteContext from "../context/notes/Notecontext"

const AddNotes = () => {
    const [display, setdisplay] = useState("none")
    const [className1, setclassName1] = useState("")
    const [addingNote, setaddingNote] = useState({title: "", description: "", tag: "default"})
    const context = useContext(NoteContext)
    const {addNote, bgMode, setread} = context;
    const changeDisplay = ()=>{
        setdisplay(display=== "none"?"block":"none")
        setclassName1(className1===""? "rotateBaby":"")
    }
    const onChange =(e)=>{
        setaddingNote({...addingNote, [e.target.name]: e.target.value})
    }
    const handleSubmit =(e)=>{
        setread("none")
        e.preventDefault();
        setdisplay(addingNote.title.length >= 5 && addingNote.description.length >= 8 ? "none": "block")
        addNote(addingNote.title, addingNote.description, addingNote.tag)
    }
    return (
             <div className="container my-2 addingNoteDOM">
            <form className='noteForm' style={{border: `1px solid ${bgMode}`, color: bgMode, display: display}}>
                 <span className="fas fa-times hover" onClick={changeDisplay}></span>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{marginTop: "10px"}}>Title</label>
                    <input type="text" style={{color: bgMode, border: `1px solid ${bgMode}`}} className="form-control hover" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control hover" id="description" name="description" onChange={onChange} minLength={8} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control hover" id="tag" name="tag" onChange={onChange}/>
                </div>
             
                <button type="submit" style={{border: `1px solid ${bgMode}`, color: bgMode}}  className="btn btn-primary hover" onClick={handleSubmit}>Add Note</button>
            </form>
            <i className= {`fas fa-plus ${className1}`} onClick={changeDisplay} style={{border: `1px solid ${bgMode}`, color: bgMode}}></i>
        </div>
    )
}

export default AddNotes