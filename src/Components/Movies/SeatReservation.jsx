import React ,{useState , useEffect}  from "react";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SeatReservation = () => {
  const chairs = Array.from({ length: 5 * 4 }, (_, i) => i);
  // depending on the movie event the grid will be either a 30 or a 20
  //const chairs = Array.from({length: 5*4} , (_, i) => i);

  // we will need to keep track of the selected seats so that we can get it back
  const [selectedSeats, setSelectedSeats] = useState([]);


  // then we need to make a discribion for the colors of the chairs
  function ShowFDate() {
    return (
      <ul className="labels">
        <li>
          <FontAwesomeIcon icon={faChair} className="seat_blank" size="1x" />
        </li>
        <li>
          <FontAwesomeIcon icon={faChair} className="seat_selected" size="1x" />
        </li>
        <li>
          <FontAwesomeIcon icon={faChair} className="seat_reserved" size="1x" />
        </li>
      </ul>
    );
  
    function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
      function handleSelectedState(seat) {
        const wasSelected = selectedSeats.includes(seat);
        if (wasSelected) {
          onselectionchange(
            selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
          );
        } else {
          onselectionchange([seat]); // if multiple can be reserved then replace with
          // ( [...selectedSeats] , seat)
        }
      }

      return (
        <div className="Cinema">
          <div className="movie_screen" />
          <div className="chairs">
            {chairs.map((chair) => {
              const isSelected = selectedSeats.includes(chair);
              const isReserved = selectedSeats.includes(chair);
              return (
                <span>
                  <FontAwesomeIcon
                    icon={faChair}
                    className="seat_blank"
                    size="1x"
                  />
                </span>
              );
            })}
          </div>
        </div>
      );
    }
  }
  return <div></div>;
};

export default SeatReservation;
