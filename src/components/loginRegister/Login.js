import React from "react";
import "./LoginRegister.css";
import { Form } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PopOver from "../../UI/popover";
import { popupActions } from "../../store/componentSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isPopupVisible = useSelector((state) => state.popup.isPopupVisible);
  const loginHandler = (event) => {
    event.preventDefault();

    // if (logged in successfully) {
    dispatch(authActions.login());
    dispatch(popupActions.display());
    // console.log("Logged in Successfully !!");
    // setTimeout(() => {
    //   navigate("/dashboard");
    // }, 1000);
    // }
    //
  };

  return (
    <div className="login section">
      <div className="log__container" id="container">
        <div className="form-container log-in-container">
          {isPopupVisible && <PopOver mssg="Logged in Successfully" />}

          <Form method="post" className="log__form" action="#">
            <h1 style={{ marginBottom: "2.5rem" }}>Login</h1>
            <input
              id="email"
              name="email"
              className="log__input"
              type="email"
              placeholder="Email"
              required
            />
            <input
              className="log__input"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button className="log__btn button" onClick={loginHandler}>
              Login
            </button>
            <NavLink to="/register" style={{ textDecoration: "none" }}>
              <p>Not a Member ? Register</p>
            </NavLink>
          </Form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <div className="log__img"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
