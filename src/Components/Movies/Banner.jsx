import React from "react";
import "../Movies/MovieRow.css"

function Banner() {
  return (
    <header className="banner" style={{
        backgroundSize :"cover",
        backgroundImage : 'url(https://i.imgur.com/duNO2Zx.png)',
        backgroundPosition : "50% 20%",
    }}>
      <div className="banner_contents">
          <h1 className="banner_title">Step-1 : Choose Your Movie!</h1>
      </div>
      <div className="banner_fadder"/>
    </header>
  );
}

export default Banner;
