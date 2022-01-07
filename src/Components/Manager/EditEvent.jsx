import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../Movies/Banner";
import NavMovies from "../Movies/NavMovies";
import { Form, Button } from "react-bootstrap";

function EditEvent() {
  const location = useLocation();
  const movie = location.state?.movie;
  const movieE = location.state?.movieE;
  const MDate = useRef();
  const S_time = useRef();
  const E_time = useRef();
  const gridType = useRef();
  const occupied = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    var timeStart = new Date("01/01/2007 " + S_time.current.value).getHours();
    var timeEnd = new Date("01/01/2007 " + E_time.current.value).getHours();
    var today = new Date();
    const d1 = new Date(MDate.current.value + " " + S_time.current.value);
    const hours = Math.floor((d1 - today) / (1000 * 60 * 60)) % 24;
    const diff = timeEnd - timeStart;
    if (diff <= 0) {
      alert("End time must be greater than start time");
      return;
    }
    if (hours <= 0) {
      alert("Movie Events must be in the Future");
      return;
    }

    const newME = {
      M_name: movie.name,
      date: MDate.current.value,
      S_time: S_time.current.value,
      E_time: E_time.current.value,
      duration: diff,
      gridType: gridType.current.value,
      occupied: movieE.occupied,
    };
    console.log(newME);
    //axios.post(editUrl , newME );
  }

  return (
    <div>
      <NavMovies whereIam={3} />
      <Banner ImageUrl={movie.movieImage} bannerText={"Edit Movie Details"} />
      <div className="general_timings">
        <div style={{ textAlign: "center", width: "25%", marginLeft: "35%" }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>MDate</Form.Label>
              <Form.Control
                type="date"
                placeholder="Add Event Date"
                ref={MDate}
                required
              />
              <Form.Text className="text-muted">
                MDate must be in the format MM-DD-YYYY
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Move Start Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Movie Start Time"
                ref={S_time}
                required
              />
              <Form.Text className="text-muted">
                Time Must Be in the format HH:MM:SS
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Move End Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Movie End Time"
                ref={E_time}
                required
              />
              <Form.Text className="text-muted">
                Time Must Be in the format HH:MM:SS
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Occ. Seats</Form.Label>
              <Form.Control
                type="text"
                value={movieE.occupied}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Hall Type</Form.Label>
              <Form.Select aria-label="Default select example" ref={gridType}>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Event
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
