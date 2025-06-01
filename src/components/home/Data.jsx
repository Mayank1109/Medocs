import React from "react";
import { NavLink } from "react-router-dom";
import Arrow from "../../ui/arrow";
import doctors from "../../assets/doctors.png";
const Data = () => {
  return (
    <div className="home__data">
      <h1 className="home__title">Medical Healthcare Solutions </h1>
      <p className="home__description">
        Health is the condition of wisdom and the sign is cheerfullness.
      </p>
      <ul className="price">
        <li>
          <NavLink to="/signup">
            <button className="button change">Get Started</button>
          </NavLink>
        </li>
        <li>
          <button
            className="button dist"
            style={{
              color: "var(--higlight-color)",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            Join Us
            <Arrow />
          </button>
        </li>
      </ul>

      <div className="grid home__grid">
        <img src={doctors} />
        <p>An active community of doctors just for you!</p>
      </div>
    </div>
  );
};

export default Data;
