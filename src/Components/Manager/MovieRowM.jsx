import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Movies/MovieRow.css";
//import axios from "axios";
const movies = [
  {
     "id":1,
     "name":"Spider-Man(No Way Home)",
     "duration":3,
     "price":10,
     "movieImage":"https://images.alphacoders.com/119/thumb-1920-1195168.jpg"
  },
  {
     "id":2,
     "name":"Spider-Man(No Way Home)",
     "duration":3,
     "price":12,
     "movieImage":"https://images.alphacoders.com/119/thumb-1920-1195168.jpg"
  },
  {
     "id":3,
     "name":"Spider-Man(No Way Home)",
     "duration":3,
     "price":8,
     "movieImage":"https://images.alphacoders.com/119/thumb-1920-1195168.jpg"
  },
  {
     "id":4,
     "name":"Spider-Man(No Way Home)",
     "duration":3,
     "price":9,
     "movieImage":"https://images.alphacoders.com/119/thumb-1920-1195168.jpg"
  }
];


function MovieRowM({ category, fetchURL }) {
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
      <h2 className="titleMovie">{category}</h2>
      <div className="row__posters">
       <div className="row__poster">
        {movies.map((movie) => (
          <NavLink
          to={"/eventList"}
          state={{ movie: movie}}
          className="row__poster"
        >
          <a>
            <img key={movie.id} src={movie.movieImage} alt={movie.name}/>
          </a>
        </NavLink>
        ))}
      </div>
      </div>
    </div>
  );
}

export default MovieRowM;
