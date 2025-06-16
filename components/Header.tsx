import React from 'react';

// Define the type for the component's props
interface HeaderProps {
  openKnowledgeModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openKnowledgeModal }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 md:p-8 mb-6 shadow-lg border border-white/20 flex justify-between items-center">
      <div className="flex-1">
        <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-[#1a365d] mb-2">
          🛡️ Guardian Workbench
        </div>
        <div className="text-sm md:text-base text-slate-500">
          Data Anomaly Management System for Army HR Operations
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          onClick={openKnowledgeModal}
        >
          🧠 Knowledge Base
        </button>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-5 rounded-xl">
          📊 IPPS-incon
        </div>
      </div>
    </div>
  );
};

export default Header; 