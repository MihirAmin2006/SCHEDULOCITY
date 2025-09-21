import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  BookOpen,
  Building,
  Activity,
  Download,
  RefreshCw,
  Filter,
  PieChart,
  LineChart,
  Target
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { facultyMembers, subjects, classrooms, laboratories, departments, studentBatches } from '../../data/mockData';

const Analytics = ({ currentUser }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-semester');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Generate comprehensive analytics data
  const generateAnalytics = () => {
    const totalFaculty = facultyMembers.length;
    const totalSubjects = subjects.length;
    const totalRooms = classrooms.length + laboratories.length;
    const totalStudents = studentBatches.reduce((sum, batch) => sum + batch.strength, 0);

    // Department-wise breakdown
    const departmentStats = departments.map(dept => {
      const deptFaculty = facultyMembers.filter(f => f.department === dept);
      const deptSubjects = subjects.filter(s => s.department === dept);
      const utilizationRate = Math.floor(Math.random() * 30) + 70;
      
      return {
        name: dept,
        facultyCount: deptFaculty.length,
        subjectCount: deptSubjects.length,
        utilizationRate,
        studentCount: Math.floor(Math.random() * 200) + 100,
        averageClassSize: Math.floor(Math.random() * 20) + 25,
        satisfaction: Math.floor(Math.random() * 20) + 80
      };
    });

    // System performance metrics
    const systemMetrics = {
      overallUtilization: 85,
      peakUtilization: 95,
      averageClassSize: 42,
      facultyStudentRatio: '1:18',
      roomUtilization: 78,
      schedulingEfficiency: 92,
      resourceOptimization: 88,
      userSatisfaction: 87
    };

    // Trending data
    const trends = {
      facultyGrowth: '+5.2%',
      subjectGrowth: '+2.8%',
      utilizationTrend: '+3.1%',
      satisfactionTrend: '+1.7%',
      enrollmentGrowth: '+8.3%',
      resourceGrowth: '+4.5%'
    };

    // Time-based analytics
    const hourlyUtilization = [
      { time: '08:00', utilization: 45 },
      { time: '09:00', utilization: 78 },
      { time: '10:00', utilization: 92 },
      { time: '11:00', utilization: 95 },
      { time: '12:00', utilization: 65 },
      { time: '13:00', utilization: 55 },
      { time: '14:00', utilization: 88 },
      { time: '15:00', utilization: 82 },
      { time: '16:00', utilization: 70 },
      { time: '17:00', utilization: 55 }
    ];

    const weeklyTrends = [
      { day: 'Monday', classes: 156, utilization: 88 },
      { day: 'Tuesday', classes: 162, utilization: 92 },
      { day: 'Wednesday', classes: 158, utilization: 89 },
      { day: 'Thursday', classes: 154, utilization: 87 },
      { day: 'Friday', classes: 142, utilization: 80 }
    ];

    return {
      totals: { totalFaculty, totalSubjects, totalRooms, totalStudents },
      departmentStats,
      systemMetrics,
      trends,
      hourlyUtilization,
      weeklyTrends
    };
  };

  const analytics = generateAnalytics();

  const MetricCard = ({ title, value, change, icon: Icon, trend, description }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {trend === 'up' && <TrendingUp className="w-4 h-4 mr-1" />}
                {trend === 'down' && <TrendingDown className="w-4 h-4 mr-1" />}
                {change}
              </div>
            )}
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
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

  const DepartmentAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-600" />
              Department Performance
            </CardTitle>
            <CardDescription>Faculty and subject distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.departmentStats.slice(0, 6).map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{dept.name}</h4>
                    <p className="text-sm text-gray-600">
                      {dept.facultyCount} faculty • {dept.subjectCount} subjects
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="text-sm font-medium">{dept.utilizationRate}%</div>
                        <Progress value={dept.utilizationRate} className="w-20 h-2" />
                      </div>
                      <Badge variant="outline">{dept.studentCount} students</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              System Performance
            </CardTitle>
            <CardDescription>Key system metrics and KPIs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Overall Utilization</span>
                <div className="flex items-center space-x-2">
                  <Progress value={analytics.systemMetrics.overallUtilization} className="w-24 h-2" />
                  <span className="text-sm font-medium">{analytics.systemMetrics.overallUtilization}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Scheduling Efficiency</span>
                <div className="flex items-center space-x-2">
                  <Progress value={analytics.systemMetrics.schedulingEfficiency} className="w-24 h-2" />
                  <span className="text-sm font-medium">{analytics.systemMetrics.schedulingEfficiency}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Resource Optimization</span>
                <div className="flex items-center space-x-2">
                  <Progress value={analytics.systemMetrics.resourceOptimization} className="w-24 h-2" />
                  <span className="text-sm font-medium">{analytics.systemMetrics.resourceOptimization}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">User Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <Progress value={analytics.systemMetrics.userSatisfaction} className="w-24 h-2" />
                  <span className="text-sm font-medium">{analytics.systemMetrics.userSatisfaction}%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Faculty:Student Ratio</span>
                  <span className="font-medium">{analytics.systemMetrics.facultyStudentRatio}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Class Size</span>
                  <span className="font-medium">{analytics.systemMetrics.averageClassSize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Room Utilization</span>
                  <span className="font-medium">{analytics.systemMetrics.roomUtilization}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const UsagePatterns = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-purple-600" />
              Hourly Utilization Pattern
            </CardTitle>
            <CardDescription>Resource utilization throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.hourlyUtilization.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-16">{hour.time}</span>
                  <div className="flex-1 mx-4">
                    <Progress value={hour.utilization} className="h-3" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">{hour.utilization}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-orange-600" />
              Weekly Distribution
            </CardTitle>
            <CardDescription>Class distribution and utilization by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.weeklyTrends.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{day.day}</div>
                    <div className="text-sm text-gray-600">{day.classes} classes</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{day.utilization}%</div>
                    <Progress value={day.utilization} className="w-16 h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const TrendsAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faculty Growth</p>
                <p className="text-2xl font-bold text-green-600">{analytics.trends.facultyGrowth}</p>
                <p className="text-xs text-gray-500">vs last semester</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Subject Expansion</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.trends.subjectGrowth}</p>
                <p className="text-xs text-gray-500">new subjects added</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrollment Growth</p>
                <p className="text-2xl font-bold text-purple-600">{analytics.trends.enrollmentGrowth}</p>
                <p className="text-xs text-gray-500">student enrollment</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilization Trend</p>
                <p className="text-2xl font-bold text-green-600">{analytics.trends.utilizationTrend}</p>
                <p className="text-xs text-gray-500">efficiency improvement</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.trends.satisfactionTrend}</p>
                <p className="text-xs text-gray-500">user satisfaction</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resource Growth</p>
                <p className="text-2xl font-bold text-blue-600">{analytics.trends.resourceGrowth}</p>
                <p className="text-xs text-gray-500">infrastructure expansion</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
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
                System Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive insights and performance metrics for the entire system
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
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
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Metric Focus:</span>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="utilization">Utilization</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="satisfaction">Satisfaction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Faculty" 
          value={analytics.totals.totalFaculty} 
          change={analytics.trends.facultyGrowth}
          icon={Users}
          trend="up"
          description="Active teaching staff"
        />
        <MetricCard 
          title="Active Subjects" 
          value={analytics.totals.totalSubjects} 
          change={analytics.trends.subjectGrowth}
          icon={BookOpen}
          trend="up"
          description="Courses offered"
        />
        <MetricCard 
          title="Total Resources" 
          value={analytics.totals.totalRooms} 
          change={analytics.trends.resourceGrowth}
          icon={Building}
          trend="up"
          description="Classrooms & labs"
        />
        <MetricCard 
          title="Student Enrollment" 
          value={analytics.totals.totalStudents} 
          change={analytics.trends.enrollmentGrowth}
          icon={Users}
          trend="up"
          description="Total enrolled students"
        />
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">Department Analytics</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="trends">Growth Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="departments">
          <DepartmentAnalytics />
        </TabsContent>
        
        <TabsContent value="usage">
          <UsagePatterns />
        </TabsContent>
        
        <TabsContent value="trends">
          <TrendsAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;