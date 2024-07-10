import React from "react";
import "./services.css";
import ServiceInfo from "./serviceInfo";

const Services = () => {
  return (
    <section className="service section" id="about">
      <div className="service__container container ">
        <div className="service__data">
          <h2 className="section__title">Services</h2>
          <ServiceInfo />
        </div>
      </div>
    </section>
  );
};

export default Services;
