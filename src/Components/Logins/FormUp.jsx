import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Alert, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Logins/SignUp.css";
import Loading from "./Loading";
import axios from "axios";

const FormUp = () => {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const name = useRef();
  const f = useRef();
  const l = useRef();
  const userType = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !passwordRef.current.value ||
      !passwordConfirmRef.current.value ||
      !emailRef.current.value
    ) {
      return setError("Those are Required Fields");
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
        emailRef.current.value
      )
    ) {
      return setError("Invalid Email Address");
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
        passwordRef.current.value
      )
    ) {
      return setError(
        "The Password must be at least 8 characters and contains at least : a lowercase, an uppercase and a number "
      );
    }
    const data = {
      username: name.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      firstName: f.current.value,
      lastName: l.current.value,
      role: userType.current.value == "customer" ? 1 : 2,
    };
    setError("");
    setLoading(true);
    axios
      .post("http://localhost:5000/signup/", data)
      .then((res) => {
        console.log(res.data);
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        setError("Account Already Exits");
        setLoading(false);
      });

    // try {
    //   setError("");
    //   setLoading(true);
    //   await signup(emailRef.current.value, passwordRef.current.value);
    //   history.push("/login");
    // } catch {
    //   setError("Account Already Exits");
    // }
    // setLoading(false);
  }

  return (
    <div className="bg-img">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {loading ? (
                <Loading />
              ) : (
                <div className="icon">
                  <Image
                    className="align-items-center"
                    src="images/heart.png"
                    fluid
                  />
                </div>
              )}
              <h2 className="text-center mb-1">Sign Up for Star cinema</h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {/*  to be repalced with after authentication is finished <Form onSubmit={handleSubmit}> */}
              <Form onSubmit={handleSubmit} className="formTitle">
                <Form.Group id="email">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control size="sm" type="name" ref={name} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label> First Name</Form.Label>
                  <Form.Control size="sm" type="name" ref={f} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label> Last Name</Form.Label>
                  <Form.Control size="sm" type="name" ref={l} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    size="sm"
                    type="email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    size="sm"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>category</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    ref={userType}
                  >
                    <option value="customer">customer</option>
                    <option value="manager">manager</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-1"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </Form>
              <hr class="hr-text" data-content="OR" />
              <Link to="/step1" style={{ textDecoration: "none" }}>
                {localStorage.setItem("token", "")}
                <Button variant="outline-primary" className="w-100 mt-1">
                  Or Visit as a Guest!{" "}
                </Button>
              </Link>
            </Card.Body>
            <p className="w-100 text-center mt-1">
              Already have an account ?{" "}
              <Link to="/signin" style={{ textDecoration: "none" }}>
                Log in
              </Link>
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default FormUp;
