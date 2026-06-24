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

// Corporate
import CorporateDashBoard from "./Pages/Corporate/DashBoard/CDashBoard.jsx";
import CorporateAttackLibrary from "./Pages/Corporate/AttackLibrary/AttackLibrary.jsx";
import CorporateAutomatedLab from "./Pages/Corporate/AutomatedLab/AutomatedLab.jsx";
import CorporateManualLab from "./Pages/Corporate/ManualLab/ManualLab.jsx";
import CorporateReports from "./Pages/Corporate/Reports/Reports.jsx";
import CorporateAttackReports from "./Pages/Corporate/Reports/AttackReports.jsx";
import CorporateReportDetail from "./Pages/Corporate/Reports/ReportDetail.jsx";

function App() {
  return (
    <Routes>

      {/*  PUBLIC */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthForm />} />


      {/*  INDIVIDUALS  */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/attack-library" element={<AttackLibrary />} />
        <Route path="/admin/scenarios/:attackType" element={<ScenarioManagement />} />
        <Route path="/automated-lab" element={<AutomatedLab />} />
        <Route path="/manual-lab" element={<ManualLab />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/attack/:attackType" element={<AttackReports />} />
        <Route path="/reports/detail/:attackRunId" element={<ReportDetail />} />
      </Route>


      {/* CORPORATE  */}
      <Route element={<MainLayout />}>
        <Route path="/corporate/dashboard" element={<CorporateDashBoard />} />
        <Route path="/corporate/attack-library" element={<CorporateAttackLibrary />} />
        <Route path="/corporate/automated-lab" element={<CorporateAutomatedLab />} />
        <Route path="/corporate/manual-lab" element={<CorporateManualLab />} />
        <Route path="/corporate/reports" element={<CorporateReports />} />
        <Route path="/corporate/reports/attack/:attackType" element={<CorporateAttackReports />} />
        <Route path="/corporate/reports/detail/:attackRunId" element={<CorporateReportDetail />} />
      </Route>

    </Routes>
  );
}

export default App;