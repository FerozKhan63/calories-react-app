import { useState } from "react";
import { addMeal } from "../store/meal-slice";
import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function AddMealForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [calorieIntake, setCalorieIntake] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = () => {
    console.log("on submit");
    dispatch(
      addMeal({
        name: name,
        description: description,
        calorie_intake: calorieIntake,
        end_date: endDate,
        start_date: startDate,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        navigate("/meals");
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  return (
    <main className={classes.auth}>
      <Form noValidate validated={validated} OnSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Label>Calorie Intake</Form.Label>
        <Form.Control
          required
          value={calorieIntake}
          onChange={(e) => setCalorieIntake(e.target.value)}
        />
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <br></br>
        <div className="footer">
          <Button onClick={handleSubmit}>Add Meal</Button>
        </div>
      </Form>
    </main>
  );
}

export default AddMealForm;
