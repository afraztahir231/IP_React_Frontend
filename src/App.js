import Upload from "./pages/Upload";
import Enhance from "./pages/Enhance";
import Instr from "./components/Instr";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import Compare from "./pages/Compare"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const token = localStorage.getItem("access_token");

  return (
  <>
  {console.log(token)}
    <Router>
      <Routes>
        <Route exact path = "/" element = {<Home/>}/>
        <Route exact path = "/signup" element = {<Signup/>}/>
        <Route exact path = "/login" element = {<Login/>}/>
        <Route exact path = "/upload" element = {token !== "none" ? <><Upload /><Instr /><Footer /></>:<Login/>}></Route>
        <Route exact path = "/enhance" element = {<><Enhance /><Instr /><Footer /></>}></Route>
        <Route exact path = "/compare" element = {<Compare />}></Route>
      </Routes>
    </Router>
  </>
  );
}

export default App;
