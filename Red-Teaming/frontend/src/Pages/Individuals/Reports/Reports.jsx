/**
 * [ architectural concept ]: Central orchestrator layer designed to manage top-level analytical audit aggregations.
 * [ purpose ]: Synchronizes global backend report collections, handles early-bound asynchronous routing metrics, 
 * and maps aggregated data structures down to specialized presentations (ReportGrid).
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportGrid from "../../../Components/Individuals/Reports/ReportGrid.jsx";
import { getReports, getReportDetails } from "../../../API/ReportAPI.js";

const Reports = () => {
  // 1. STATE CONFIGURATION: Structural reactive anchors managing aggregated collection arrays and global network boundaries
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. ROUTING INSTANCE: Core navigation hook initialization for programmatic view-state shifts
  const navigate = useNavigate();

  // 3. LIFECYCLE SYNCHRONIZATION: Concurrently resolves global threat intelligence matrices upon initial orchestration mounting
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

  // 4. NAVIGATION HANDLER: Encodes distinct categorical parameters to secure cross-route tracking parameters safely
  const handleAttackClick = (attackType) => {
    navigate(`/reports/attack/${encodeURIComponent(attackType)}`);
  };

  // 5. EARLY ESCAPE BOUNDARIES: Standard terminal nodes providing loading latencies or fallback execution logs
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

  // 6. MAIN VIEWPORT RESOLUTION: High-fidelity layout container encapsulating nested presentation grids
  return (
    <div className="flex flex-col gap-10 w-full">

      <header className="space-y-3">
        <h1 className="text-2xl sm:text-headline-lg font-bold text-primary">
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