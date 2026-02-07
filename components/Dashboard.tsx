
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Intern } from '../types';

interface DashboardProps {
  interns: Intern[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];

export const Dashboard: React.FC<DashboardProps> = ({ interns }) => {
  const avgRating = interns.length > 0 
    ? (interns.reduce((acc, curr) => acc + curr.rating, 0) / interns.length).toFixed(1)
    : 0;

  const totalProjects = interns.reduce((acc, curr) => acc + curr.projectsCompleted, 0);

  // Group by Dept for Pie
  const deptData = interns.reduce((acc: any[], curr) => {
    const existing = acc.find(a => a.name === curr.department);
    if (existing) existing.value++;
    else acc.push({ name: curr.department, value: 1 });
    return acc;
  }, []);

  // Performance groups
  const perfData = [
    { name: '8-10 (Exceeds)', value: interns.filter(i => i.rating >= 8).length },
    { name: '5-7 (Meeting)', value: interns.filter(i => i.rating >= 5 && i.rating < 8).length },
    { name: '0-4 (Below)', value: interns.filter(i => i.rating < 5).length },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <i className="fas fa-users text-xl"></i>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Interns</p>
              <p className="text-2xl font-bold text-slate-900">{interns.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <i className="fas fa-star text-xl"></i>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Avg. Rating</p>
              <p className="text-2xl font-bold text-slate-900">{avgRating}/10</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
              <i className="fas fa-briefcase text-xl"></i>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Projects Delivered</p>
              <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
              <i className="fas fa-building text-xl"></i>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Departments</p>
              <p className="text-2xl font-bold text-slate-900">{deptData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Distribution by Department</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Performance Snapshot</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
