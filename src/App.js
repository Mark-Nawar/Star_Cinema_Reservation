import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Components/HomePage/Home.jsx"


function App() {
  return (
    <div className="App">
      
      <Router> 
        <Routes>
          <Route exact path="/"  element={<Home />}/>
          {/* <Route path="/signup" element={<Signup />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
