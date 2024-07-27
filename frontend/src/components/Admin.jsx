import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './Login6';
import Register from './Register6';
import DashBoard from './adminDashBoard';
import PendingRequests from './Pendingequests';
import RegisterManufacturer from './RegisterManufacturer';
import RegisterWholesaler from './RegisterWholesaler';
import RegisterDistributor from './RegisterDistributor';
import RegisterHospitalPharmacy from './RegisterHospitalPharmacy';
import Present from './Present';

const Admin = () => {
  return (
    <div className="distributors-container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/current-stakeholders" element={<Present />} />
        <Route path="/register-manufacturer" element={<RegisterManufacturer />} />
        <Route path="/register-wholesaler" element={<RegisterWholesaler />} />
        <Route path="/register-distributor" element={<RegisterDistributor />} />
        <Route path="/register-hopital-pharmacy" element={<RegisterHospitalPharmacy />} />
      </Routes>
    </div>
  );
}

export default Admin;