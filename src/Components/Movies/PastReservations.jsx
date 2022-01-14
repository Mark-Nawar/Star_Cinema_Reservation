import React, { useEffect ,useState} from "react";
import { NavLink } from "react-router-dom";
import Banner from "./Banner";
import "./step2.css";
import {
  faCalendarDay,
  faClock,
  faAlignJustify,
  faTrash,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavMovies from "./NavMovies";
import axios from "axios"
// const Mymovies = [
//   {
//     id: 1,
//     M_name: "Avenger",
//     date: "01-02-2022",
//     S_time: "22:13:00",
//     duration: 2,
//     gridType: 1,
//     occupied: [0, 4, 8, 19, 14, 9],
//   },
//   {
//     id: 2,
//     M_name: "Joker",
//     date: "08-03-2020",
//     S_time: "22:13:00",
//     duration: 2,
//     gridType: 2,
//     occupied: [0, 25, 12, 11, 9, 8],
//   },
//   {
//     id: 3,
//     M_name: "Toy story",
//     date: "03-14-2022",
//     S_time: "22:13:00",
//     duration: 2,
//     gridType: 2,
//     occupied: [0, 25, 12, 11, 9, 8],
//   },
//   {
//     id: 4,
//     M_name: "the lion king",
//     date: "03-21-2020",
//     S_time: "22:13:00",
//     duration: 2,
//     gridType: 1,
//     occupied: [1, 4, 10, 19, 14, 9],
//   },
//   {
//     id: 5,
//     M_name: "Avenger",
//     date: "01-02-2022",
//     S_time: "20:13:00",
//     duration: 3,
//     gridType: 2,
//     occupied: [0, 4, 8, 19, 14, 9],
//   },
// ];
// const user = [
//   {
//     id: 1,
//     Name: "Mark Adel",
//   },
// ];
const PastReservations = () => {
   const [Mymovies, setMymovies] = useState([]);
  const [delet, setDelete] = useState(false);

   useEffect(() => {
     async function fetchData() {
        const headers = {
      'x-access-token': localStorage.getItem('token')
    }
    axios
      .get("http://localhost:5000/viewReser" ,{
        headers: headers
      })
      .then((res) => {
        console.log(res.data);
        setMymovies(res.data);
      })
      .catch((err) => {
        alert("reservation status failed");
      });
      
     }
     fetchData();
    },[]
   );
    
  

  const bannerText = "Your Reservations";
  const imageUrl = "https://images4.alphacoders.com/758/thumb-1920-75838.jpg";

  const handleDeletion= (movieDate , startTime ,movie)=>{
    var today = new Date();
    const d1 = new Date(movieDate+" "+startTime);
    const hours = Math.floor((d1-today) / (1000 * 60 * 60)) % 24;

    if(hours>=3){
    alert("movie deleted");
    const newR = {
      "userID" : movie.user,
      "movieEventID" : movie.movieEvent,
      "occupied"    : movie.occupied,
  }
    // id is auto incremented
    console.log(newR);
    const headers = {
      'x-access-token': localStorage.getItem('token')
    }
    axios
      .post("http://localhost:5000/deleteReservation", newR ,{
        headers: headers
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => {
        alert("reservation failed");
      });
    // //axios.post(insertUrl , newM );
    }else
    alert("movie in less than three hours not deleted");
    };
  return (
    <div>
      <NavMovies whereIam={2} />
      <Banner bannerText={bannerText} ImageUrl={imageUrl} />
      <div className="general_timings">
        <div>
          <ShowCase1  />
        </div>

        {Mymovies.map((Mymovie) => (
          <div className="h_card">
            <span>
              <FontAwesomeIcon icon={faFilm} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {Mymovie.name}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faCalendarDay} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {Mymovie.found.date}
              </small>
            </span>

            <span>
              <FontAwesomeIcon icon={faClock} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {Mymovie.found.S_time}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faAlignJustify} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                Hall {Mymovie.found.gridType}
              </small>
            </span>
            <span>
              <FontAwesomeIcon onClick={() => handleDeletion(Mymovie.found.date ,Mymovie.found.S_time,Mymovie)} icon={faTrash} color="black" size="2x" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastReservations;

function ShowCase1() {
  return (
    <ul className="ShowCase1">
      <li>
        <small>reserved movies events sorted by first to last</small>
      </li>
    </ul>
  );
}
