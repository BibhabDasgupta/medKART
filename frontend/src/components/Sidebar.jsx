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
        <li onClick={() => navigate("/admin/register-manufacturer")}>
          Register Manufacturer
        </li>
        <li onClick={() => navigate("/admin/register-wholesaler")}>
          Register Wholesaler
        </li>
        <li onClick={() => navigate("/admin/register-distributor")}>
          Register Distributor
        </li>
        <li onClick={() => navigate("/admin/register-hospital-pharmacy")}>
          Register Hospital/Pharmacy
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
