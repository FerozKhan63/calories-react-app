import classes from "./Auth.module.css";
import { useState } from "react";
import { login } from "../store/auth-slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userProfile, setUserProfile] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnSubmit = () => {
    dispatch(login({ email: email, password: password }))
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/profile");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  return (
    <main className={classes.auth}>
      <section>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <Button onClick={() => OnSubmit()}>Login</Button>
      </section>
    </main>
  );
}

export default Auth;
