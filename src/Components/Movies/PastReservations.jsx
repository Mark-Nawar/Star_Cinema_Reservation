import React, { useEffect } from "react";
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
const Mymovies = [
  {
    id: 1,
    M_name: "Avenger",
    date: "01-02-2022",
    S_time: "22:13:00",
    duration: 2,
    gridType: 1,
    occupied: [0, 4, 8, 19, 14, 9],
  },
  {
    id: 2,
    M_name: "Joker",
    date: "08-03-2020",
    S_time: "22:13:00",
    duration: 2,
    gridType: 2,
    occupied: [0, 25, 12, 11, 9, 8],
  },
  {
    id: 3,
    M_name: "Toy story",
    date: "03-14-2022",
    S_time: "22:13:00",
    duration: 2,
    gridType: 2,
    occupied: [0, 25, 12, 11, 9, 8],
  },
  {
    id: 4,
    M_name: "the lion king",
    date: "03-21-2020",
    S_time: "22:13:00",
    duration: 2,
    gridType: 1,
    occupied: [1, 4, 10, 19, 14, 9],
  },
  {
    id: 5,
    M_name: "Avenger",
    date: "01-02-2022",
    S_time: "20:13:00",
    duration: 3,
    gridType: 2,
    occupied: [0, 4, 8, 19, 14, 9],
  },
];
const user = [
  {
    id: 1,
    Name: "Mark Adel",
  },
];
const PastReservations = () => {
  // const [Mymovies, setMymovies] = useState([]);
 // const [delete , setDelete] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(fetchURLofthe User email to get his reservations);
  //     setMymovies(request.data.results);
  //     return request;
  //   }
  //   fetchData();
  // }, [delete]);
  const bannerText = "Your Reservations";
  const imageUrl = "https://images4.alphacoders.com/758/thumb-1920-75838.jpg";

  const handleDeletion= (movieDate , startTime)=>{
    var today = new Date();
    const d1 = new Date(movieDate+" "+startTime);
    const hours = Math.floor((d1-today) / (1000 * 60 * 60)) % 24;

    if(hours>=3)
    alert("movie deleted");
    // post req to delete Movie Event
    // set delete state to true
    else
    alert("movie in less than three hours not deleted");
    };
  return (
    <div>
      <NavMovies whereIam={0} />
      <Banner bannerText={bannerText} ImageUrl={imageUrl} />
      <div className="general_timings">
        <div>
          <ShowCase1 user={user[0]} />
        </div>

        {Mymovies.map((Mymovie) => (
          <div className="h_card">
            <span>
              <FontAwesomeIcon icon={faFilm} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {Mymovie.M_name}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faCalendarDay} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {Mymovie.date}
              </small>
            </span>

            <span>
              <FontAwesomeIcon icon={faClock} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {Mymovie.S_time}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faAlignJustify} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                Hall {Mymovie.gridType}
              </small>
            </span>
            <span>
              <FontAwesomeIcon onClick={() => handleDeletion(Mymovie.date ,Mymovie.S_time)} icon={faTrash} color="black" size="2x" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastReservations;

function ShowCase1({ user }) {
  return (
    <ul className="ShowCase1">
      <li>
        <small>Name : {user.Name}</small>
      </li>
    </ul>
  );
}
