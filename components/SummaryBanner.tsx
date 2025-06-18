import React from 'react';

// Define the type for the component's props
interface SummaryBannerProps {
  filterBySystem: (system: string) => void;
}

const SummaryBanner: React.FC<SummaryBannerProps> = ({ filterBySystem }) => {
  
  const summaryCards = [
    { system: 'sidpers', number: '12,847', label: 'SIDPERS Records', details: '+247 new records', anomalies: 3, color: 'border-blue-500', textColor: 'text-blue-500' },
    { system: 'tapdb', number: '8,934', label: 'TAPDB Records', details: '+247 new records', anomalies: 8, color: 'border-green-500', textColor: 'text-green-500' },
    { system: 'rcms', number: '4,523', label: 'RCMS Records', details: '+247 new records', anomalies: 7, color: 'border-orange-500', textColor: 'text-orange-500' },
    { system: 'topmis', number: '2,156', label: 'TOPMIS Records', details: '+247 new records', anomalies: 5, color: 'border-red-500', textColor: 'text-red-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {summaryCards.map((card) => (
        <div 
          key={card.system}
          className={`bg-white rounded-lg p-6 shadow-md border-l-4 ${card.color} cursor-pointer hover:shadow-lg transition-shadow`}
          onClick={() => filterBySystem(card.system)}
        >
          <h3 className="text-lg font-semibold text-gray-700">{card.label}</h3>
          <div className="flex items-baseline mt-2">
            <span className="text-3xl font-bold text-gray-900">{card.number}</span>
            <span className="ml-4 text-sm text-gray-600">{card.details}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {card.anomalies} anomalies detected
            <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">{card.anomalies} New</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryBanner; 