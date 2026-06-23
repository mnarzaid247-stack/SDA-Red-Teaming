import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportGrid from "../../../Components/Individuals/Reports/ReportGrid.jsx";
import { getReportDetails } from "../../../API/ReportAPI.js";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // 🔥 لما يضغط على Attack Type Card
  const handleAttackClick = (attackType) => {
    navigate(`/reports/attack/${encodeURIComponent(attackType)}`);
  };

  if (loading) {
    return (
      <div className="text-on-surface-variant">
        Loading reports...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full">

      <header className="space-y-3">
        <h1 className="text-headline-lg font-bold text-primary">
          Reports
        </h1>

        <p className="text-body-md text-on-surface-variant max-w-2xl">
          Browse and analyze AI red teaming reports categorized by attack type.
          Select a category to view related reports.
        </p>
      </header>

      <ReportGrid
        reports={reports}
        onAttackClick={handleAttackClick}
      />

    </div>
  );
};

export default Reports;