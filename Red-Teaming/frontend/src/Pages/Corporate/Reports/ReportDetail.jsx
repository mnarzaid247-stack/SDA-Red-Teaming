import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportDetails } from '../../../API/ReportAPI.js';

const ReportDetail = () => {
  // استخدام تفكيك الكائن مع إعطاء اسم بديل مرن أو التأكد من مطابقة الـ Params لـ ID التقرير
  const params = useParams();
  // جلب أول قيمة موجودة بالـ params لتفادي اختلاف التسمية في الـ Route
  const reportId = params.id || params.categoryId || Object.values(params)[0];

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reportId) {
      setError("معرّف التقرير غير موجود في رابط الصفحة (Report ID missing).");
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

  if (loading) return <div className="text-on-surface-variant p-6 font-mono">Loading report details...</div>;
  if (error) return <div className="text-error p-6 font-mono">{error}</div>;
  if (!report) return <div className="text-on-surface-variant p-6 font-mono">No report found.</div>;

  const attacks =
    typeof report.selected_attack_types === 'string'
      ? report.selected_attack_types.split(',')
      : report.selected_attack_types || [];

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto animate-fadeIn">
      {/* HEADER */}
      <div>
        <span className="text-xs uppercase tracking-widest text-primary font-bold">Audit Dashboard</span>
        <h1 className="text-headline-lg font-black text-on-surface mt-1">Report Insights</h1>
        <p className="text-xs text-on-surface-variant font-mono mt-1">ID: {report.id}</p>
      </div>

      {/* METRICS SUMMARY CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Status</span>
          <span className="text-lg font-black text-primary uppercase">{report.status || 'COMPLETED'}</span>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Risk Score</span>
          <span className="text-2xl font-black text-error font-mono">{report.overall_risk_score ?? 0}/100</span>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">Detected Risks</span>
          <span className="text-2xl font-black text-on-surface font-mono">{report.detected_risks ?? 0}</span>
        </div>
      </div>

      {/* DETAILS CONFIG */}
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Target Model Architecture</h2>
          <p className="text-base font-bold text-on-surface font-mono">{report.model_provider} — {report.model_name}</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Tested Attack Frameworks</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {attacks.map((a, i) => (
              <span key={i} className="px-3 py-1 text-xs font-bold rounded-lg bg-surface-container-highest border border-outline-variant text-primary font-mono">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/40">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">Payload Evidence Trail</h2>
          <pre className="text-sm text-on-surface-variant bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 font-mono whitespace-pre-wrap max-h-60 overflow-y-auto scrollbar-thin">
            {report.overall_evidence_summary || 'No execution logs recorded.'}
          </pre>
        </div>

        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
          <h2 className="text-title-sm font-bold uppercase tracking-wider text-primary mb-2">Strategic Mitigations</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed font-mono">
            {report.overall_improvement || 'No engineering actions required.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;