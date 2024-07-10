import React, { useState } from "react";
import "./recycleBin.css";
import { binData } from "./binData";
import DashDocCard from "../dashboard/dashDocCard";

const RecycleBin = () => {
  const [users, setUsers] = useState(binData);
  // const [isChecked, setIsChecked] = useState(false);

  const binHandler = (event) => {
    event.preventDefault();
    const { id, checked } = event.target;
    console.log(checked);
    // setIsChecked(checked);
    console.log(`clicked ${id}`);

    if (id === "all") {
      let tempUser = users.map((user) => {
        return { ...user, checkit: true };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) => {
        return user.id === id ? { ...user, checkit: true } : user;
      });
      // console.log(tempUser.filter((user) => user?.checkit === true));

      setUsers(tempUser);
      // console.log(tempUser);
    }
  };

  return (
    <>
      <section className="dashboard section">
        <div className=" dash__content ">
          <div className="dash__content btn__grp">
            <h2>Recycle Bin</h2>
          </div>
          <div className="bin__header">
            <button className="bin__button">Empty Recycle bin</button>
            <button className="bin__button"> Restore</button>
            <button className="bin__button">Delete</button>
          </div>
        </div>
      </section>

      <section className="dashboard section">
        <div className="doc">
          {" "}
          <input type="checkbox" id="all" onClick={binHandler} /> select all
        </div>

        <DashDocCard type="checkbox" data={users} binHandler={binHandler} />
      </section>
    </>
  );
};

export default RecycleBin;

// {users.map((ele) => (
//   <div className="card grid" key={ele.id}>
//     <div>
//       <div className="file-name">{ele.name}</div>
//       <div className="sec__line">
//         <div className="line-2">
//           {ele.lab} | {ele.doctor}
//         </div>
//         <div className="line-2">{ele.date}</div>
//       </div>
//     </div>
//     {/* <div className="options-cell"> */}
//     <input
//       id={ele.id}
//       type={props.type}
//       checked={ele?.checkit || false}
//       // className="op"
//       onChange={binHandler}
//     />
//     {/* </div> */}
//   </div>
// ))}
