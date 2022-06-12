import './App.css';
import Navbar from './Navbar/navbar';
import Home from './Home/Home';
import About from './About/About';
import Loader from './Home/Loader'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/Notestate';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Errorbox from './Error/Errorbox';
// https://backendapnadiary.herokuapp.com/ 
function App() {
  return (
    <>
    <NoteState>
     <Router>
     <Loader/>
     <Errorbox/>
     <Navbar/>
    
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
