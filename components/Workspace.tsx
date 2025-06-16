import React from 'react';

// Define types for the component's props
interface WorkspaceProps {
  handleAction: (action: string, button: EventTarget & HTMLButtonElement) => void;
  toggleFilter: (element: EventTarget & HTMLDivElement) => void;
}

// Data for filters
const sourceSystems = ['SIDPERS', 'TAPDB', 'RCMS', 'TOPMIS'];
const severityLevels = [
  { name: 'Critical', bg: 'bg-red-200', text: 'text-red-800', active: 'bg-red-700' },
  { name: 'High', bg: 'bg-yellow-200', text: 'text-yellow-800', active: 'bg-yellow-600' },
  { name: 'Medium', bg: 'bg-orange-200', text: 'text-orange-800', active: 'bg-orange-500' },
];

const AnomalyCard = ({ card, handleAction }: any) => {
    const severityClasses: { [key: string]: { border: string, badgeBg: string, badgeText: string } } = {
        critical: { border: 'border-l-4 border-red-500', badgeBg: 'bg-red-100', badgeText: 'text-red-700' },
        high: { border: 'border-l-4 border-yellow-500', badgeBg: 'bg-yellow-100', badgeText: 'text-yellow-700' },
        medium: { border: 'border-l-4 border-orange-500', badgeBg: 'bg-orange-100', badgeText: 'text-orange-700' },
    };
    const currentSeverity = severityClasses[card.severity];

    return (
        <div className={`bg-white rounded-lg shadow-md mb-4 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${currentSeverity.border}`}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex-1">{card.title}</h3>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${currentSeverity.badgeBg} ${currentSeverity.badgeText}`}>{card.severity}</span>
                </div>
                <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {card.records.map((record: any, index: number) => (
                            <div key={index} className={`bg-slate-50 rounded-lg p-4 ${record.conflict ? 'bg-yellow-50 border border-yellow-300' : ''}`}>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{record.label}</div>
                                {record.fields.map((field: any, i: number) => (
                                    <div key={i} className="text-sm text-gray-700">
                                        {field.name}: <span className={field.conflict ? 'bg-red-200 text-red-800 font-bold px-1 rounded' : 'font-semibold'}>{field.value}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-5">
                    <div className="text-xs font-bold text-teal-700 uppercase">Recommended Action</div>
                    <p className="text-sm text-teal-800">{card.recommendation}</p>
                </div>
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-sm hover:bg-green-600 transition-colors" onClick={(e) => handleAction('approve', e.currentTarget)}>Approve</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 transition-colors" onClick={(e) => handleAction('modify', e.currentTarget)}>Modify</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600 transition-colors" onClick={(e) => handleAction('reject', e.currentTarget)}>Reject</button>
                </div>
            </div>
        </div>
    );
};


const Workspace: React.FC<WorkspaceProps> = ({ handleAction, toggleFilter }) => {
    // This would typically come from an API
    const anomalies = [
        {
            severity: 'critical',
            title: 'Duplicate Record with Conflicting Data',
            recommendation: 'Review recent promotion orders and PCS movements. TAPDB appears to have more recent data.',
            records: [
                {
                    label: 'SIDPERS Record',
                    fields: [
                        { name: 'Name', value: 'SGT John A. Smith' },
                        { name: 'SSN', value: '123-45-6789' },
                        { name: 'Rank', value: 'E-5', conflict: true },
                        { name: 'Unit', value: '1st BCT, 3rd ID', conflict: true },
                        { name: 'Last Updated', value: '2025-06-14' },
                    ]
                },
                {
                    label: 'TAPDB Record',
                    conflict: true,
                    fields: [
                        { name: 'Name', value: 'SGT John A. Smith' },
                        { name: 'SSN', value: '123-45-6789' },
                        { name: 'Rank', value: 'E-6', conflict: true },
                        { name: 'Unit', value: '2nd BCT, 1st AD', conflict: true },
                        { name: 'Last Updated', value: '2025-06-15' },
                    ]
                }
            ]
        },
        {
            severity: 'high',
            title: 'Missing Critical Data Field',
            recommendation: 'Contact unit S-1 to obtain missing personnel data required for security clearance processing.',
            records: [
                {
                    label: 'Service Member Info',
                    fields: [
                        { name: 'Name', value: 'SPC Maria L. Rodriguez' },
                        { name: 'SSN', value: '987-65-4321' },
                        { name: 'Rank', value: 'E-4' },
                        { name: 'Unit', value: '25th ID' },
                    ]
                },
                {
                    label: 'Missing Fields',
                    conflict: true,
                    fields: [
                        { name: 'Security Clearance', value: 'MISSING', conflict: true },
                        { name: 'MOS', value: 'MISSING', conflict: true },
                        { name: 'ETS Date', value: 'MISSING', conflict: true },
                    ]
                }
            ]
        },
        {
            severity: 'medium',
            title: 'Date Inconsistency',
            recommendation: 'Verify promotion order date and update systems to reflect correct promotion effective date.',
            records: [
                {
                    label: 'TOPMIS Pay Record',
                    fields: [
                        { name: 'Name', value: 'CPL Michael T. Johnson' },
                        { name: 'SSN', value: '456-78-9123' },
                        { name: 'Promotion Date', value: '2025-04-01', conflict: true },
                        { name: 'Pay Grade', value: 'E-4' },
                    ]
                },
                {
                    label: 'RCMS Personnel Record',
                    conflict: true,
                    fields: [
                        { name: 'Name', value: 'CPL Michael T. Johnson' },
                        { name: 'SSN', value: '456-78-9123' },
                        { name: 'Promotion Date', value: '2025-04-15', conflict: true },
                        { name: 'Pay Grade', value: 'E-4' },
                    ]
                }
            ]
        }
    ];


    return (
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {/* Filters */}
            <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50/80">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Filter & Search</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Source System</label>
                        <div className="flex flex-wrap gap-2">
                            {sourceSystems.map(system => (
                                <div key={system} className="filter-chip source px-3 py-1 rounded-full text-sm font-semibold cursor-pointer bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white" onClick={(e) => toggleFilter(e.currentTarget)}>{system}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Severity Level</label>
                        <div className="flex flex-wrap gap-2">
                            {severityLevels.map(level => (
                                <div key={level.name} className={`filter-chip px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${level.bg} ${level.text} hover:${level.active} hover:text-white`} onClick={(e) => toggleFilter(e.currentTarget)}>{level.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Search by service member name, SSN, or anomaly ID..." />
                </div>
            </div>

            {/* Anomaly Queue */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-5 queue-title">Anomaly Queue (23 pending)</h2>
                <div>
                    {anomalies.map((card, index) => (
                        <AnomalyCard key={index} card={card} handleAction={handleAction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Workspace; 