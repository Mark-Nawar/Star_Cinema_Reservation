import React, { useState, useEffect } from "react";
import "../Movies/MovieRow.css"
//import axios from "axios";

function MovieRow({ category, fetchURL }) {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(fetchURL);
  //     setMovies(request.data.results);
  //     return request;
  //   }
  //   fetchData();
  // }, [fetchURL]);

  return (
    <div className="movieRow">
      {/* <h2>{category}</h2> */}
      {/* <div className="row__poster">
        {movies.map((movies) => (
          <img key={movie.id} className="row__poster" src={movie.poster_path} alt={movie.name} />
        ))}
      </div> */}
      <h2 className="titleMovie">Action</h2>
      <div className="row__posters">
        
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />
          <img className="row__poster" src="https://sm.ign.com/t/ign_in/gallery/s/spider-man/spider-man-far-from-home-official-movie-posters_epch.1080.jpg" />

      </div>
    </div>
  );
}

export default MovieRow;
