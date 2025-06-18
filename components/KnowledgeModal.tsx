import React from 'react';

// Prop types for the component
interface KnowledgeModalProps {
  show: boolean;
  close: () => void;
  addNewRule: () => void;
}

const RuleItem = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-slate-100 rounded-lg p-4 mb-3 border-l-4 border-blue-500">
    <h4 className="font-bold text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const KnowledgeModal: React.FC<KnowledgeModalProps> = ({ show, close, addNewRule }) => {
  if (!show) {
    return null;
  }

  const rules = [
    { title: "Rank Progression Validation", description: "Flag any promotion that skips a rank level (e.g., E-4 directly to E-6) unless accompanied by a warrant or commissioning order." },
    { title: "Unit Assignment Cross-Check", description: "Detect conflicts when a service member appears in multiple units simultaneously across different systems without PCS orders." },
    { title: "Security Clearance Timeline", description: "Alert when security clearance dates don't align with MOS requirements or when clearance level changes without proper authorization." },
    { title: "Pay Grade vs. Rank Consistency", description: "Ensure pay grade always matches the corresponding rank structure and flag any mismatches between systems." }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={close}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full m-4 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧠</span>
            <h2 className="text-2xl font-bold text-gray-800">
              Business Rules Knowledge Base
            </h2>
          </div>
          <button 
            className="text-4xl text-gray-500 hover:text-gray-800 w-10 h-10 flex items-center justify-center" 
            onClick={close}
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-5rem)]">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Business Rules for Anomaly Detection</h3>
            {rules.map(rule => <RuleItem key={rule.title} title={rule.title} description={rule.description} />)}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Business Rule</h3>
            <textarea 
              id="newRuleInput"
              className="w-full p-3 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="Describe a new business rule in plain English..."
            ></textarea>
            <button 
              className="mt-3 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              onClick={addNewRule}
            >
              Add Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeModal; 