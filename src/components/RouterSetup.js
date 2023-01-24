import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import EditUserProfile from "./EditUserProfile";
import Home from "./Home";
import Meals from "./Meals";
import Registration from "./Registration";
import UserProfile from "./UserProfile";
import EditMealForm from "./EditMealForm";
import AddMealForm from "./AddMealForm";
import NotFound from "./NotFound";

function RouterSetup() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditUserProfile />} />
      <Route path="/meals" element={<Meals />} />
      <Route path="/meals/new" element={<AddMealForm />} />
      <Route path="/meals/:id/edit" element={<EditMealForm />} />
      <Route element={<NotFound />} />
    </Routes>
  );
}

export default RouterSetup;
