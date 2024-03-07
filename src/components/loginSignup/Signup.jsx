import "./loginsignup.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { popupActions } from "../../store/componentSlice";
import PopOver from "../../ui/popover";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [accountCreated, setAccountCreated] = useState(false);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isPopupVisible = useSelector((state) => state.popup.isPopupVisible);

  const registerHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="login section">
        <div className="log__container" id="container">
          <div className="form-container log-in-container">
            {isPopupVisible && <PopOver mssg="Account created." />}
            <form className="log__form" type="submit">
              <h1 style={{ marginBottom: "1rem" }}>Signup.</h1>
              <input
                className="log__input"
                type="text"
                placeholder="Name"
                required
              />
              <input
                className="log__input"
                type="text"
                placeholder="UserName"
                required
              />
              <input
                className="log__input"
                type="email"
                placeholder="Email"
                required
              />
              <input
                className="log__input"
                type="password"
                placeholder="Password"
                required
              />
              <button className="log__btn button" onClick={registerHandler}>
                Signup
              </button>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <p>Already a Member ? Login</p>
              </NavLink>
            </form>
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
    </>
  );
};

export default Signup;
