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
import DashBoard from './Components/Manager/DashBoard';
import ShowMovies from './Components/Manager/ShowMovies';
import MoviesEvents from './Components/Manager/MoviesEvents';
import EditMovie from './Components/Manager/EditMovie';
import AddMovie from './Components/Manager/AddMovie';
import EventList from './Components/Manager/EventList';
import AddEvent from './Components/Manager/AddEvent';
import EditEvent from './Components/Manager/EditEvent';





function App() {
  return (
    <div className="App">
      
      <Router> 
        <Routes>
          <Route exact path="/"  element={<Home />}/>
           <Route path="/signup" element={<SignUp/>}/>
           <Route path="/signin" element={<SignIn/>}/>
           <Route path="/step1" element={<StepOne/>}/>  
           <Route path="/step2" element={<StepTwo/>}/>  
           <Route path="/step3" element={<StepThree/>}/> 
           <Route path="/pastReservations" element={<PastReservations/>}/> 
           <Route path="/dashBoard" element={<DashBoard/>}/>
           <Route  path="/managerMovies" element={<ShowMovies/>}/>
           <Route  path="/mangerMovieEvents" element={<MoviesEvents/>}/>
           <Route path="/EditMovie" element={<EditMovie/>}/>
           <Route path="/addMovie" element={<AddMovie/>}/>
           <Route path="/eventList" element={<EventList/>}/>
           <Route path="/AddEvent" element={<AddEvent/>}/>
           <Route path="editEvent" element={<EditEvent/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
