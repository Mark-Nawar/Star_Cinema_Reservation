import React from "react";
import Banner from "../Movies/Banner";
import { NavLink } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./DashBoard.css"
import NavMovies from "../Movies/NavMovies";
function DashBoard() {
  const image = "https://images6.alphacoders.com/101/thumb-1920-1012628.jpg";
  return (
    <div>
      <NavMovies whereIam={2}/>
      <Banner bannerText={"Manager DashBoard "} ImageUrl={image} />
      <h1 style={{textAlign:"center" ,paddingTop:"50px" ,paddingBottom:"50px"}}>What Do you want to do?</h1>
      <Container>
        <Row className="cardRow">
          <Col  >
            <Card className="cardDash" border="light" style={{ width: "22rem", height: " 24rem" }}>
              <Card.Img
                variant="top"
                src="https://images4.alphacoders.com/909/thumb-1920-909185.jpg"
              />
              <Card.Body>
                <Card.Title>Movies</Card.Title>
                <Card.Text>
                  Add , edit and see all the detalis of the current movies
                </Card.Text>
                <NavLink to={"/managerMovies"}>
                  <Button variant="primary">To movies Page</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col >
            <Card className="cardDash" border="light" style={{ width: "22rem", height: " 24rem" }} >
              <Card.Img
                variant="top"
                src="https://www.teahub.io/photos/full/101-1019747_passeio-das-aguas-cinema.jpg"
              />
              <Card.Body>
                <Card.Title>Movie Events</Card.Title>
                <Card.Text>
                  Create new movies' events and check the details of the seat
                  capacity.
                </Card.Text>
                <NavLink to={"/mangerMovieEvents"}>
                  <Button variant="primary">To movie events page</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashBoard;
