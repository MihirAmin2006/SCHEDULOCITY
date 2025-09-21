import React from 'react';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Building, 
  Settings, 
  BarChart3, 
  FileText,
  Clock,
  UserCheck,
  Database,
  Home,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';

const Sidebar = ({ currentUser, activeTab, setActiveTab, onLogout, isCollapsed, setIsCollapsed }) => {
  const menuItems = {
    faculty: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'schedule', label: 'My Schedule', icon: Calendar },
      { id: 'availability', label: 'Availability', icon: Clock },
      { id: 'leave-requests', label: 'Leave Requests', icon: FileText },
      { id: 'profile', label: 'Profile', icon: UserCheck }
    ],
    hod: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'timetable', label: 'Timetable', icon: Calendar },
      { id: 'faculty', label: 'Faculty Management', icon: Users },
      { id: 'subjects', label: 'Subjects', icon: BookOpen },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'leave-approvals', label: 'Leave Approvals', icon: FileText }
    ],
    administrator: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'timetable', label: 'Timetable Management', icon: Calendar },
      { id: 'faculty', label: 'Faculty Management', icon: Users },
      { id: 'subjects', label: 'Subject Management', icon: BookOpen },
      { id: 'resources', label: 'Resource Management', icon: Building },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'system-config', label: 'System Config', icon: Settings },
      { id: 'data-management', label: 'Data Management', icon: Database }
    ]
  };

  const currentMenuItems = menuItems[currentUser?.role] || [];

  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-gray-900">SCHEDULOCITY</h2>
              <p className="text-xs text-gray-500 capitalize">{currentUser?.role} Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser?.department}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {currentMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start text-left ${
                isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'px-2' : 'px-3'}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className={`w-4 h-4 ${isCollapsed ? '' : 'mr-3'}`} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600 ${
            isCollapsed ? 'px-2' : 'px-3'
          }`}
          onClick={onLogout}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
        
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-gray-500 hover:text-gray-700"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
            {'<<'}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;