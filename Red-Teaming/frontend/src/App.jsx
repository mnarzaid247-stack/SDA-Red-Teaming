import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import LandingPage from "./Pages/LandingPage/LandingPage.jsx";
import AuthForm from "./Pages/Individuals/AuthForm/AuthForm.jsx";

// Layout
import MainLayout from "./Layouts/MainLayout/MainLayout.jsx";

// Individuals
import DashBoard from "./Pages/Individuals/DashBoard/DashBoard.jsx";
import AttackLibrary from "./Pages/Individuals/AttackLibrary/AttackLibrary.jsx";
import AutomatedLab from "./Pages/Individuals/AutomatedLab/AutomatedLab.jsx";
import ManualLab from "./Pages/Individuals/ManualLab/ManualLab.jsx";
import Reports from "./Pages/Individuals/Reports/Reports.jsx";
import AttackReports from "./Pages/Individuals/Reports/AttackReports.jsx";
import ReportDetail from "./Pages/Individuals/Reports/ReportDetail.jsx";
import ScenarioManagement from "./Pages/Individuals/AttackLibrary/ScenarioManagement.jsx";
import Profile from "./Pages/Individuals/Profile/Profile.jsx";
import UserManagement from "./Pages/Individuals/UserManagement/UserManagement.jsx";

// Corporate
import ComingSoon from './Pages/Corporate/ComingSoon.jsx';

function App() {
  return (
    <Routes>

      {/*  PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthForm />} />


      {/*  INDIVIDUALS  */}
      <Route element={<MainLayout />}>
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attack-library" element={<AttackLibrary />} />
        <Route path="/admin/scenarios/:attackType" element={<ScenarioManagement />} />
        <Route path="/automated-lab" element={<AutomatedLab />} />
        <Route path="/manual-lab" element={<ManualLab />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/attack/:attackType" element={<AttackReports />} />
        <Route path="/reports/detail/:attackRunId" element={<ReportDetail />} />
      </Route>


      {/* CORPORATE  */}
      <Route>
        <Route path="/corporate/CoomingSoon" element={<ComingSoon />} />
      </Route>

    </Routes>
  );
}

export default App;