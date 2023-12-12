import React from "react";
import "./skills.css";
import { featuresData } from "./data";
import FeaturesCard from "./featuresCard";

const Features = () => {
  return (
    <section className="skills section" id="features">
      <div className="translate_it_Y"> </div>
      <div className="skills__container conatiner grid">
        <div
          className="features__card"
          style={{
            background: "transparent",
            width: "15rem",
            justifyContent: "space-evenly",
          }}
        >
          <button className="button transform">Our Solutions</button>
          <h3>
            Managing Documents not only makes them secure but also but also
            allows you to securely share it with your doctors and much more.
          </h3>
        </div>

        <div className="card grid">
          {featuresData.map((item) => {
            return <FeaturesCard item={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
