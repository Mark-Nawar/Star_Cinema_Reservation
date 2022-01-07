import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Banner from "../Movies/Banner";
import "../Movies/step2.css";
import {
  faCalendarDay,
  faClock,
  faAlignJustify,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavMovies from "../Movies/NavMovies";
import { Button } from "react-bootstrap";

const moviesEvents = [
  {
    id: 1,
    M_name: "Avenger",
    date: "01-02-2022",
    S_time: "22:13:00",
    E_time: "24:13:00",
    duration: 2,
    gridType: 1,
    occupied: [0, 4, 8, 19, 14, 9],
  },
  {
    id: 2,
    M_name: "Joker",
    date: "08-03-2020",
    S_time: "22:13:00",
    E_time: "24:13:00",
    duration: 2,
    gridType: 2,
    occupied: [0, 25, 12, 11, 9, 8],
  },
  {
    id: 3,
    M_name: "Toy story",
    date: "03-14-2022",
    S_time: "22:13:00",
    E_time: "24:13:00",
    duration: 2,
    gridType: 2,
    occupied: [0, 25, 12, 11, 9, 8],
  },
  {
    id: 4,
    M_name: "the lion king",
    date: "03-21-2020",
    S_time: "22:13:00",
    E_time: "24:13:00",
    duration: 2,
    gridType: 1,
    occupied: [1, 4, 10, 19, 14, 9],
  },
  {
    id: 5,
    M_name: "Avenger",
    date: "01-02-2022",
    S_time: "20:13:00",
    E_time: "23:13:00",
    duration: 3,
    gridType: 2,
    occupied: [0, 4, 8, 19, 14, 9],
  },
];
const EventList = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  // const [movieEvents, setMovieEvents] = useState([]);
 //  const [delete , setDelete] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(fetchURLofTheMovieName or Id);
  //     setMovieEvents(request.data.results);
  //     return request;
  //   }
  //   fetchData();
  // }, [delete]);
  const bannerText = "Pick An Event OR Add a New One";
  const handleDeletion = (eventid) => {
    console.log(eventid);
    // post req to delete Movie by id
    //axios.delete(deletURL/movie id)
    // set delete state to true
    alert("movie Event deleted");
  };

  return (
    <div>
      <NavMovies whereIam={3} />
      <Banner bannerText={bannerText} ImageUrl={movie.movieImage} />
      <div className="general_timings">
        <div>
          <ShowCase1 movie={movie} />
        </div>
        <div className="h_card">
          <span>
            <small className="inner_span" style={{ paddingLeft: "12px" }}>
              Date
            </small>
          </span>
          <span>
            <small className="inner_span" style={{ paddingLeft: "12px" }}>
              Start Time
            </small>
          </span>

          <span>
            <small className="inner_span" style={{ paddingLeft: "12px" }}>
              End Time
            </small>
          </span>
          <span>
            <small className="inner_span" style={{ paddingLeft: "12px" }}>
              Hall
            </small>
          </span>
          <span>
            {" "}
            <NavLink to="/AddEvent" state={{ movie: movie }}>
              <Button variant="dark">Add Event </Button>
            </NavLink>
          </span>
        </div>
        {moviesEvents.map((movieEvent) => (
          <div className="h_card">
            <span>
              <FontAwesomeIcon icon={faCalendarDay} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {movieEvent.date}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {movieEvent.S_time}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {movieEvent.E_time}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faAlignJustify} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                Hall {movieEvent.gridType}
              </small>
            </span>
            <span>
                <FontAwesomeIcon
                  onClick={() => handleDeletion(movieEvent.id)}
                  icon={faTrash}
                  color="black"
                  size="2x"
                />
              </span>
              <span>
                <NavLink to="/EditEvent" state={{ movie: movie , movieE: movieEvent }}>
                  <FontAwesomeIcon icon={faEdit} color="black" size="2x" />
                </NavLink>
              </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

function ShowCase1({ movie }) {
  return (
    <ul className="ShowCase1">
      <li>
        <small>{movie.name}</small>
      </li>
      <li>
        <FontAwesomeIcon icon={faClock} className="iconSelected" size="1x" />{" "}
        <small>{movie.duration} hours</small>
      </li>
    </ul>
  );
}

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
