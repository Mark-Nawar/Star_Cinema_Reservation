import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../Movies/NavMovies.css";
function NavMovies() {
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
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button variant="dark" size="sm">
            reservations
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NavMovies;
