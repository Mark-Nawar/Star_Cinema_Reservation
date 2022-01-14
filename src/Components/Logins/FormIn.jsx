import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Card, Alert, Container, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../Logins/SignUp.css";
import Loading from "./Loading";
import axios from "axios";
import { useJwt } from "react-jwt";

const FormIn = () => {
  let navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  // to be added for after JWT ( tokens are ready) validations and api call for signIN
  async function handleSubmit(e) {
    e.preventDefault();
    if (!passwordRef.current.value || !emailRef.current.value) {
      return setError("Those are Required Fields");
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(
        passwordRef.current.value
      )
    ) {
      return setError("Wrong Password Format so Wrong Password");
    }

    const data = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(data);
    setError("");
    setLoading(true);
    axios
      .post("http://localhost:5000/signin/", data)
      .then((res) => {
        console.log(res.data.role);
        if (res.data == "Invalid username or password") {
          return setError("Invalid username or password");
        }
        localStorage.setItem("token", res.data.token);
        if (res.data.role == 1) navigate("/step1", { replace: true });
        else {
          navigate("/dashBoard", { replace: true });
        }
      })
      .catch((err) => {
        setError(err.data);
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
    setLoading(false);
  }

  //navigate("/signin", { replace: true });
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
                <div className="icon">
                  <Image
                    className="align-items-center"
                    src="images/heart.png"
                    fluid
                  />
                </div>
              )}
              <h2 className="text-center mb-4">Sign In for Star cinema</h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {/*  to be repalced with after authentication is finished <Form onSubmit={handleSubmit}> */}
              <Form onSubmit={handleSubmit} className="formTitle">
                <Form.Group id="email">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control size="sm" type="name" ref={emailRef} required />
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
