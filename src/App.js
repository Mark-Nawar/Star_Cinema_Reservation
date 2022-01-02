import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Components/HomePage/Home.jsx"
import SignUp from './Components/Logins/SignUp';
import SignIn from './Components/Logins/SignIn';
import MovieRow from './Components/Movies/MovieRow';
import { StepOne } from './Components/Movies/step1';
import StepTwo from './Components/Movies/step2';
import StepThree from './Components/Movies/step3';
import PastReservations from './Components/Movies/PastReservations';


function App() {
  return (
    <div className="App">
      
      <Router> 
        <Routes>
          <Route exact path="/"  element={<Home />}/>
           <Route path="/signup" element={<SignUp/>}/>
           <Route path="/signin" element={<StepOne/>}/>
           <Route path="/step2" element={<StepTwo/>}/>  
           <Route path="/step3" element={<StepThree/>}/> 
           <Route path="/pastReservations" element={<PastReservations/>}/> 

        </Routes>
      </Router>
    </div>
  );
}

export default App;
