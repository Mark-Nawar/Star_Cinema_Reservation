import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./title.css";

function Title() {
  let history = useNavigate();
  const handleClick1 = () => history("/signup");
  const handleClick2 = () => history("/signin");

  return (
    <div>
      <h1>Space Cinema</h1>
      <p className="subtitle">Into the deep space and beyond....</p>
      <a className={`neon-button signup`} onClick={handleClick1}>Sign Up</a>
      <a className={`neon-button signin`} onClick={handleClick2}>Sign In</a>
    </div>
  );
}
export default Title;
