import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../Movies/Banner";
import NavMovies from "../Movies/NavMovies";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function AddMovie() {
  const Name = useRef();
  const Duration = useRef();
  const Image = useRef();
  const Category = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const newM = {
      name: Name.current.value,
      //duration: Duration.current.value,
      movieImage: Image.current.value,
      category: Category.current.value,
    };
    // id is auto incremented
    console.log(newM);
    const headers = {
      'x-access-token': localStorage.getItem('token')
    }
    axios
      .post("http://localhost:5000/addMovie", newM ,{
        headers: headers
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => {
        alert("insertion failed");
      });
    //axios.post(insertUrl , newM );
  }

  return (
    <div>
      <NavMovies whereIam={3} />
      <Banner
        ImageUrl="https://images8.alphacoders.com/650/thumb-1920-650026.jpg"
        bannerText={"Add a New Movie"}
      />
      <div className="general_timings">
        <div style={{ textAlign: "center", width: "25%", marginLeft: "35%" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control type="text" placeholder="Movie Name" ref={Name} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Movie Image(URL)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Movie Poster URL"
                ref={Image}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                placeholder="Film Duration in Hours"
                ref={Duration}
                required
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
              Add Movie
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
