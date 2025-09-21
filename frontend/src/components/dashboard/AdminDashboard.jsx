import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Building, 
  Server,
  Activity,
  TrendingUp,
  AlertCircle,
  Database,
  Settings,
  BarChart3,
  Shield
} from 'lucide-react';
import { 
  facultyMembers, 
  subjects, 
  classrooms, 
  laboratories, 
  departments,
  studentBatches 
} from '../../data/mockData';

const AdminDashboard = ({ currentUser, setActiveTab }) => {
  const totalFaculty = facultyMembers.length;
  const availableFaculty = facultyMembers.filter(f => f.availability === 'Available').length;
  const totalSubjects = subjects.length;
  const totalClassrooms = classrooms.length;
  const totalLabs = laboratories.length;
  const totalStudents = studentBatches.reduce((sum, batch) => sum + batch.strength, 0);

  const systemStats = [
    {
      title: 'Total Faculty',
      value: totalFaculty,
      change: `${availableFaculty} available`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Subjects',
      value: totalSubjects,
      change: 'Across all departments',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Resources',
      value: totalClassrooms + totalLabs,
      change: `${totalClassrooms} rooms, ${totalLabs} labs`,
      icon: Building,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Students',
      value: totalStudents,
      change: `${studentBatches.length} batches`,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const systemHealth = [
    { metric: 'Database Performance', value: 98, status: 'Excellent' },
    { metric: 'API Response Time', value: 95, status: 'Good' },
    { metric: 'Resource Utilization', value: 87, status: 'Optimal' },
    { metric: 'User Satisfaction', value: 92, status: 'Very Good' }
  ];

  const quickActions = [
    {
      title: 'System Configuration',
      description: 'Manage system settings',
      icon: Settings,
      action: () => setActiveTab('system-config'),
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'View Analytics',
      description: 'Comprehensive system analytics',
      icon: BarChart3,
      action: () => setActiveTab('analytics'),
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Data Management',
      description: 'Import/export system data',
      icon: Database,
      action: () => setActiveTab('data-management'),
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
    {
      title: 'User Management',
      description: 'Manage faculty and staff',
      icon: Shield,
      action: () => setActiveTab('faculty'),
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  const recentActivities = [
    { action: 'New faculty member added', user: 'Dr. Emily Chen', time: '2 hours ago', type: 'success' },
    { action: 'Timetable updated', user: 'System Admin', time: '4 hours ago', type: 'info' },
    { action: 'Resource booking created', user: 'Prof. Johnson', time: '6 hours ago', type: 'info' },
    { action: 'System backup completed', user: 'System', time: '8 hours ago', type: 'success' },
    { action: 'Leave request approved', user: 'Dr. Smith', time: '1 day ago', type: 'warning' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              System Administration
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive oversight of the SCHEDULOCITY platform • {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">System Healthy</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">All services operational</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health Monitoring */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="w-5 h-5 mr-2 text-blue-600" />
              System Health & Performance
            </CardTitle>
            <CardDescription>Real-time monitoring of system metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {systemHealth.map((health, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{health.metric}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{health.value}%</span>
                    <Badge 
                      className={`text-xs ${
                        health.value >= 95 ? 'bg-green-100 text-green-800' :
                        health.value >= 85 ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {health.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={health.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent System Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>System-wide activity log</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-orange-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2 text-purple-600" />
            Department Overview
          </CardTitle>
          <CardDescription>Status across all academic departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.slice(0, 8).map((dept, index) => {
              const deptFaculty = facultyMembers.filter(f => f.department === dept);
              const deptSubjects = subjects.filter(s => s.department === dept);
              const utilization = Math.floor(Math.random() * 30) + 70; // Mock utilization
              
              return (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{dept}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Faculty:</span>
                      <span className="font-medium">{deptFaculty.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subjects:</span>
                      <span className="font-medium">{deptSubjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Utilization:</span>
                      <span className={`font-medium ${
                        utilization >= 85 ? 'text-green-600' : 
                        utilization >= 70 ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {utilization}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Actions</CardTitle>
          <CardDescription>Frequently used system management functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto p-4 ${action.color}`}
                  onClick={action.action}
                >
                  <div className="text-center">
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-600">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;