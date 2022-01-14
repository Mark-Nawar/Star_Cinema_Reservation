import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../Movies/NavMovies.css";
function NavMovies({ whereIam }) {
  const [show, changeShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        changeShow(true);
      } else changeShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav_movies ${show && "nav_blackOut"}`}>
      <img
        className="star_logo"
        src="./images/starLogo.png"
        alt="star cinema logo"
      />

      <div className="nav_left_data">
        {whereIam == 1 ? (
          <Link to="/pastReservations" style={{ textDecoration: "none" }}>
            <Button variant="dark" size="sm">
              reservations
            </Button>
          </Link>
        ) : whereIam == 2 ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="dark" size="sm">
              BackHome
            </Button>
          </Link>
        ) : (
          <Link to="/dashBoard" style={{ textDecoration: "none" }}>
            <Button variant="dark" size="sm">
              BackDashBoard
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavMovies;
