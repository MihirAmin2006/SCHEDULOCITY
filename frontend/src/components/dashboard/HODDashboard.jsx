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
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';
import { facultyMembers, subjects, leaveRequests, departments } from '../../data/mockData';

const HODDashboard = ({ currentUser, setActiveTab }) => {
  // Filter data for current department
  const departmentFaculty = facultyMembers.filter(f => f.department === currentUser.department);
  const departmentSubjects = subjects.filter(s => s.department === currentUser.department);
  const pendingLeaveRequests = leaveRequests.filter(req => req.status === 'Pending');
  
  const availableFaculty = departmentFaculty.filter(f => f.availability === 'Available').length;
  const totalFaculty = departmentFaculty.length;
  const facultyUtilization = Math.round((availableFaculty / totalFaculty) * 100);

  const stats = [
    {
      title: 'Department Faculty',
      value: totalFaculty,
      change: `${availableFaculty} available`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Subjects',
      value: departmentSubjects.length,
      change: 'This semester',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Pending Approvals',
      value: pendingLeaveRequests.length,
      change: 'Leave requests',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Weekly Classes',
      value: '156',
      change: 'Department total',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = [
    {
      title: 'Review Timetable',
      description: 'Check department schedule',
      icon: Calendar,
      action: () => setActiveTab('timetable'),
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Approve Leaves',
      description: `${pendingLeaveRequests.length} pending requests`,
      icon: UserCheck,
      action: () => setActiveTab('leave-approvals'),
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    },
    {
      title: 'Faculty Management',
      description: 'Manage department faculty',
      icon: Users,
      action: () => setActiveTab('faculty'),
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Generate Reports',
      description: 'Department analytics',
      icon: TrendingUp,
      action: () => setActiveTab('reports'),
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {currentUser.department} Department
            </h1>
            <p className="text-gray-600 mt-2">
              Head of Department Dashboard • {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{facultyUtilization}%</div>
            <div className="text-sm text-gray-600">Faculty Utilization</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
        {/* Faculty Status Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Faculty Status Overview
            </CardTitle>
            <CardDescription>Current availability and workload status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentFaculty.slice(0, 6).map((faculty, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {faculty.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{faculty.name}</h4>
                      <p className="text-sm text-gray-600">{faculty.subjects.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${
                      faculty.availability === 'Available' ? 'bg-green-100 text-green-800' :
                      faculty.availability === 'Busy' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {faculty.availability}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.floor(Math.random() * 20) + 10} hrs/week
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setActiveTab('faculty')}
              >
                View All Faculty
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingLeaveRequests.map((request, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <FileText className="w-4 h-4 text-orange-600 mt-1" />
                  <div className="text-sm flex-1">
                    <p className="font-medium">{request.facultyName}</p>
                    <p className="text-gray-600">{request.reason} leave</p>
                    <p className="text-xs text-gray-500">{request.startDate} - {request.endDate}</p>
                  </div>
                </div>
              ))}
              <Button 
                size="sm" 
                className="w-full mt-3"
                onClick={() => setActiveTab('leave-approvals')}
              >
                Review All Requests
              </Button>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Department Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Class Completion Rate</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Faculty Utilization</span>
                  <span>{facultyUtilization}%</span>
                </div>
                <Progress value={facultyUtilization} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Resource Efficiency</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => setActiveTab('reports')}
              >
                View Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used department management functions</CardDescription>
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

export default HODDashboard;