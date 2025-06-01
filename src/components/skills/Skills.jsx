import React from "react";
import "./skills.css";
import { features } from "./data";
import Features from "./features";

const Skills = () => {
  return (
    <section className="skills section" id="features">
      <div className="container">
        <h2 className="section__title">How To Start ?</h2>

        <div className="skills__container grid">
          {features.map((item) => {
            return <Features item={item} key={item.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
