import React from "react";
import "./services.css";
import doctor from "../../assets/doctor.png";
const Services = () => {
  return (
    <section className="service section" id="about">
      <div className="service__container container grid">
        <div className="service__data">
          <h2 className="service__title">Document management made easy</h2>
          <span className="service__subtitle sub">
            seamlessly share documents with your healthcare providers
          </span>
        </div>
        <img src={doctor} alt="" className="service__img" />
      </div>
    </section>
  );
};

export default Services;
