import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/");
  };
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate("/admin/pending-requests")}>
          Pending Requests
        </li>
        <li onClick={() => navigate("/admin/current-stakeholders")}>
          Current Stakeholders
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
