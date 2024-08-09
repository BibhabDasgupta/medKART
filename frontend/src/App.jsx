import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./Table.css"

import Home from "./components/Home";
import Manufacturers from "./components/Manufacturers";
import Wholesalers from "./components/Wholesalers";
import Distributors from "./components/Distributors";
import HospitalsPharmacies from "./components/HospitalsPharmacies";
import Admin from "./components/Admin";
import Login1 from "./components/Login1";
import Register1 from "./components/Register1";
import NotFound from "./components/NotFound"; // Optional: 404 Page
import Login2 from "./components/Login2";
import Register2 from "./components/Register2";
import Login3 from "./components/Login3";
import Register3 from "./components/Register3";
import Login4 from "./components/Login4";
import Register4 from "./components/Register4";
import DashBoard1 from "./components/DashBoard1";
import DashBoard2 from "./components/DashBoard2";
import DashBoard3 from "./components/DashBoard3";
import DashBoard4 from "./components/DashBoard4";
import DashBoard6 from "./components/adminDashBoard";
import Login6 from "./components/Login6";
import Register6 from "./components/Register6";
import ProtectedRoute from "./components/ProtectedRoute";
import PendingRequests from "./components/Pendingequests";
import Home1 from "./components/Home1";
import Home2 from "./components/Home2";
import Home3 from "./components/Home3";
import Home4 from "./components/Home4";
import RegisterManufacturer from "./components/RegisterManufacturer";
import RegisterWholesaler from "./components/RegisterWholesaler";
import RegisterDistributor from "./components/RegisterDistributor";
import RegisterHospitalPharmacy from "./components/RegisterHospitalPharmacy";
import Present from "./components/Present";
import Track from "./components/Track";
import Iot from "./components/Iot";

// App component
const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Navigation or Header component can be added here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/wholesalers" element={<Wholesalers />} />
          <Route path="/distributors" element={<Distributors />} />
          <Route
            path="/hospitalspharmacies"
            element={<HospitalsPharmacies />}
          />
          <Route path="/track" element={<Track />} />
          <Route path="/iot" element={<Iot />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manufacturers/login" element={<Login1 />} />
          <Route path="/manufacturers/register" element={<Register1 />} />
          <Route
            path="/manufacturers/dashboard"
            element={<ProtectedRoute element={<DashBoard1 />} />}
          />
          <Route
            path="/manufacturers/home"
            element={<Home1 />}
          />

          <Route path="/wholesalers/login" element={<Login2 />} />
          <Route path="/wholesalers/register" element={<Register2 />} />
          <Route
            path="/wholesalers/dashboard"
            element={<ProtectedRoute element={<DashBoard2 />} />}
          />
          <Route
            path="/wholesalers/home"
            element={<Home2 />}
          />

          <Route path="/distributors/login" element={<Login3 />} />
          <Route path="/distributors/register" element={<Register3 />} />
          <Route
            path="/distributors/dashboard"
            element={<ProtectedRoute element={<DashBoard3 />} />}
          />
          <Route
            path="/distributors/home"
            element={<Home3 />}
          />

          <Route path="/hospitalspharmacies/login" element={<Login4 />} />
          <Route path="/hospitalspharmacies/register" element={<Register4 />} />
          <Route
            path="/hospitalspharmacies/dashboard"
            element={<ProtectedRoute element={<DashBoard4 />} />}
          />
          <Route
            path="/hospitalspharmacies/home"
            element={<Home4 />}
          />

          {/* <Route path="/track/lo" element={<Login5 />} />
          <Route path="/patients/register" element={<Register5 />} />
          <Route
            path="/patients/dashboard"
            element={<ProtectedRoute element={<DashBoard5 />} />}
          /> */}
          <Route path="/admin/login" element={<Login6 />} />
          <Route path="/admin/register" element={<Register6 />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<DashBoard6 />} />}
          />
          <Route
            path="/admin/pending-requests"
            element={<ProtectedRoute element={<PendingRequests />} />}
          />
          <Route
            path="/admin/current-stakeholders"
            element={<ProtectedRoute element={<Present />} />}
          />
          <Route
            path="/admin/register-manufacturer"
            element={<ProtectedRoute element={<RegisterManufacturer />} />}
          />
          <Route
            path="/admin/register-wholesaler"
            element={<ProtectedRoute element={<RegisterWholesaler />} />}
          />
          <Route
            path="/admin/register-distributor"
            element={<ProtectedRoute element={<RegisterDistributor />} />}
          />
          <Route
            path="/admin/register-hospital-pharmacy"
            element={<ProtectedRoute element={<RegisterHospitalPharmacy />} />}
          />

          {/* Optional: 404 Page if no route matches */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Footer component can be added here */}
      </div>
    </Router>
  );
};

export default App;

