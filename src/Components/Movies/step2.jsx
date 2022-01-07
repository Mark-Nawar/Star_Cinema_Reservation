import React, { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Banner from "./Banner";
import SeatReservation from "./SeatReservation";
import "./step2.css";
import {
  faCalendarDay,
  faClock,
  faAlignJustify,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavMovies from "./NavMovies";
const moviesEvents = [
  {
    id: 1,
    M_name: "Avenger",
    date: "12-03-2020",
    S_time: '10.00',
    duration: 2,
    gridType: 1,
    occupied: [0, 4, 8, 19, 14, 9],
  },
  {
    id: 2,
    M_name: "Joker",
    date: "08-03-2020",
    S_time: '10.00',
    duration: 2,
    gridType: 2,
    occupied: [0, 25, 12, 11, 9, 8],
  },
  {
    id: 3,
    M_name: "Toy story",
    date: "14-03-2020",
    S_time: '12.00',
    duration: 2,
    gridType: 2,
    occupied: [0, 25, 12, 11, 9, 8],
  },
  {
    id: 4,
    M_name: "the lion king",
    date: "21-03-2020",
    S_time: '12.00',
    duration: 2,
    gridType: 1,
    occupied: [1, 4, 10, 19, 14, 9],
  },
  {
    id: 5,
    M_name: "Avenger",
    date: "13-03-2020",
    S_time: '23.00',
    duration: 3,
    gridType: 2,
    occupied: [0, 4, 8, 19, 14, 9],
  },
];
const StepTwo = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  // const [movieEvents, setMovieEvents] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(fetchURLofTheMovieName or Id);
  //     setMovieEvents(request.data.results);
  //     return request;
  //   }
  //   fetchData();
  // }, [movie]);
  const bannerText = "Step 2: Choose your time slot!";

  return (
    <div>
      <NavMovies whereIam={1}/>
      <Banner bannerText={bannerText} ImageUrl={movie.movieImage} />
      <div className="general_timings">
        <div >
          <ShowCase1 movie={movie} />
        </div>

        {moviesEvents.map((movieEvent) => (
          <div className="h_card">
            <span>
              <FontAwesomeIcon icon={faCalendarDay} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>{movieEvent.date}</small>
            </span>
            <span>
              <FontAwesomeIcon icon={faClock} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                {movieEvent.S_time}
              </small>
            </span>
            <span>
              <FontAwesomeIcon icon={faAlignJustify} color="black" size="1x" />
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                Hall {movieEvent.gridType}
              </small>
            </span>
            <span>
              <NavLink
                to={"/step3"}
                state={{ movie: movie, movieEvent: movieEvent }}
              >
                <a>
                  <FontAwesomeIcon icon={faTicketAlt} color="black" size="2x" />
                </a>
              </NavLink>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;

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
