import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../ui/home";
import Bin from "../../ui/bin";
import "./sideNavigation.css";
import Settings from "../../ui/settings";

const SideNavigation = () => {
  return (
    <>
      <ul className="navbar__sidebar" id="sideBar">
        <div className="main_icons">
          <h2 className="sidebar_info">Medocs.</h2>
        </div>
        <div className="menu_list">
          <li>
            <NavLink to="/dashboard">
              <button>
                <div className="icon">
                  <HomeIcon />
                </div>
                Home
              </button>
            </NavLink>
          </li>

          <li>
            <NavLink to="/chat">
              <button>
                <div className="icon">
                  <Settings />
                </div>
                Chat
              </button>
            </NavLink>
          </li>
        </div>
      </ul>
    </>
  );
};

export default SideNavigation;
