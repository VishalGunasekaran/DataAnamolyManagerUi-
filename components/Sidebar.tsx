import React, { useState } from 'react';

// Define prop types
interface SidebarProps {
  navigateToCriticalQueue: () => void;
  assignTask: () => void;
  toggleChat: () => void;
  handleChatInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SystemStatus = () => (
    <div className="bg-white rounded-lg p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
            System Health
        </h3>
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">SIDPERS Connection</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-600">TAPDB Sync</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-sm text-gray-600">RCMS Integration</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm text-gray-600">TOPMIS Sync</span>
            </div>
        </div>
    </div>
);

const DigitalWorker: React.FC<Pick<SidebarProps, 'navigateToCriticalQueue' | 'assignTask' | 'toggleChat' | 'handleChatInput'>> = 
({ navigateToCriticalQueue, assignTask, toggleChat, handleChatInput }) => {
    const [isChatVisible, setChatVisible] = useState(false);

    const onToggleChat = () => {
        setChatVisible(!isChatVisible);
        toggleChat();
    }
    
    return (
        <div className="bg-white rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Digital Worker</h3>
            
            <div className="space-y-3 mb-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-3 cursor-pointer hover:bg-red-100 transition-colors" onClick={navigateToCriticalQueue}>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-red-700 font-medium">Critical Review 3</div>
                            <div className="text-sm text-red-600">Pending immediate attention</div>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-3">
                    <div className="text-amber-700 font-medium">URGENT</div>
                    <div className="text-sm text-amber-600">TOPMIS sync failure - 15 records pending validation</div>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-300 p-3">
                    <div className="text-gray-700">Manual review needed for 8 high-priority anomalies</div>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-300 p-3">
                    <div className="text-gray-700">Batch reconciliation scheduled for 16:00 today</div>
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={assignTask} className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm font-medium py-2 px-3 rounded-lg transition-colors text-gray-700">Ask Task</button>
                <button onClick={onToggleChat} className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm font-medium py-2 px-3 rounded-lg transition-colors text-gray-700">Chat</button>
            </div>

            {isChatVisible && (
                <div className="mt-4 bg-gray-50 rounded-lg p-3">
                    <div className="h-28 overflow-y-auto text-sm space-y-2 mb-3" id="chatMessages">
                        <div className="bg-gray-100 p-2 rounded-lg text-gray-700">How can I assist with the anomaly resolution today?</div>
                    </div>
                    <input 
                        type="text" 
                        className="w-full bg-white border border-gray-200 text-sm p-2 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none" 
                        placeholder="Ask me anything..." 
                        onKeyPress={handleChatInput} 
                    />
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
        <div className="bg-white rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
                Recent Activity
            </h3>
            <div className="space-y-3">
                {activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-sm font-medium text-blue-600">{act.time}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-sm text-gray-600">{act.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ navigateToCriticalQueue, assignTask, toggleChat, handleChatInput }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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