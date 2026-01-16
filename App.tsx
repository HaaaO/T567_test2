import React, { useState } from 'react';
import { ViewState } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Syllabus from './components/Syllabus';
import Modules from './components/Modules';
import Assignments from './components/Assignments';
import CourseChat from './components/CourseChat';
import { Menu } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.SYLLABUS:
        return <Syllabus />;
      case ViewState.MODULES:
        return <Modules />;
      case ViewState.ASSIGNMENTS:
        return <Assignments />;
      case ViewState.AI_TA:
        return <CourseChat />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-slate-800">T567</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;