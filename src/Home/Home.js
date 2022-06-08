import React , {useContext}from 'react'
import Notes from './Notes'
import NoteContext from "../context/notes/Notecontext"
import Loader from './Loader'



export default function Home() {
  const context = useContext(NoteContext)
  const { bgMode } = context
  return (
    <div className='tophead'>
      <Loader/>
      <h1 className='my-3 mx-3' style={{color: bgMode}}>SWAGATAM TO APNA DIARY</h1>
      <Notes/>
      
    </div>
  )
}
