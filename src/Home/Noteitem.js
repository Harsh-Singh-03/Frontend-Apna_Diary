import React from 'react'
import {useContext, useState} from "react"
import './Notes.css'
import NoteContext from "../context/notes/Notecontext"

const Noteitem = (props) => {
    const [Display, setDisplay] = useState("none")
    const [addingNote, setaddingNote] = useState({id:"", etitle: "", edescription: "", etag: "default"})
    const context = useContext(NoteContext)
    const {note} = props;
    const { deleteNote, editNote, bgMode,setread,setviewNote,setopacity} = context;
    // const {addNote} = context;
    const EditNote = (note)=>{
        setaddingNote({id: note._id,etitle: note.title , edescription: note.description, etag: note.tag})
        setDisplay("block")
    }
    const ReadNote =(note)=>{
        setopacity("changeOpacity")
        setread("block")
        setviewNote({rdate: note.date,id: note._id,rtitle: note.title , rdescription: note.description, rtag: note.tag})
    }
    const onChange =(e)=>{
        setaddingNote({...addingNote, [e.target.name]: e.target.value})
    }
    const changeDisplay = ()=>{
        setDisplay("none")
    }
   
    const Updating = (e)=>{
        e.preventDefault()
        editNote(addingNote.id, addingNote.etitle, addingNote.edescription, addingNote.etag)
        setDisplay("none")   
    }
    const newDate = new Date(note.date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
    // const {editNote} = context;
   
    return (
        <>
            <form style={{display: Display, border: `1px solid ${bgMode}`, color: bgMode}} className="toggleEditMode">
            <span className="fas fa-times hover" onClick={changeDisplay}></span>
           
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control hover" id="etitle" name="etitle" aria-describedby="emailHelp" value={addingNote.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea type="text" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control hover" id="edescription" name="edescription" value={addingNote.edescription} onChange={onChange} minLength={8} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tags</label>
                    <input type="text" style={{color: bgMode,border: `1px solid ${bgMode}`}} className="form-control hover" id="etag" name="etag" value={addingNote.etag} onChange={onChange}/>
                </div>
             
                <button type="submit" style={{border: `1px solid ${bgMode}`, color: bgMode}} className="btn btn-primary hover" onClick={Updating} >Upate Note</button>
            </form>
          
        <div className={`col-md-4 my-3}`}>
            <div className={`card`} style={{border: `1px solid ${bgMode}`, color: bgMode}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title.slice(0,18)}{note.title.length > 18 ? "...": ""}</h5>
                    <p className="card-text">{note.description.slice(0,80)}{note.description.length > 80 ? "...": ""}</p>
                    <p className="card-text" style={{position: "absolute", bottom: "2px", right: "10px", fontSize: "small"}}>ON : {newDate}</p>
                    <p className="card-text" style={{fontWeight: "lighter", marginTop: "0px", fontSize: "14px"}}>@{note.tag.slice(0, 20)}{note.tag.length > 20 ? "...": ""}</p>
                    <div className="d-flex note_func">
                    <i className="fas fa-eye hover" style={{border: `1px solid ${bgMode}`}} onClick={()=> {ReadNote(note)}}></i>
                    <i className="fas fa-edit hover" style={{border: `1px solid ${bgMode}`}} onClick={()=> {EditNote(note)}}></i>
                    <i className="fas fa-trash hover" style={{border: `1px solid ${bgMode}`}} onClick={()=> {deleteNote(note._id)}}></i>
                    </div>

                </div>
            </div>
        </div>
        </>
    )
}

export default Noteitem