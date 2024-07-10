import React from "react";
import "./about.css";
import Info from "./Info";
import Arrow from "../../ui/arrow";

import formImg from "../../assets/form.png";
const About = () => {
  return (
    <section className="about section" id="about">
      <div className="about__container container grid">
        <img src={formImg} alt="" className="about__img" />

        <div className="about__data">
          <h2 className="section__title">About Medocs.</h2>
          <span className="section__subtitle sub">
            Advancing the Delivery of Health Care
          </span>
          <Info />
          <span className="section__subtitle sub disp_spn">
            Medocs Doctor's list
            <Arrow />
          </span>
          <span className="section__subtitle sub disp_spn">
            Location
            <Arrow />
          </span>
        </div>
      </div>
    </section>
  );
};

export default About;
