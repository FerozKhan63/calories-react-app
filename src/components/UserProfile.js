import classes from "./UserProfile.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "./api.js";
import { fetchUser } from "../store/user-slice";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <main className={classes.profile}>
      <h2>My User Profile</h2>
      <h2>
        Name: {profileData?.first_name} {profileData?.last_name}
      </h2>
      <h3>Email: {profileData?.email}</h3>
      <h3>Daily Calorie Limit: {profileData?.calorie_limit}</h3>
      <Link to="/profile/edit">Edit Profile</Link>
    </main>
  );
};

export default UserProfile;
