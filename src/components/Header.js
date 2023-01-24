import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.setItem("auth_token", "");
    localStorage.setItem("is_logged_in", false);
    navigate("./");
  };

  const isAuth = localStorage.getItem("is_logged_in") === "true";

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="./">
              <p>Home</p>
            </Link>
          </li>
          {!isAuth && (
            <span className={classes.span}>
              <li>
                <Link to="./signup">
                  <button>Signup</button>
                </Link>
              </li>
              <li>
                <Link to="./login">
                  <button>Login</button>
                </Link>
              </li>
            </span>
          )}
          {isAuth === true && (
            <span className={classes.span}>
              <li>
                <Link to="./profile">
                  <button>Profile</button>
                </Link>
              </li>
              <li>
                <Link to="./meals">
                  <button>Meals</button>
                </Link>
              </li>
              <li>
                <button onClick={() => logoutHandler()}>Logout</button>
              </li>
            </span>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
