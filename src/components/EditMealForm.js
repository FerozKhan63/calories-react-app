import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { updateMeal } from "../store/meal-slice";
import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

function EditMealForm() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const meals = useSelector((state) => state.meals.allMeals);
  const meal = meals.find((m) => m.id === Number(id));

  const [name, setName] = useState(meal.name);
  const [description, setDescription] = useState(meal.description);
  const [calorieIntake, setCalorieIntake] = useState(meal.calorie_intake);
  const [startDate, setStartDate] = useState(meal.start_date);
  const [endDate, setEndDate] = useState(meal.end_date);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      dispatch(
        updateMeal({
          id: meal.id,
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
          console.log("object :>> ", rejectedValueOrSerializedError);
          alert(rejectedValueOrSerializedError.message);
        });
    }

    setValidated(true);
    console.log("on submit");
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
          <Button onClick={handleSubmit}>Update Meal</Button>
        </div>
      </Form>
    </main>
  );
}

export default EditMealForm;
