import { foldersData } from "./dashData";
import React, { useState } from "react";
import Modal from "../modal/modal";
import "./dashboard.css";
import SearchIcon from "../../ui/searchIcon";
import DashCard from "../../ui/dashCard";
import { modalActions } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import DashDocCard from "./dashDocCard";
import { useNavigate } from "react-router-dom";

const authToken = false;

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const userData = useSelector((state) => state.doc.userDocs);
  const modalHandler = (event, actionType) => {
    event.preventDefault();
    dispatch(modalActions.display(actionType));
  };

  return (
    <>
      <section className="dashboard section">
        <div className=" dash__content grid">
          <div className="dash__content btn__grp">
            <h2>Documents</h2>
          </div>
          <div className="header_searchbox">
            <form className="search__it">
              <div className="searchbox">
                <input
                  type="text"
                  className="Search"
                  placeholder="search"
                  // ref={searchInputRef}
                />
                <SearchIcon />
              </div>
            </form>
            {isModalVisible && <Modal />}

            <button
              className="add__new"
              onClick={(event) => modalHandler(event, "upload")}
            >
              +
            </button>
            <div className="user__profile"></div>
          </div>
        </div>
      </section>

      <div className="idk">
        <div className=" dashboard section ">
          <div className="dashcard ">
            {foldersData.map((item) => {
              return <DashCard item={item} key={item.id} />;
            })}
          </div>
        </div>

        <section className="dashboard section">
          {/* <DashBoardTable /> */}
          <DashDocCard type="text" data={props.data} />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
