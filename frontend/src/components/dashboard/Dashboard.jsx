import React from 'react';
import FacultyDashboard from './FacultyDashboard';
import HODDashboard from './HODDashboard';
import AdminDashboard from './AdminDashboard';
import TimetableManagement from '../timetable/TimetableManagement';
import FacultyManagement from '../faculty/FacultyManagement';
import SubjectManagement from '../subjects/SubjectManagement';
import ResourceManagement from '../resources/ResourceManagement';
import LeaveRequests from '../leave/LeaveRequests';
import LeaveApprovals from '../leave/LeaveApprovals';
import Reports from '../reports/Reports';
import Analytics from '../analytics/Analytics';
import AvailabilityManagement from '../availability/AvailabilityManagement';
import Profile from '../profile/Profile';
import SystemConfig from '../system/SystemConfig';
import DataManagement from '../system/DataManagement';

const Dashboard = ({ currentUser, activeTab, setActiveTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'timetable':
      case 'schedule':
        return <TimetableManagement currentUser={currentUser} />;
      case 'faculty':
        return <FacultyManagement currentUser={currentUser} />;
      case 'subjects':
        return <SubjectManagement currentUser={currentUser} />;
      case 'resources':
        return currentUser.role === 'administrator' ? <ResourceManagement currentUser={currentUser} /> : renderDashboard();
      case 'availability':
        return <AvailabilityManagement currentUser={currentUser} />;
      case 'leave-requests':
        return <LeaveRequests currentUser={currentUser} />;
      case 'leave-approvals':
        return <LeaveApprovals currentUser={currentUser} />;
      case 'reports':
        return <Reports currentUser={currentUser} />;
      case 'analytics':
        return <Analytics currentUser={currentUser} />;
      case 'profile':
        return <Profile currentUser={currentUser} />;
      case 'system-config':
        return <SystemConfig currentUser={currentUser} />;
      case 'data-management':
        return <DataManagement currentUser={currentUser} />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    switch (currentUser?.role) {
      case 'faculty':
        return <FacultyDashboard currentUser={currentUser} setActiveTab={setActiveTab} />;
      case 'hod':
        return <HODDashboard currentUser={currentUser} setActiveTab={setActiveTab} />;
      case 'administrator':
        return <AdminDashboard currentUser={currentUser} setActiveTab={setActiveTab} />;
      default:
        return <div>Dashboard loading...</div>;
    }
  };

  return (
    <div className="min-h-full">
      {renderContent()}
    </div>
  );
};

export default Dashboard;