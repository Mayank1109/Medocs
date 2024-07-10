import React, { useState } from "react";
import "./loginsignup.css";
import { Form } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PopOver from "../../ui/popover";
import { popupActions } from "../../store/componentSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState();
  const [message, setMessage] = useState();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isPopupVisible = useSelector((state) => state.popup.isPopupVisible);

  const loginHandler = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("password").value;

    if (
      email.length < 4 ||
      !email.includes("@") ||
      pwd.length == 0 ||
      email.length == 0
    ) {
      setMessage("credentials invalid or empty!!");
      setLoginStatus("fail");
      dispatch(popupActions.display());

      {
        isPopupVisible && <PopOver mssg={message} status={loginStatus} />;
      }
      return;
    }

    // if (logged in successfully) {
    setMessage("Logged in Successfullt!!");
    setLoginStatus("success");
    dispatch(authActions.login());
    dispatch(popupActions.display());
    // console.log("Logged in Successfully !!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="login section">
      <div className="log__container" id="container">
        <div className="form-container log-in-container">
          <Form method="post" className="log__form" action="#">
            {isPopupVisible && <PopOver mssg={message} status={loginStatus} />}
            <h1 style={{ marginBottom: "2.5rem" }}>login.</h1>
            <input
              id="email"
              name="email"
              className="log__input"
              type="email"
              placeholder="Email"
              required
            />
            <input
              id="password"
              className="log__input"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button className="log__btn button" onClick={loginHandler}>
              Login
            </button>
            <NavLink to="/signup" style={{ textDecoration: "none" }}>
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
