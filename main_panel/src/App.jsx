import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/common/SideBar';
import SuperAdminDashboard from './pages/Dashboard/mainDashboard';
import MainSubscription from './pages/Subscription/mainSubscription';
import Payment from './pages/Payment/Payment';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/" element={<SuperAdminDashboard />} />
          <Route path="/subscription" element={<MainSubscription />} />
          <Route path="/payments" element={<Payment />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
