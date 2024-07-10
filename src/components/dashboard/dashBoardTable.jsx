import React from "react";
import { tableData } from "./dashData";
import "./dashBoardTable.css";
import Options from "../../ui/options";
import { optionActions } from "../../store/optionsSlice";
import Choose from "../choose/choose";
import { useDispatch, useSelector } from "react-redux";

const DashBoardTable = () => {
  const dispatch = useDispatch();
  const isOptionsVisible = useSelector(
    (state) => state.option.isOptionsVisible
  );

  const selectedRow = useSelector((state) => state.option.selectedRow);

  const optionsHandler = (event, id) => {
    event.preventDefault();
    // setSelectedRow(id);
    console.log(id);
    dispatch(optionActions.selectRow(id));
    dispatch(optionActions.display());
  };

  return (
    <>
      <div className="doc">Documents</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lab</th>
            <th>Date</th>
            <th>Doctor</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((ele) => (
            <tr key={ele.id}>
              <td>{ele.name}</td>
              <td>{ele.lab}</td>
              <td>{ele.date}</td>
              <td>{ele.doctor}</td>
              <td className="options-cell">
                {selectedRow === ele.id && isOptionsVisible && <Choose />}

                <button
                  className="more"
                  onClick={(event) => optionsHandler(event, ele.id)}
                >
                  <Options />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashBoardTable;
