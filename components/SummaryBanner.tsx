import React from 'react';

// Define the type for the component's props
interface SummaryBannerProps {
  filterBySystem: (system: string) => void;
}

const SummaryBanner: React.FC<SummaryBannerProps> = ({ filterBySystem }) => {
  
  const summaryCards = [
    { system: 'sidpers', number: '12,847', label: 'SIDPERS Records', details: '+247 new records', anomalies: 3, color: 'bg-blue-600' },
    { system: 'tapdb', number: '8,934', label: 'TAPDB Records', details: '+156 new records', anomalies: 8, color: 'bg-green-600' },
    { system: 'rcms', number: '4,523', label: 'RCMS Records', details: '+89 new records', anomalies: 7, color: 'bg-yellow-600' },
    { system: 'topmis', number: '2,156', label: 'TOPMIS Records', details: '+34 new records', anomalies: 5, color: 'bg-red-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {summaryCards.map((card) => (
        <div 
          key={card.system}
          className={`${card.color} text-white rounded-2xl p-5 shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer`}
          onClick={() => filterBySystem(card.system)}
        >
          <span className="text-3xl font-extrabold block mb-1">{card.number}</span>
          <span className="text-sm font-medium opacity-90 block mb-2">{card.label}</span>
          <div className="text-xs opacity-80 leading-tight">{card.details}<br />{card.anomalies} anomalies detected</div>
          <div className="bg-white/20 text-xs font-semibold inline-block mt-2 px-2 py-0.5 rounded-full">{card.anomalies} NEW</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryBanner; 