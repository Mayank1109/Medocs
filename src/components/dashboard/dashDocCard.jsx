import React, { useState } from "react";
import "./dashDocCard.css";
import Options from "../../ui/options";
import { optionActions } from "../../store/optionsSlice";
import Choose from "../choose/choose";
import { useDispatch, useSelector } from "react-redux";

const DashDocCard = (props) => {
  const [docPath, setDocPath] = useState("");
  const dispatch = useDispatch();
  const isOptionsVisible = useSelector(
    (state) => state.option.isOptionsVisible
  );

  const selectedRow = useSelector((state) => state.option.selectedRow);

  const optionsHandler = (event, id, file) => {
    event.preventDefault();
    // setSelectedRow(id);
    console.log(id);
    setDocPath(file);
    console.log(file);
    dispatch(optionActions.selectRow(id));
    dispatch(optionActions.display());
  };

  const opendocHandler = (event) => {
    try {
      window.open(`http://localhost:7000/${docPath}`, "_blank", "noreferrer");
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  return (
    <>
      <div className="doc">Documents</div>

      {props.data.map((ele) => (
        <div className="card grid" key={ele.id}>
          <div>
            <div className="file-name">{ele.name}</div>
            <div className="sec__line">
              <div className="line-2">
                {ele.lab} | {ele.doctor}
              </div>
              <div className="line-2">{ele.date}</div>
            </div>
          </div>
          <div className="options-cell">
            {selectedRow === ele.id && isOptionsVisible && (
              <Choose opendocHandler={opendocHandler} />
            )}

            {props.type == "text" ? (
              <button
                className="op"
                onClick={(event) => optionsHandler(event, ele.id, ele.file)}
              >
                <Options />
              </button>
            ) : (
              <input
                id={ele.id}
                type={props.type}
                checked={ele?.checkit || false}
                // className="op"
                onChange={props.binHandler}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default DashDocCard;
