import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  AlertCircle, 
  CheckCircle,
  FileText,
  TrendingUp
} from 'lucide-react';
import { sampleTimetable, facultyMembers, leaveRequests } from '../../data/mockData';

const FacultyDashboard = ({ currentUser, setActiveTab }) => {
  // Mock data for current faculty
  const currentFaculty = facultyMembers.find(f => f.name === currentUser.name) || facultyMembers[0];
  const todaySchedule = sampleTimetable.filter(item => item.faculty === currentUser.name).slice(0, 3);
  const facultyLeaveRequests = leaveRequests.filter(req => req.facultyName === currentUser.name);
  
  const stats = [
    {
      title: 'Today\'s Classes',
      value: '4',
      change: '+2 from yesterday',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Subjects',
      value: currentFaculty.subjects?.length || 3,
      change: 'This semester',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Weekly Hours',
      value: '18',
      change: '3 hours remaining',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Student Batches',
      value: '6',
      change: 'Active assignments',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = [
    {
      title: 'View Schedule',
      description: 'Check your weekly timetable',
      icon: Calendar,
      action: () => setActiveTab('schedule'),
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Submit Leave Request',
      description: 'Request time off',
      icon: FileText,
      action: () => setActiveTab('leave-requests'),
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Update Availability',
      description: 'Manage your schedule preferences',
      icon: Clock,
      action: () => setActiveTab('availability'),
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {currentUser.name?.split(' ')[1] || 'Professor'}!
            </h1>
            <p className="text-gray-600 mt-2">
              {currentUser.department} • {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <Badge className={`${
              currentFaculty.availability === 'Available' ? 'bg-green-100 text-green-800' :
              currentFaculty.availability === 'Busy' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentFaculty.availability}
            </Badge>
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
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Your classes and activities for today</CardDescription>
          </CardHeader>
          <CardContent>
            {todaySchedule.length > 0 ? (
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{item.timeSlot?.split('-')[0]}</div>
                        <div className="text-xs text-gray-500">{item.timeSlot?.split('-')[1]}</div>
                      </div>
                      <div>
                        <h4 className="font-medium">{item.subject}</h4>
                        <p className="text-sm text-gray-600">{item.classroom} • {item.batch}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{item.day}</Badge>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setActiveTab('schedule')}
                >
                  View Full Schedule
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No classes scheduled for today</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveTab('schedule')}
                >
                  View Schedule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions & Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start h-auto p-4 ${action.color}`}
                    onClick={action.action}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-gray-600">{action.description}</div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                <div className="text-sm">
                  <p className="font-medium">Class completed</p>
                  <p className="text-gray-600">Programming Fundamentals - CS-2024-A</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-1" />
                <div className="text-sm">
                  <p className="font-medium">Room change notification</p>
                  <p className="text-gray-600">Tomorrow's class moved to Room 205</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="w-4 h-4 text-blue-600 mt-1" />
                <div className="text-sm">
                  <p className="font-medium">Leave request submitted</p>
                  <p className="text-gray-600">Medical leave for Dec 20-22</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;