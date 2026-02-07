
import React, { useState } from 'react';
import { Intern } from '../types';
import { summarizeInternPerformance } from '../services/geminiService';

interface InternFormProps {
  onAdd: (intern: Intern) => void;
  onSuccess: () => void;
}

export const InternForm: React.FC<InternFormProps> = ({ onAdd, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    department: '',
    reportingManager: '',
    projectsCompleted: 0,
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newIntern: Intern = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };

    // Auto-generate AI summary
    const aiSummary = await summarizeInternPerformance(newIntern);
    newIntern.aiSummary = aiSummary;

    onAdd(newIntern);
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-blue-600 px-8 py-6 text-white">
        <h3 className="text-xl font-bold">Add Intern Record</h3>
        <p className="text-blue-100 text-sm">Fill in the details for future performance tracking.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Intern Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Jane Doe"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Duration</label>
            <input
              required
              type="text"
              placeholder="e.g. 3 Months"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.duration}
              onChange={e => setFormData({...formData, duration: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Department</label>
            <select
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.department}
              onChange={e => setFormData({...formData, department: e.target.value})}
            >
              <option value="">Select Dept</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Reporting Manager</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.reportingManager}
              onChange={e => setFormData({...formData, reportingManager: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Projects Completed</label>
            <input
              required
              type="number"
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={formData.projectsCompleted}
              onChange={e => setFormData({...formData, projectsCompleted: parseInt(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Manager Rating (1-10)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                value={formData.rating}
                onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
              />
              <span className="text-lg font-bold text-blue-600">{formData.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Performance Comments</label>
          <textarea
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Describe the intern's strengths, weaknesses, and overall impact..."
            value={formData.comment}
            onChange={e => setFormData({...formData, comment: e.target.value})}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Analyzing with Gemini AI...
            </>
          ) : (
            <>
              <i className="fas fa-save"></i>
              Save Intern Record
            </>
          )}
        </button>
      </form>
    </div>
  );
};
