import React from "react";
import "./extra.css";
import Footer from "../footer/Footer";

const Extra = () => {
  return (
    <section className="extra section" id="about">
      <div className="extra__container container ">
        <div className="extra__data">
          <h2 className="section__title extra_title">TALK TO US!?</h2>
          <div className="btn__grp ">
            <button className="ftr_btn">Chat With us</button>
            <button className="ftr_btn">Email Support</button>
            <button className="ftr_btn">Ask Expert</button>
          </div>
          <a href="#">
            <button className="button try">TRY PRODUCTS</button>
          </a>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Extra;
