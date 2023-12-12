import React from "react";
import "./about.css";
import Info from "./Info";
import formImg from "../../assets/form.png";
const About = () => {
  return (
    <section className="about section" id="about">
      <div className="about__container container grid">
        <img src={formImg} alt="" className="about__img" />

        <div className="about__data">
          <h2 className="section__title title">
            Categorise your documents all in one place
          </h2>
          <span className="section__subtitle sub">
            Streamline and organize effortlessly with our all-in-one solution
          </span>
          {/* <Info /> */}
        </div>
      </div>
    </section>
  );
};

export default About;
