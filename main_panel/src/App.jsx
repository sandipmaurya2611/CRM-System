import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/SideBar';
import SuperAdminDashboard from './pages/Dashboard/mainDashboard';
import MainSubscription from './pages/Subscription/mainSubscription';
import Payment from './pages/Payment/Payment';

function App() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isMinimized={isSidebarMinimized} 
        onToggleMinimize={toggleSidebar} 
      />
      <main className={`transition-all duration-300 ${isSidebarMinimized ? 'ml-20' : 'ml-64'}`}>
        <div className="p-6">
          <Routes>
            <Route path="/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/" element={<SuperAdminDashboard />} />
            <Route path="/subscription" element={<MainSubscription />} />
            <Route path="/payments" element={<Payment />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
