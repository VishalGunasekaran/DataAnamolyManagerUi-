import React, { useState } from 'react';

// Define prop types
interface SidebarProps {
  navigateToCriticalQueue: () => void;
  assignTask: () => void;
  toggleChat: () => void;
  handleChatInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SystemStatus = () => (
    <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            🔧 System Health
        </h3>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center"><span>SIDPERS Connection</span><span className="w-3 h-3 rounded-full bg-green-500"></span></div>
            <div className="flex justify-between items-center"><span>TAPDB Sync</span><span className="w-3 h-3 rounded-full bg-green-500"></span></div>
            <div className="flex justify-between items-center"><span>RCMS Integration</span><span className="w-3 h-3 rounded-full bg-yellow-500"></span></div>
            <div className="flex justify-between items-center"><span>TOPMIS Sync</span><span className="w-3 h-3 rounded-full bg-red-500"></span></div>
        </div>
    </div>
);

const DigitalWorker: React.FC<Pick<SidebarProps, 'navigateToCriticalQueue' | 'assignTask' | 'toggleChat' | 'handleChatInput'>> = 
({ navigateToCriticalQueue, assignTask, toggleChat, handleChatInput }) => {
    const [isChatVisible, setChatVisible] = useState(false);

    const onToggleChat = () => {
        setChatVisible(!isChatVisible);
        toggleChat(); // also call parent toggle if needed
    }
    
    return (
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">🤖 Digital Worker</h3>
                <span className="text-xs font-bold bg-green-400/80 px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <div className="bg-red-500/90 rounded-lg p-4 mb-4 cursor-pointer hover:bg-red-500 transition-colors" onClick={navigateToCriticalQueue}>
                <div className="flex justify-between items-center">
                    <div className="font-bold">🚨 Critical Review</div>
                    <div className="bg-white/30 text-xs font-bold px-2 py-1 rounded-full">3</div>
                </div>
                <div className="text-sm opacity-90 mt-1">Pending immediate attention</div>
            </div>
            <div className="space-y-2 text-sm mb-4">
                <div className="bg-white/10 p-3 rounded-lg border-l-4 border-yellow-400"><strong>URGENT:</strong> TOPMIS sync failure - 15 records pending validation</div>
                <div className="bg-white/10 p-3 rounded-lg border-l-4 border-blue-400">Manual review needed for 8 high-priority anomalies</div>
                <div className="bg-white/10 p-3 rounded-lg border-l-4 border-gray-400">Batch reconciliation scheduled for 16:00 today</div>
            </div>
            <div className="flex gap-2">
                <button onClick={assignTask} className="flex-1 bg-white/20 hover:bg-white/30 text-sm font-semibold py-2 px-3 rounded-lg transition-colors">Assign Task</button>
                <button onClick={onToggleChat} className="flex-1 bg-white/20 hover:bg-white/30 text-sm font-semibold py-2 px-3 rounded-lg transition-colors">Chat</button>
            </div>
            {isChatVisible && (
                 <div className="mt-4 bg-slate-800/50 rounded-lg p-2" id="chatInterface">
                     <div className="h-28 overflow-y-auto text-xs space-y-2 p-1 mb-2" id="chatMessages">
                         <div className="bg-slate-700 p-2 rounded-lg">How can I assist with the anomaly resolution today?</div>
                     </div>
                     <input type="text" className="w-full bg-slate-900/80 border border-slate-600 text-xs p-2 rounded-lg focus:ring-1 focus:ring-blue-400 focus:outline-none" placeholder="Ask me anything..." onKeyPress={handleChatInput} />
                 </div>
            )}
        </div>
    );
};

const RecentActivity = () => {
    const activities = [
        { time: "14:32", text: "3 new anomalies detected in TAPDB" },
        { time: "14:15", text: "Batch reconciliation completed" },
        { time: "13:45", text: "System health check passed" },
        { time: "13:30", text: "5 anomalies resolved by worker" },
        { time: "13:15", text: "RCMS sync warning resolved" }
    ];
    return (
        <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                📊 Recent Activity
            </h3>
            <div className="space-y-2 text-sm">
                {activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="font-bold text-indigo-600">{act.time}</span>
                        <span>-</span>
                        <span>{act.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


const Sidebar: React.FC<SidebarProps> = ({ navigateToCriticalQueue, assignTask, toggleChat, handleChatInput }) => {
    return (
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 space-y-8">
           <SystemStatus />
           <DigitalWorker 
             navigateToCriticalQueue={navigateToCriticalQueue} 
             assignTask={assignTask}
             toggleChat={toggleChat}
             handleChatInput={handleChatInput}
           />
           <RecentActivity />
        </div>
    );
};

export default Sidebar; 