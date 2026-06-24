import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthFolder/AuthContext.jsx';
import {
  getScenariosByType,
  createScenario,
  updateScenario,
  deleteScenario
} from '../../../API/ScenarioAPI.js';

const emptyForm = {
  prompt: '',
  expected_behavior: '',
  severity: 'medium'
};

const ScenarioManagement = () => {
  const { attackType } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [scenarios, setScenarios] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadScenarios = async () => {
    try {
      setLoading(true);
      const data = await getScenariosByType(attackType);
      setScenarios(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScenarios();
  }, [attackType]);

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-black text-error">Access denied</h1>
        <p className="text-on-surface-variant mt-2">
          Only admins can manage scenarios.
        </p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      attack_type: attackType,
      prompt: form.prompt,
      expected_behavior: form.expected_behavior,
      severity: form.severity
    };

    if (editingId) {
      await updateScenario(editingId, payload);
    } else {
      await createScenario(payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    loadScenarios();
  };

  const handleEdit = (scenario) => {
    setEditingId(scenario.id);
    setForm({
      prompt: scenario.prompt,
      expected_behavior: scenario.expected_behavior,
      severity: scenario.severity
    });
  };

  const handleDelete = async (scenarioId) => {
    const confirmed = window.confirm('Delete this scenario?');
    if (!confirmed) return;

    await deleteScenario(scenarioId);
    loadScenarios();
  };

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
      <div>
        <button
          onClick={() => navigate('/attack-library')}
          className="text-sm font-bold text-primary mb-4"
        >
          ← Back to Attack Library
        </button>

        <h1 className="text-4xl font-black text-on-surface">
          Manage Scenarios
        </h1>

        <p className="text-on-surface-variant mt-2">
          Attack type: <span className="font-bold text-primary">{attackType}</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-black text-on-surface">
          {editingId ? 'Edit Scenario' : 'Add New Scenario'}
        </h2>

        <textarea
          name="prompt"
          value={form.prompt}
          onChange={handleChange}
          placeholder="Prompt"
          required
          className="bg-surface-container-high border border-outline-variant rounded-xl p-3 text-on-surface min-h-28"
        />

        <textarea
          name="expected_behavior"
          value={form.expected_behavior}
          onChange={handleChange}
          placeholder="Expected behavior"
          required
          className="bg-surface-container-high border border-outline-variant rounded-xl p-3 text-on-surface min-h-24"
        />

        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="bg-surface-container-high border border-outline-variant rounded-xl p-3 text-on-surface"
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
          <option value="critical">critical</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-primary text-on-primary font-bold px-5 py-3 rounded-xl"
          >
            {editingId ? 'Update Scenario' : 'Add Scenario'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="border border-outline-variant text-on-surface font-bold px-5 py-3 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-on-surface-variant">Loading scenarios...</p>
        ) : (
          scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-surface-container-low border border-outline-variant rounded-2xl p-5"
            >
              <div className="flex justify-between gap-4 mb-3">
                <div>
                  <p className="text-xs font-bold text-primary">
                    {scenario.scenario_code}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Severity: {scenario.severity}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(scenario)}
                    className="text-xs font-bold text-primary border border-primary/30 px-3 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(scenario.id)}
                    className="text-xs font-bold text-error border border-error/30 px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-on-surface mb-3">
                {scenario.prompt}
              </p>

              <div className="bg-surface-container-high rounded-xl p-3">
                <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Expected Behavior
                </p>
                <p className="text-sm text-on-surface/80">
                  {scenario.expected_behavior}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScenarioManagement;