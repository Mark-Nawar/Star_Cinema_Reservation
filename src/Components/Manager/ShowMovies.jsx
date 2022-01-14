import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Banner from "../Movies/Banner";
import {
  faClock,
  faTrash,
  faFilm,
  faIdCardAlt,
  faImage,
  faEdit,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import NavMovies from "../Movies/NavMovies";
import axios from "axios";
// const movies = [
//   {
//     id: 1,
//     name: "Spider-Man(No Way Home)",
//     duration: 3,
//     price: 10,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Action",
//   },
//   {
//     id: 2,
//     name: "Spider-Man(No Way Home)",
//     duration: 3,
//     price: 12,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Action",
//   },
//   {
//     id: 3,
//     name: "Spider-Man(No Way Home)",
//     duration: 3,
//     price: 8,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Action",
//   },
//   {
//     id: 4,
//     name: "Seven Pounds",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Drama",
//   },
//   {
//     id: 5,
//     name: "Spider-Man(No Way Home)",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Drama",
//   },
//   {
//     id: 6,
//     name: "Interstellar",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Drama",
//   },
//   {
//     id: 7,
//     name: "Spider-Man",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Fiction",
//   },
//   {
//     id: 8,
//     name: "Spider-Man",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Fiction",
//   },
//   {
//     id: 9,
//     name: "Central Inteligence",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Comedy",
//   },
//   {
//     id: 10,
//     name: "Murder-Mystrey",
//     duration: 3,
//     price: 9,
//     movieImage: "https://images.alphacoders.com/119/thumb-1920-1195168.jpg",
//     category: "Comedy",
//   },
// ];
function ShowMovies() {
   const [movies, setMovies] = useState([]);
  const [cat, setCat] = useState("Action");
  // url array for movies

  useEffect(() => {
    async function fetchData() {
      axios
        .get(`http://localhost:5000/movies/${cat}`)
        .then((res) => {
          console.log(res.data);
          setMovies(res.data);
        })
        .catch((err) => {
          alert("no data fetched");
        });
    }
    fetchData();
  }, [cat]);
  const image = "https://images2.alphacoders.com/773/thumb-1920-773847.jpg";
  const handleDeletion = (movieid) => {
    console.log(movieid);
    // post req to delete Movie by id
    //axios.delete(deletURL/movie id)
    // set delete state to true
    alert("movie deleted");
  };
  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  };
  const handleChangeCat = (event) => {
    setCat(event.target.value);
  };
  const uCat = getUnique(movies, "category");
  function ShowCase1() {
    return (
      <ul className="ShowCase1">
        <li>
          <small>
            <FontAwesomeIcon
              style={{ paddingRight: "2px" }}
              icon={faFilter}
              color="white"
              size="1x"
            />
            Filter
          </small>
        </li>
        <li>
          <label>
            category
            <select
              style={{ marginLeft: "5px" }}
              value={cat}
              onChange={handleChangeCat}
            >
              <option  value="Action">
                  Action
                </option>
                <option  value="Drama">
                  Drama
                </option>
                <option  value="Comedy">
                  Comedy
                </option>
                <option value="Fiction">
                  Fiction
                </option>
              {/* {uCat.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))} */}
            </select>
          </label>
        </li>
      </ul>
    );
  }
  const uniqueCat = getUnique(movies, "category");
  console.log(uniqueCat);
  return (
    <div>
      <NavMovies whereIam={3} />
      <Banner ImageUrl={image} bannerText={"Check The Movies List"} />
      <div className="general_timings">
        <div>
          <ShowCase1 />
        </div>
        <div>
          <div className="h_card">
            <span>
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                id
              </small>
            </span>
            <span>
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                name
              </small>
            </span>

            <span>
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                Image
              </small>
            </span>
            <span>
              <small className="inner_span" style={{ paddingLeft: "12px" }}>
                Duration
              </small>
            </span>
            <span>
              {" "}
              <NavLink to="/AddMovie">
                <Button variant="dark">Add Movie </Button>
              </NavLink>
            </span>
          </div>
          {movies.map((Mymovie) => (
            <div className="h_card">
              <span>
                <FontAwesomeIcon icon={faIdCardAlt} color="black" size="1x" />
                <small className="inner_span" style={{ paddingLeft: "12px" }}>
                  {Mymovie._id}
                </small>
              </span>
              <span>
                <FontAwesomeIcon icon={faFilm} color="black" size="1x" />
                <small className="inner_span" style={{ paddingLeft: "12px" }}>
                  {Mymovie.name}
                </small>
              </span>
              <span>
                <FontAwesomeIcon icon={faImage} color="black" size="1x" />
                <small className="inner_span" style={{ paddingLeft: "12px" }}>
                  <img
                    src={Mymovie.movieImage}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </small>
              </span>
              <span>
                <FontAwesomeIcon icon={faClock} color="black" size="1x" />
                <small className="inner_span" style={{ paddingLeft: "12px" }}>
                  2 Hours
                </small>
              </span>
              <span>
                <FontAwesomeIcon
                  onClick={() => handleDeletion(Mymovie.id)}
                  icon={faTrash}
                  color="black"
                  size="2x"
                />
              </span>
              <span>
                <NavLink to="/EditMovie" state={{ movie: Mymovie }}>
                  <FontAwesomeIcon icon={faEdit} color="black" size="2x" />
                </NavLink>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowMovies;
