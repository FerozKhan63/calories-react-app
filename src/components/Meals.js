import { useState } from "react";
import { useEffect } from "react";
// import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals, deleteMeal } from "../store/meal-slice";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Meals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [meals, setMeals] = useState(
    useSelector((state) => state.meals.allMeals)
  );

  const userCalorieLimit = useSelector(
    (state) => state.profile.profileData.calorie_limit
  );

  useEffect(() => {
    dispatch(fetchMeals())
      .unwrap()
      .then((result) => {
        setMeals(result);
      });
  }, [meals.length]);

  const deleteHandler = (meal) => {
    dispatch(
      deleteMeal({
        id: meal.id,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setMeals(meals.filter((m) => m !== meal));
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  const renderMeals = meals?.map((meal) => {
    const { id, name, description, calorie_intake, start_date, end_date } =
      meal;
    return (
      <div className="d-flex justify-content-center" key={id}>
        <Card
          className={`${
            userCalorieLimit > meal.calorie_intake
              ? "border border-primary"
              : "border border-danger"
          }`}
          style={{ color: "#000", width: "18rem", marginBottom: "10px" }}
        >
          <Card.Title>{name}</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Calories: {calorie_intake}</ListGroup.Item>
            <ListGroup.Item>Start Date: {start_date}</ListGroup.Item>
            <ListGroup.Item>End Date: {end_date}</ListGroup.Item>
            <ListGroup.Item>Description: {description}</ListGroup.Item>
          </ListGroup>

          <Button onClick={() => navigate(`/meals/${id}/edit`)}>
            Edit Meal
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => deleteHandler(meal)}
          >
            Delete Meal
          </Button>
        </Card>
      </div>
    );
  });

  return (
    <>
      <br></br>
      <Button className="mb-3" onClick={() => navigate("/meals/new")}>
        Add New Meal
      </Button>
      {renderMeals}
    </>
  );
}

export default Meals;
