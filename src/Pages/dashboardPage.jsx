import "./dashboardPage.css";
import Dashboard from "../components/dashboard/dashboard";
import SideNavigation from "../components/sideNavigation/sideNavigation";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { docActions } from "../store/docSlice";
const DashboardPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const [docData, setDocData] = useState([]);
  const fetchDocHandler = async () => {
    try {
      const response = await fetch("http://localhost:7000/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result.response);

      const loadedDocs = [];

      result.response.map((el) => {
        loadedDocs.push({
          id: el._id,
          name: el.file_name,
          lab: el.lab,
          doctor: el.doctor,
          date: el.date.split("T")[0],
          file: el.file,
        });
      });

      setDocData(loadedDocs);
      dispatch(docActions.setDocs(result.response));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocHandler();
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="grid_container">
      <div className="grid_menu">
        <SideNavigation />
      </div>
      <div className="grid_main">
        <Dashboard data={docData} />
      </div>
    </div>
  );
};

export default DashboardPage;
