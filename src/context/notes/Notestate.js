import NoteContext from "./Notecontext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "https://backendapnadiary.herokuapp.com";
    const notesInitial = []
      const [notes, setnotes] = useState(notesInitial)
      const [bgMode, setbgMode] = useState("#00D1FF")
      //  function for add notes
      const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
      
        });
        const json = await response.json()
          console.log(json)
          setnotes(json)
      }
      //  function for adding a notes
      const addNote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
      
          body: JSON.stringify({title, description, tag}) 
        });
        const json = await response.json();
        if(title.length < 5){
          alert("Error: Title must be 5 character Long!")
        }
        else if(description.length < 8){
          alert("Error:  Desription must be 8 character Long!")
        }
        else{
          setnotes(notes.concat(json))
        }
      }
      //  function for delete note
      const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
      
        });
        const json = await response.json()
          console.log(json)
       console.log("deletes" + id)
        const newNote = notes.filter((note)=>{return note._id !== id})
        setnotes(newNote)
      }
      //  fucntion for edit notes
      const editNote = async (id, title, description ,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
      
          body: JSON.stringify({title, description, tag}) 
        });
        const json = response.json();
        console.log(json);
        let  newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index];
          if(element._id === id){
            console.log("click on edit")
            newNote[index].title = title
            newNote[index].description = description
            newNote[index].tag = tag
            break;
          }
          
        }
        setnotes(newNote)
      }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote,  getNotes, editNote, bgMode,setbgMode}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;