import React from "react";
import "./footer.css";
import Info from "./info";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container grid">
        <div className="ftr__container container grid">
          <div className="about__data">
            <h1 className="footer__title">Medocs</h1>
            <div className="footer__subtitle">
              <h2>One stop solution for all your medical documents needs</h2>
            </div>
          </div>
          <Info />
        </div>
      </div>
      <div className="text-divider">
        <div className="footer__social">
          <a href="" className="footer__social-link" target="_blank">
            <i className="uil uil-twitter"></i>
          </a>
          <a href="" className="footer__social-link" target="_blank">
            <i className="uil uil-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
