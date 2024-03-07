import React from "react";

const Info = () => {
  return (
    <div className="footer__info grid">
      <div className="footer__box">
        <h3>Product</h3>
        <ul>
          <li>Remote Job</li>
          <li>Startup</li>
          <li>Investor & Board</li>
          <li>Company</li>
        </ul>
      </div>
      <div className="footer__box">
        <h3>Features</h3>
        <ul>
          <li>For Candidates</li>
          <li>For Comapnies</li>
          <li>Society</li>
        </ul>
      </div>
      <div className="footer__box">
        <h3>About Us</h3>
        <ul>
          <li>Documentation</li>
          <li>Contact Us</li>
          <li>Career</li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
