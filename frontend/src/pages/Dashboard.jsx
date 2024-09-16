import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import DeptAdminDashboard from './DeptAdminDashboard.jsx';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    return (
        <div>
            {/* Common Navbar or Sidebar */}
            <Routes>
                {user.role === 'admin' && <Route path="*" element={<AdminDashboard />} />}
                {user.admin && user.role !== 'admin' && <Route path="*" element={<DeptAdminDashboard />} />}
                {!user.admin && user.role !== 'admin' && <Route path="*" element={<UserDashboard />} />}
            </Routes>
        </div>
    );
};

export default Dashboard;
