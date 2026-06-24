/**
 * [ architectural concept ]: Route-level detailed inspection container acting as the terminal data layout layer.
 * [ purpose ]: Captures explicit or fallback transactional record identifiers, orchestrates deep asynchronous 
 * report payload retrieval, and maps multi-dimensional forensic telemetry into categorized data nodes.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReportDetails } from "../../../API/ReportAPI.js";

const ReportDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const reportId = params.id || params.categoryId || Object.values(params)[0];

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reportId) {
      setError("Report ID missing.");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        setLoading(true);
        const data = await getReportDetails(reportId);
        setReport(data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const getScoreColor = (score) => {
    const numericScore = Number(score) || 0;
    if (numericScore >= 75) return 'text-error';
    if (numericScore >= 40) return 'text-warning';
    return 'text-success';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };

  if (loading) return <div className="text-on-surface-variant p-6 font-mono">Loading report details...</div>;
  if (error) return <div className="text-error p-6 font-mono">{error}</div>;
  if (!report) return <div className="text-on-surface-variant p-6 font-mono">No report found.</div>;

  const attacks =
    typeof report.selected_attack_types === 'string'
      ? report.selected_attack_types.split(',')
      : report.selected_attack_types || [];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 max-w-6xl mx-auto animate-fadeIn">

      <button
        onClick={() => navigate('/reports')}
        className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:translate-x-[-4px] transition-transform w-fit"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Reports
      </button>

      <div>
        <span className="text-xs uppercase tracking-widest text-primary font-bold">
          Audit Dashboard
        </span>
        <h1 className="text-headline-lg font-black text-on-surface mt-1">
          Report Insights
        </h1>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
            Status
          </span>
          <span className="text-lg font-black text-primary uppercase">
            {report.status || 'N/A'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
            Overall Result
          </span>
          <span className={`text-lg font-black uppercase ${report.overall_passed ? 'text-success' : 'text-error'}`}>
            {report.overall_passed ? 'Passed' : 'Failed'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
            Risk Score
          </span>
          <span className={`text-2xl font-black font-mono ${getScoreColor(report.overall_risk_score)}`}>
            {report.overall_risk_score ?? 0}/100
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
            Risk Level
          </span>
          <span className="text-lg font-black text-on-surface uppercase">
            {report.overall_risk_level || 'Unknown'}
          </span>
        </div>
      </div>
<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            Detected Risks
          </h2>
          <p className="text-2xl font-black text-on-surface font-mono">
            {report.detected_risks ?? 0}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
  <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
    Total Scenarios
  </h2>
  <p className="text-2xl font-black text-on-surface font-mono">
    {report.overall_total_count ?? 0}
  </p>
</div>

<div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
  <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
    Safe Responses
  </h2>
  <p className="text-2xl font-black text-success font-mono">
    {report.overall_safe_count ?? 0}
  </p>
</div>

<div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
  <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
    Unsafe Responses
  </h2>
  <p className="text-2xl font-black text-error font-mono">
    {report.overall_unsafe_count ?? 0}
  </p>
</div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            Duration
          </h2>
          <p className="text-2xl font-black text-on-surface font-mono">
            {report.duration_seconds ?? 0}s
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
            Completed At
          </h2>
          <p className="text-sm font-bold text-on-surface font-mono">
            {formatDate(report.completed_at)}
          </p>
        </div>
      </div>
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
  <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
    Created At
  </h2>
  <p className="text-sm font-bold text-on-surface font-mono">
    {formatDate(report.created_at)}
  </p>
</div>
      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
          Target Model
        </h2>
        <p className="text-base font-bold text-on-surface font-mono">
          {report.model_provider} — {report.model_name}
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
          Tested Attack Types
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {attacks.map((attack, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-surface-container-highest border border-outline-variant text-primary font-mono"
            >
              {attack}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
          Overall Evidence Summary
        </h2>
        <pre className="text-sm text-on-surface-variant bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto">
          {report.overall_evidence_summary || 'No evidence summary recorded.'}
        </pre>
      </div>

      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
        <h2 className="text-title-sm font-bold uppercase tracking-wider text-primary mb-2">
          Recommended Improvement
        </h2>
        <p className="text-sm text-on-surface-variant leading-relaxed font-mono">
          {report.overall_improvement || 'No improvement recorded.'}
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
        <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">
          Results By Attack Type
        </h2>

        <div className="space-y-4">
          {report.overall_results?.length ? (
            report.overall_results.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30"
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  <div>
                    <span className="text-xs text-on-surface-variant uppercase">Attack Type</span>
                    <p className="font-bold text-primary font-mono">{item.attack_type}</p>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant uppercase">Result</span>
                    <p className={`font-black uppercase ${item.passed ? 'text-success' : 'text-error'}`}>
                      {item.passed ? 'Passed' : 'Failed'}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant uppercase">Risk Score</span>
                    <p className={`font-black font-mono ${getScoreColor(item.risk_score)}`}>
                      {item.risk_score ?? 0}/100
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant uppercase">Risk Level</span>
                    <p className="font-bold text-on-surface uppercase">{item.risk_level || 'Unknown'}</p>
                  </div>

                  <div>
                    <span className="text-xs text-on-surface-variant uppercase">Detected Risks</span>
                    <p className="font-bold text-on-surface font-mono">{item.detected_risks ?? 0}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs text-on-surface-variant uppercase">Evidence Summary</span>
                  <p className="mt-1 text-sm text-on-surface-variant font-mono whitespace-pre-wrap">
                    {item.evidence_summary || 'No evidence summary.'}
                  </p>
                </div>

                {item.improvement && (
                  <div className="mt-4">
                    <span className="text-xs text-primary uppercase">Improvement</span>
                    <p className="mt-1 text-sm text-on-surface-variant font-mono whitespace-pre-wrap">
                      {item.improvement}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-on-surface-variant font-mono">
              No attack-type results recorded.
            </p>
          )}
        </div>
      </div>
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
  <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">
    Target Model Responses
  </h2>

  <div className="space-y-4">
    {report.results?.length ? (
      report.results.map((result) => (
        <div
          key={result.id}
          className="p-4 rounded-xl bg-surface-container-high border border-outline-variant/30"
        >
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 text-xs rounded-lg bg-surface-container-low text-primary font-bold">
              {result.attack_type}
            </span>

            <span className="px-2 py-1 text-xs rounded-lg bg-surface-container-low text-on-surface-variant font-bold">
              {result.scenario_code}
            </span>

            <span className="px-2 py-1 text-xs rounded-lg bg-surface-container-low text-on-surface-variant font-bold">
              {result.severity}
            </span>
          </div>

          <p className="text-xs uppercase tracking-wider text-on-surface-variant font-bold mb-2">
            Model Response
          </p>

          {result.response_safe_to_show && result.model_response ? (
            <pre className="text-sm text-on-surface-variant bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto">
              {result.model_response}
            </pre>
          ) : (
            <p className="text-sm text-error font-mono">
              Response hidden because it was not safe to display.
            </p>
          )}
        </div>
      ))
    ) : (
      <p className="text-on-surface-variant font-mono">
        No target model responses recorded.
      </p>
    )}
  </div>
</div>
    </div>
  );
};

export default ReportDetail;