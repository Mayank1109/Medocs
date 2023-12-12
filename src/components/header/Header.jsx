import React, { useState } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [activeNav, setActiveNav] = useState("#home");
  return (
    <header className="header">
      <nav className="nav container">
        <div>
          <ul className="nav__list grid">
            <li className="nav__item">
              <a
                href="/#home"
                onClick={() => setActiveNav("#home")}
                className={
                  activeNav === "#home" ? "nav__link active-link" : "nav__link"
                }
              >
                Home
              </a>
            </li>

            <li className="nav__item">
              <a
                href="/#about"
                onClick={() => setActiveNav("#about")}
                className={
                  activeNav === "#about" ? "nav__link active-link" : "nav__link"
                }
              >
                About
              </a>
            </li>

            <li className="nav__item">
              <a
                href="/#features"
                onClick={() => setActiveNav("#features")}
                className={
                  activeNav === "#features"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Features
              </a>
            </li>

            <li className="nav__item">
              <a
                href="/#contact"
                onClick={() => setActiveNav("#contact")}
                className={
                  activeNav === "#contact"
                    ? "nav__link active-link"
                    : "nav__link"
                }
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* <button className="button">login / register</button> */}
      </nav>
    </header>
  );
};

export default Header;
