
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-id-badge text-blue-400"></i>
            InternHub
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Corporate Tracker</p>
        </div>
        
        <div className="flex-1 flex flex-col gap-1 px-3">
          <button 
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <i className="fas fa-chart-pie w-5"></i>
            Dashboard
          </button>
          <button 
            onClick={() => setView('directory')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === 'directory' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <i className="fas fa-users w-5"></i>
            Intern Directory
          </button>
          <button 
            onClick={() => setView('add')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === 'add' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <i className="fas fa-user-plus w-5"></i>
            Add Record
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">HR</div>
            <div>
              <p className="text-sm font-medium">HR Admin</p>
              <p className="text-xs text-slate-500">Corporate Access</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-slate-800 capitalize">
            {activeView.replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Last Sync: Just now</span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
