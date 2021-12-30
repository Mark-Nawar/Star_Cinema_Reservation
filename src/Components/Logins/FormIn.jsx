import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Alert, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Logins/SignUp.css";
import Loading from "./Loading";

const FormIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  // to be added for after JWT ( tokens are ready) validations and api call for signIN
  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     if (
  //       !passwordRef.current.value ||
  //       !passwordConfirmRef.current.value ||
  //       !emailRef.current.value
  //     ) {
  //       return setError("Those are Required Fields");
  //     }
  //     if (
  //       !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
  //         emailRef.current.value
  //       )
  //     ) {
  //       return setError("Invalid Email Address");
  //     }
  //     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //       return setError("Passwords do not match");
  //     }
  //     if (
  //       !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
  //         passwordRef.current.value
  //       )
  //     ) {
  //       return setError(
  //         "The Password must be at least 8 characters and contains at least : a lowercase, an uppercase and a number "
  //       );
  //     }

  //     try {
  //       setError("");
  //       setLoading(true);
  //       await signup(emailRef.current.value, passwordRef.current.value);
  //       history.push("/login");
  //     } catch {
  //       setError("Account Already Exits");
  //     }
  //     setLoading(false);
  //   }

  return (
    <div className="bg-img">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {loading ? (
                <Loading />
              ) : (
                <Loading />
              )}
              <h2 className="text-center mb-4">Sign In for Star cinema</h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {/*  to be repalced with after authentication is finished <Form onSubmit={handleSubmit}> */}
              <Form className="formTitle">
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
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-2"
                  disabled={loading}
                >
                  Log in
                </Button>
              </Form>
            </Card.Body>
            <p className="w-100 text-center mt-2">
              Don't Have an Account ? <Link to="/signup">Sign Up</Link>
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default FormIn;
