import classes from "./Auth.module.css";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { signup } from "../store/auth-slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLName] = useState("");
  const [firstName, setFName] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrationHandler = async () => {
    console.log("in auth handler");
    const data = {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      password_confirmation: passwordConf,
    };
    dispatch(signup(data))
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/profile");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  const OnSubmit = () => {
    console.log("on submit");
    registrationHandler();
  };

  return (
    <main className={classes.auth}>
      <Form className="form-body">
        <div className={classes.control}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="first_name"
            value={firstName}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="last_name"
            value={lastName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </div>
      </Form>
      <div class="footer">
        <Button onClick={() => OnSubmit()}>Register</Button>
      </div>
    </main>
  );
}

export default Registration;
