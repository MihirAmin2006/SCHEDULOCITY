import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  TrendingDown,
  Filter,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { facultyMembers, subjects, sampleTimetable, studentBatches } from '../../data/mockData';

const Reports = ({ currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-semester');
  const [selectedDepartment, setSelectedDepartment] = useState(
    currentUser.role === 'hod' ? currentUser.department : 'all'
  );

  // Filter data based on user role and selections
  const getDepartmentData = () => {
    if (currentUser.role === 'hod') {
      return {
        faculty: facultyMembers.filter(f => f.department === currentUser.department),
        subjects: subjects.filter(s => s.department === currentUser.department)
      };
    } else {
      return {
        faculty: selectedDepartment === 'all' 
          ? facultyMembers 
          : facultyMembers.filter(f => f.department === selectedDepartment),
        subjects: selectedDepartment === 'all' 
          ? subjects 
          : subjects.filter(s => s.department === selectedDepartment)
      };
    }
  };

  const data = getDepartmentData();

  // Generate mock analytics data
  const facultyUtilization = data.faculty.map(faculty => ({
    name: faculty.name,
    utilization: Math.floor(Math.random() * 40) + 60, // 60-100%
    weeklyHours: Math.floor(Math.random() * 15) + 10, // 10-25 hours
    subjects: faculty.subjects.length,
    availability: faculty.availability
  }));

  const subjectAnalytics = data.subjects.map(subject => ({
    name: subject.name,
    credits: subject.credits,
    semester: subject.semester,
    enrolledStudents: Math.floor(Math.random() * 80) + 20,
    passRate: Math.floor(Math.random() * 30) + 70,
    satisfaction: Math.floor(Math.random() * 20) + 80
  }));

  const departmentMetrics = {
    totalFaculty: data.faculty.length,
    availableFaculty: data.faculty.filter(f => f.availability === 'Available').length,
    totalSubjects: data.subjects.length,
    totalCredits: data.subjects.reduce((sum, s) => sum + s.credits, 0),
    avgClassSize: Math.floor(Math.random() * 20) + 35,
    facultyStudentRatio: `1:${Math.floor(Math.random() * 10) + 15}`,
    semesterProgress: Math.floor(Math.random() * 30) + 65,
    resourceUtilization: Math.floor(Math.random() * 20) + 75
  };

  const weeklyScheduleStats = {
    totalClasses: Math.floor(Math.random() * 50) + 100,
    utilizedHours: Math.floor(Math.random() * 100) + 200,
    peakHours: '10:00-12:00',
    leastBusyDay: 'Friday',
    averageClassDuration: '1.5 hours'
  };

  const ReportCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center mt-1 text-sm ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                {trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
                {change}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${
            trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
            }`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FacultyUtilizationTable = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Faculty Utilization Report
        </CardTitle>
        <CardDescription>Weekly workload and availability analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {facultyUtilization.slice(0, 8).map((faculty, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {faculty.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{faculty.name}</h4>
                  <p className="text-sm text-gray-600">{faculty.subjects} subjects • {faculty.weeklyHours} hrs/week</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{faculty.utilization}%</div>
                    <Progress value={faculty.utilization} className="w-24 h-2" />
                  </div>
                  <Badge className={`${
                    faculty.availability === 'Available' ? 'bg-green-100 text-green-800' :
                    faculty.availability === 'Busy' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {faculty.availability}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const SubjectPerformanceTable = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-green-600" />
          Subject Performance Report
        </CardTitle>
        <CardDescription>Student enrollment and satisfaction metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Credits</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Enrolled</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Pass Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {subjectAnalytics.slice(0, 10).map((subject, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{subject.name}</div>
                      <div className="text-sm text-gray-500">Semester {subject.semester}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{subject.credits}</Badge>
                  </td>
                  <td className="py-3 px-4 font-medium">{subject.enrolledStudents}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        subject.passRate >= 90 ? 'text-green-600' :
                        subject.passRate >= 80 ? 'text-blue-600' :
                        subject.passRate >= 70 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {subject.passRate}%
                      </span>
                      <Progress value={subject.passRate} className="w-16 h-2" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{subject.satisfaction}%</span>
                      <Progress value={subject.satisfaction} className="w-16 h-2" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const ScheduleAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Schedule Analytics
        </CardTitle>
        <CardDescription>Weekly schedule utilization and patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{weeklyScheduleStats.totalClasses}</div>
            <div className="text-sm text-gray-600">Total Classes/Week</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{weeklyScheduleStats.utilizedHours}</div>
            <div className="text-sm text-gray-600">Utilized Hours</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{weeklyScheduleStats.peakHours}</div>
            <div className="text-sm text-gray-600">Peak Hours</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{weeklyScheduleStats.leastBusyDay}</div>
            <div className="text-sm text-gray-600">Least Busy Day</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{weeklyScheduleStats.averageClassDuration}</div>
            <div className="text-sm text-gray-600">Avg Class Duration</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{departmentMetrics.resourceUtilization}%</div>
            <div className="text-sm text-gray-600">Resource Utilization</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                Department Reports
              </CardTitle>
              <CardDescription>
                {currentUser.role === 'hod' 
                  ? `Comprehensive analytics for ${currentUser.department} department`
                  : 'System-wide analytics and performance reports'
                }
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Period:</span>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-semester">Current Semester</SelectItem>
                  <SelectItem value="previous-semester">Previous Semester</SelectItem>
                  <SelectItem value="academic-year">Academic Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {currentUser.role === 'administrator' && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Department:</span>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard 
          title="Total Faculty" 
          value={departmentMetrics.totalFaculty} 
          change="+2 this semester"
          icon={Users}
          trend="up"
        />
        <ReportCard 
          title="Active Subjects" 
          value={departmentMetrics.totalSubjects} 
          change="Same as last semester"
          icon={BookOpen}
        />
        <ReportCard 
          title="Avg Class Size" 
          value={departmentMetrics.avgClassSize} 
          change="-3 from last semester"
          icon={Users}
          trend="down"
        />
        <ReportCard 
          title="Semester Progress" 
          value={`${departmentMetrics.semesterProgress}%`} 
          change="On track"
          icon={Activity}
          trend="up"
        />
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="faculty" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faculty">Faculty Analysis</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faculty" className="space-y-6">
          <FacultyUtilizationTable />
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-6">
          <SubjectPerformanceTable />
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-6">
          <ScheduleAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;