import React from 'react';
import Image from 'next/image';

// Define the type for the component's props
interface HeaderProps {
  openKnowledgeModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openKnowledgeModal }) => {
  return (
    <div className="bg-white p-5 flex justify-between items-center rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative">
          <Image
            src="/icons/ipssa-logo.png"
            alt="Guardian Logo"
            width={64}
            height={64}
            priority
          />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">
            Guardian Workbench
          </div>
          <div className="text-sm text-gray-600">
            Data Anomaly Management System for Army HR Operations
          </div>
        </div>
      </div>
      <div>
        <button 
          className="bg-black text-yellow-400 font-semibold py-2 px-4 rounded-lg"
          onClick={openKnowledgeModal}
        >
          Knowledge Base
        </button>
      </div>
    </div>
  );
};

export default Header; 