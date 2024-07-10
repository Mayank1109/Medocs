import React from "react";
import "./choose.css";
import { optionActions } from "../../store/optionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
const Choose = ({ opendocHandler }) => {
  const dispatch = useDispatch();
  const selectedRow = useSelector((state) => state.option.selectedRow);
  const hideOptionsHandler = (event) => {
    event.preventDefault();

    dispatch(optionActions.hide());
  };

  const modalDisplayHandler = (event, actionType) => {
    event.preventDefault();

    dispatch(modalActions.display(actionType));
  };

  return (
    <>
      {selectedRow && (
        <div className="options-container">
          <div class="options-modal ">
            <button class="modal__btn-close" onClick={hideOptionsHandler}>
              ⨉
            </button>

            <ul>
              <li onClick={opendocHandler}>
                <p>Open</p>
              </li>
              <li onClick={(event) => modalDisplayHandler(event, "delete")}>
                <p>Delete</p>
              </li>
              <li onClick={(event) => modalDisplayHandler(event, "edit")}>
                <p>Edit</p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div class="overlay__choose hidden" onClick={hideOptionsHandler}></div>
    </>
  );
};

export default Choose;
