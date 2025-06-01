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
          {/* <span className="section__subtitle sub disp_spn">
            Connect with Certified Doctors
            <Arrow />
          </span>
          <span className="section__subtitle sub disp_spn">
            Care Wherever You Are
            <Arrow />
          </span>
          <span className="section__subtitle sub disp_spn">
            Track Your Health in Real Time
            <Arrow />
          </span>
          <span className="section__subtitle sub disp_spn">
            <Arrow />
          </span> */}

          <div class="accordions">
            <div class="accordion">
              <input type="checkbox" id="question-1" />
              <label for="question-1" class="accordion__header" id="question-1">
                Connect with Certified Doctors
              </label>
              <div class="accordion__content">
                <p>
                  Chat with licensed professionals for expert medical advice
                  anytime.
                </p>
              </div>
            </div>

            <div class="accordion">
              <input type="checkbox" id="question-2" />
              <label for="question-2" class="accordion__header">
                Care Wherever You Are
              </label>
              <div class="accordion__content">
                <p>
                  Find nearby clinics and services tailored to your location.
                </p>
              </div>
            </div>

            <div class="accordion">
              <input type="checkbox" id="question-3" />
              <label for="question-3" class="accordion__header">
                Track Your Health in Real Time
              </label>
              <div class="accordion__content">
                <p>
                  Keep an eye on your vitals with easy-to-read analytics and
                  health trends.
                </p>
              </div>
            </div>

            <div class="accordion">
              <input type="checkbox" id="question-4" />
              <label for="question-4" class="accordion__header">
                Manage Your Medical Records Easily
              </label>
              <div class="accordion__content">
                <p>
                  Securely store and retrieve prescriptions, reports, and lab
                  results whenever you need them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
