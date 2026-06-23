/**
 * [ architectural concept ]: Dedicated route-level container component handling localized audit intelligence.
 * [ purpose ]: Decodes targeted attack vector parameters, coordinates asynchronous telemetric telemetry fetching,
 * and manages an inline drill-down viewport (modal modal) to expose deep-level structural execution payloads.
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReports, getReportDetails } from "../../../API/ReportAPI.js";

const AttackReports = () => {
  // 1. ROUTE PARSING & NORMALIZATION: Resolving dynamic URL tokens to match underlying storage schemas
  const { attackType } = useParams();
  const decodedAttackType = decodeURIComponent(attackType);

  // 2. STATE CONFIGURATION: Reactive anchors governing structural collection lists and global error state boundaries
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. DRILL-DOWN SUB-STATE: Ephemeral storage tracking specific inspection instances and lazy-loaded telemetry payloads
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [detailedReport, setDetailedReport] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // 4. LIFECYCLE SYNCHRONIZATION: Resolves vectorized report indices upon parameter change boundaries
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getReports({
          attack_type: decodedAttackType
        });
        setReports(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [decodedAttackType]);

  // 5. INTERACTION DISPATCHERS: Asynchronous transactional routines for dynamic item lookup and state flushing
  const handleOpenDetails = async (id) => {
    setSelectedReportId(id);
    setLoadingDetails(true);
    try {
      const details = await getReportDetails(id);
      setDetailedReport(details);
    } catch (err) {
      console.error("Error fetching report details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedReportId(null);
    setDetailedReport(null);
  };

  // 6. STYLE CONFIGURATION: Dynamic tailwind utility class variant mapping tied to severity thresholds
  const getScoreColor = (score) => {
    const numericScore = Number(score) || 0;
    if (numericScore >= 75) return 'text-error';
    if (numericScore >= 40) return 'text-warning';
    return 'text-success';
  };

  // 7. EARLY ESCAPE BOUNDARIES: Fallback viewports rendering transient lifecycle placeholders
  if (loading) return <div className="text-on-surface-variant p-6 font-mono">Loading reports...</div>;
  if (error) return <div className="text-error p-6 font-mono">{error}</div>;

  // 8. MAIN VIEWPORT RESOLUTION: Micro-interaction log container grid structure
  return (
    <div className="flex flex-col gap-6 relative w-full animate-fadeIn">
      
      {/* NODE: Identity header and quantitative audit trail counter */}
      <div>
        <h1 className="text-headline-lg font-black text-primary tracking-tight">
          {decodedAttackType}
        </h1>
        <p className="text-on-surface-variant text-sm font-mono mt-1">
          {reports.length} Audit Trails Discovered
        </p>
      </div>

      {/* NODE: Audit metrics data display grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length === 0 ? (
          <p className="text-on-surface-variant font-mono">No logs found for this specific vector.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              onClick={() => handleOpenDetails(report.id)}
              className="relative overflow-hidden bg-surface-container-low border border-outline-variant rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.05)] group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />

              <div className="mb-6 mt-2">
                <p className={`text-4xl font-black tracking-tight ${getScoreColor(report.overall_risk_score)}`}>
                  {report.overall_risk_score ?? 0}
                </p>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1 font-mono">
                  Risk Index ({report.overall_risk_level || 'UNKNOWN'})
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-on-surface-variant mt-4 pt-4 border-t border-outline-variant/30 font-mono">
                <span>{new Date(report.created_at).toLocaleDateString()}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold tracking-wider uppercase text-[11px]">
                  Inspect <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))
        )}
      </section>

      {/* NODE: Isolated telemetry modal displaying full audit payload metadata */}
      {selectedReportId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-surface-container border border-outline-variant rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative scrollbar-thin">
            
            <button 
              onClick={handleCloseDetails}
              className="absolute top-6 right-6 text-on-surface-variant hover:text-on-surface transition-colors duration-200 z-10"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {loadingDetails ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-on-surface-variant text-sm font-mono">Streaming full audit payload...</p>
              </div>
            ) : detailedReport ? (
              <div className="space-y-6">
                
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-bold">Detailed Audit Trail</span>
                  <h2 className="text-2xl font-bold text-on-surface mt-1">Report Details</h2>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">Reference ID: {detailedReport.id}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
                    <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Model Provider</span>
                    <p className="text-base font-bold text-on-surface uppercase">{detailedReport.model_provider || 'N/A'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
                    <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Model Name</span>
                    <p className="text-base font-bold text-on-surface font-mono break-all">{detailedReport.model_name || 'N/A'}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30 grid grid-cols-3 gap-4 text-center items-center">
                  <div>
                    <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Status</span>
                    <span className="text-sm font-black text-primary uppercase">{detailedReport.status || 'COMPLETED'}</span>
                  </div>
                  
                  <div>
                    <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Risk Score</span>
                    <span className={`text-sm font-black text-lg ${getScoreColor(detailedReport.overall_risk_score)}`}>
                      {detailedReport.overall_risk_score ?? 0}/100
                    </span>
                  </div>
                  
                  <div className="relative group/tooltip flex flex-col items-center">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <span className="text-xs text-on-surface-variant uppercase tracking-wider">Detected Risks</span>
                      <span className="material-symbols-outlined text-[15px] text-on-surface-variant cursor-help hover:text-primary transition-colors">
                        info
                      </span>
                    </div>
                    <span className="text-sm font-black text-on-surface text-lg">{detailedReport.detected_risks ?? 0}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Overall Evidence Summary</h4>
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50 text-sm text-on-surface-variant leading-relaxed max-h-32 overflow-y-auto font-mono scrollbar-thin">
                    {detailedReport.overall_evidence_summary || 'No execution logs available.'}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Recommended Mitigation</h4>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm text-primary/90 leading-relaxed">
                    {detailedReport.overall_improvement || 'No architectural recommendations recorded.'}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    onClick={handleCloseDetails}
                    className="px-6 py-2 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-md active:scale-95"
                  >
                    Done Reviewing
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-error py-6 text-center font-mono">Failed to parse report structure.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttackReports;