import React from "react";
import "./footer.css";
import Info from "./info";
import X from "../../ui/X";
import Linkedin from "../../ui/Linkedin";
import Youtube from "../../ui/Youtube";

const Footer = () => {
  return (
    <section className="">
      <div className="footer__container container grid">
        <div className="ftr__container container ">
          <div className="footer__data grid">
            <h1 className="footer__title">Medocs.</h1>
            <div className="footer__social">
              <X />
              <Linkedin />
              <Youtube />
            </div>
          </div>
          <Info />
        </div>
      </div>
    </section>
  );
};

export default Footer;
