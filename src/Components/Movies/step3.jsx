import React, { useEffect } from 'react'
import { useLocation , NavLink } from 'react-router-dom'
import Banner from './Banner'
import SeatReservation from './SeatReservation'
import './step2.css'
import { faCalendarDay ,faClock, faAlignJustify} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavMovies from './NavMovies'
const StepThree = () => {
    const location  = useLocation();
    console.log(location);
    const  movie  = location.state?.movie;
    const  moviesEvent  = location.state?.movieEvent;



    return (
        <div>
            <NavMovies whereIam={1}/>
            <SeatReservation movie={movie} movieEvent={moviesEvent}/>
        </div>
    )
}

export default StepThree
