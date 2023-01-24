import classes from "./Auth.module.css";
import { useState, useEffect } from "react";
import api from "./api";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../store/user-slice";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function EditUserProfile() {
  const profile = useSelector((state) => state.profile.profileData);
  const [calorieIntake, setCalorieIntake] = useState(profile.calorie_limit);
  const [lastName, setLName] = useState(profile.last_name);
  const [firstName, setFName] = useState(profile.first_name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OnSubmit = () => {
    console.log("on submit");
    dispatch(
      editUser({
        first_name: firstName,
        last_name: lastName,
        calorie_limit: calorieIntake,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/profile");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.error);
      });
  };

  return (
    <main className={classes.auth}>
      <Form>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={firstName}
          onChange={(e) => setFName(e.target.value)}
        />

        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="last_name"
          value={lastName}
          onChange={(e) => setLName(e.target.value)}
        />

        <Form.Label>Calorie Limit</Form.Label>
        <Form.Control
          type="text"
          name="calorie_limit"
          value={calorieIntake}
          onChange={(e) => setCalorieIntake(e.target.value)}
        />
      </Form>
      <br></br>
      <div className="footer">
        <Button onClick={() => OnSubmit()}>Update Profile</Button>
      </div>
    </main>
  );
}

export default EditUserProfile;
