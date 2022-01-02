import React from "react";
import "../Movies/MovieRow.css"

function Banner({bannerText , ImageUrl}) {
  return (
    <header className="banner" style={{
        backgroundSize :"cover",
        backgroundImage : `url(${ImageUrl})`,
        backgroundPosition : "50% 20%",
    }}>
      <div className="banner_contents">
          <h1 className="banner_title">{bannerText}</h1>
      </div>
      <div className="banner_fadder"/>
    </header>
  );
}

export default Banner;
