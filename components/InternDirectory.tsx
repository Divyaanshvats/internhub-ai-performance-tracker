
import React, { useState } from 'react';
import { Intern } from '../types';

interface InternDirectoryProps {
  interns: Intern[];
}

export const InternDirectory: React.FC<InternDirectoryProps> = ({ interns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);

  const filteredInterns = interns.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         i.reportingManager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || i.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Department', 'Duration', 'Projects', 'Rating', 'Manager', 'Comment'];
    const rows = interns.map(i => [
      i.name,
      i.department,
      i.duration,
      i.projectsCompleted,
      i.rating,
      i.reportingManager,
      i.comment.replace(/,/g, ';') // Simple escaping
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "intern_records_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="relative w-full md:w-96">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="Search name or manager..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            className="px-4 py-2 border border-slate-300 rounded-lg outline-none"
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <button 
            onClick={exportToCSV}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <i className="fas fa-file-export"></i>
            Export CSV
          </button>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Intern</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Dept</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Manager</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Rating</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInterns.map((intern) => (
                <tr key={intern.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">{intern.name}</p>
                      <p className="text-xs text-slate-500">{intern.duration}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                      {intern.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {intern.reportingManager}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className={`font-bold ${intern.rating >= 8 ? 'text-green-600' : intern.rating >= 5 ? 'text-amber-600' : 'text-red-600'}`}>
                        {intern.rating}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedIntern(intern)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInterns.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    No records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIntern && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-100 relative">
              <button 
                onClick={() => setSelectedIntern(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl font-bold">
                  {selectedIntern.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedIntern.name}</h3>
                  <p className="text-slate-500">{selectedIntern.department} Intern • {selectedIntern.duration}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Rating</p>
                  <p className="text-xl font-bold text-slate-900">{selectedIntern.rating}/10</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Projects</p>
                  <p className="text-xl font-bold text-slate-900">{selectedIntern.projectsCompleted}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Manager</p>
                  <p className="text-sm font-bold text-slate-900 truncate px-2">{selectedIntern.reportingManager}</p>
                </div>
              </div>

              {/* AI Summary Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-wider">
                  <i className="fas fa-wand-magic-sparkles"></i>
                  Gemini AI Summary
                </div>
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-slate-700 leading-relaxed italic">
                  "{selectedIntern.aiSummary || "No AI summary available."}"
                </div>
              </div>

              {/* Raw Comments */}
              <div className="space-y-3">
                <div className="text-slate-500 font-bold uppercase text-xs tracking-wider">
                  Original Feedback
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {selectedIntern.comment}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
              Record created on {new Date(selectedIntern.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
