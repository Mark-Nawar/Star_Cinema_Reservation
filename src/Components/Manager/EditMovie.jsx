import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../Movies/Banner";
import NavMovies from "../Movies/NavMovies";
import { Form, Button } from "react-bootstrap";

function EditMovie() {
  const location = useLocation();
  const movie = location.state?.movie;
  const Name = useRef();
  const Duration = useRef();
  const Image = useRef();
  const Category = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const edited = {
      id: movie.id,
      name: (Name.current.value) ? Name.current.value: movie.name ,
      duration: (Duration.current.value) ? Duration.current.value : movie.duration ,
      movieImage: (Image.current.value) ? Image.current.value : movie.movieImage,
      category: Category.current.value,
    };
    console.log(edited);
    //axios.post(editmovieURL/id , edited);
  }

  return (
    <div>
      <NavMovies whereIam={3} />
      <Banner ImageUrl={movie.movieImage} bannerText={"Edit Movie Details"} />
      <div className="general_timings">
        <div style={{ textAlign: "center", width: "25%", marginLeft: "35%" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control type="text" placeholder={movie.name} ref={Name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Movie Image(URL)</Form.Label>
              <Form.Control
                type="text"
                placeholder={movie.movieImage}
                ref={Image}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                placeholder={movie.duration}
                ref={Duration}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>category</Form.Label>
              <Form.Select aria-label="Default select example" ref={Category}>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Fiction">Fiction</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditMovie;
