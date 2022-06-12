import NoteContext from "./Notecontext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = process.env.REACT_APP_API_KEY;
    const notesInitial = []
      const [notes, setnotes] = useState(notesInitial)
      const [viewNote, setviewNote] = useState({rdate: "",id:"", rtitle: "", rdescription: "", rtag: "default"})
      const [read, setread] = useState("none")
      const [errorDisplay, seterrorDisplay] = useState("none")
      const [Errortext, setErrortext] = useState("")

      const [loadDisplay, setloadDisplay] = useState("none")
      const [opacity, setopacity] = useState("")
      const [bgMode, setbgMode] = useState("#00D1FF")
      //  function for add notes
      const getNotes = async ()=>{
        setread("none")
        setopacity("changeOpacity")
        setloadDisplay("block")
        try {
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        
          });
          const json = await response.json()
            setnotes(json.reverse())
        } catch (error) {
          seterrorDisplay("grid")
          setErrortext("Error: Oops! Some error occured!")
        }
          setopacity("")
          setloadDisplay("none")
      }
      //  function for adding a notes
      const addNote = async (title, description, tag)=>{
        setopacity("changeOpacity")
        setloadDisplay("block")
        try {
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
            seterrorDisplay("grid")
            setErrortext("Error: Title must be 5 character Long!")
          }
          else if(description.length < 8){
            seterrorDisplay("grid")
            setErrortext("Error:  Desription must be 8 character Long!")
          }
          else{
            setnotes(notes.concat(json))
            getNotes()
          }
        } catch (error) {
          seterrorDisplay("grid")
          setErrortext("Error: Oops! Some error occured!")
        }
        setopacity("")
        setloadDisplay("none")
      }
      //  function for delete note
      const deleteNote = async (id)=>{
        const confirmation = window.confirm("Hey: Sure want to delete")
        if (confirmation === false) {
            return;
        }
        setopacity("changeOpacity")
        setloadDisplay("block")
        try {
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
        } catch (error) {
          seterrorDisplay("grid")
          setErrortext("Error: Oops! Some error occured!")
        }
        setopacity("")
        setloadDisplay("none")
      }
      //  fucntion for edit notes
      const editNote = async (id, title, description ,tag)=>{
        setopacity("changeOpacity")
        setloadDisplay("block")
        try {
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
          if(title.length < 5){
            seterrorDisplay("grid")
            setErrortext("Error: Title must be 5 character Long!")
            setopacity("")
            setloadDisplay("none")
            return;
          }
          if(description.length < 8){
            seterrorDisplay("grid")
            setErrortext("Error: Desription must be 8 character Long!")
            setopacity("")
          setloadDisplay("none")
            return;
          }
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
        } catch (error) {
          seterrorDisplay("grid")
          setErrortext("Error: Oops! Some error occured!")
        }
        setopacity("")
        setloadDisplay("none")
      }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote,  getNotes, editNote, bgMode,setbgMode,viewNote, setviewNote,read,setread,opacity,setopacity, loadDisplay, setloadDisplay, errorDisplay, seterrorDisplay,Errortext,setErrortext}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;