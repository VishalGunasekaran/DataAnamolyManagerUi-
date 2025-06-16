import Head from 'next/head';
import { useState, useEffect } from 'react';
import type { NextPage } from 'next';

import Header from '../components/Header';
import SummaryBanner from '../components/SummaryBanner';
import Workspace from '../components/Workspace';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import KnowledgeModal from '../components/KnowledgeModal';

const Home: NextPage = () => {
    // State to manage the visibility of the knowledge base modal
    const [showModal, setShowModal] = useState(false);
    // State to manage anomalies data
    const [anomalies, setAnomalies] = useState<any[]>([]);
    
    // This would be replaced with a real API call
    useEffect(() => {
        // Mock data, same as in Workspace component for now
        const initialAnomalies = [
            { id: 1, severity: 'critical', title: '...', records: [], recommendation: '...' },
            { id: 2, severity: 'high', title: '...', records: [], recommendation: '...' },
            { id: 3, severity: 'medium', title: '...', records: [], recommendation: '...' },
        ];
        // setAnomalies(initialAnomalies);
    }, []);


    // Functions to open and close the knowledge base modal
    const openKnowledgeModal = () => setShowModal(true);
    const closeKnowledgeModal = () => setShowModal(false);

    // Toggles the 'active' class on filter elements
    const toggleFilter = (element: EventTarget & HTMLDivElement) => {
        element.classList.toggle('active');
        // Add actual filter logic here
    };

    // Handles approve, modify, and reject actions on anomaly cards
    const handleAction = (action: string, button: EventTarget & HTMLButtonElement) => {
        const cardId = button.closest('.anomaly-card')?.id;
        console.log(`Action: ${action} on card ${cardId}`);
        // Here you would handle the state update, e.g., removing the card
        showNotification(`${action.charAt(0).toUpperCase() + action.slice(1)} action applied.`);
    };

    // Placeholder function for filtering by system
    const filterBySystem = (system: string) => {
        console.log(`Filtering by ${system}`);
        // Add state filtering logic here
    };

    // Displays a notification message
    const showNotification = (message: string) => {
        // A more robust solution like react-toastify would be better
        alert(message);
    };

    // Adds a new business rule to the knowledge base
    const addNewRule = () => {
        const input = document.getElementById('newRuleInput') as HTMLTextAreaElement;
        const ruleText = input?.value.trim();

        if (ruleText) {
            console.log("New rule added:", ruleText);
            showNotification('New business rule added successfully!');
            input.value = '';
        }
    };
    
    // Placeholder function for navigating to the critical queue
    const navigateToCriticalQueue = () => {
        console.log("Navigating to critical queue...");
    }

    // Placeholder function for assigning a new task
    const assignTask = () => {
        console.log("Assigning a new task...");
    }

    // Toggles the visibility of the chat interface
    const toggleChat = () => {
        // This is now handled within the Sidebar component's local state
        console.log("Toggling chat...");
    }

    // Handles chat input submission
    const handleChatInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const input = event.currentTarget;
            const message = input.value.trim();
            if (message) {
                console.log("New chat message:", message);
                // Handle chat logic here
                input.value = '';
            }
        }
    }

    return (
        <>
            <Head>
                <title>Guardian Workbench - Data Anomaly Management</title>
                <meta name="description" content="Data Anomaly Management System for Army HR Operations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w-screen-xl mx-auto p-4 md:p-6">
                <Header openKnowledgeModal={openKnowledgeModal} />
                <SummaryBanner filterBySystem={filterBySystem} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Workspace handleAction={handleAction} toggleFilter={toggleFilter} />
                    </div>
                    <div className="lg:col-span-1">
                         <Sidebar 
                            navigateToCriticalQueue={navigateToCriticalQueue}
                            assignTask={assignTask}
                            toggleChat={toggleChat}
                            handleChatInput={handleChatInput}
                        />
                    </div>
                </div>

                <Footer />
            </main>

            <KnowledgeModal show={showModal} close={closeKnowledgeModal} addNewRule={addNewRule} />
        </>
    );
}

export default Home; 