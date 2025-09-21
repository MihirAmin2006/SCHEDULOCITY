import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Calendar, 
  Clock, 
  Filter, 
  Download, 
  Plus,
  Search,
  Grid3X3,
  List,
  CalendarDays
} from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { sampleTimetable, timeSlots, weekDays, departments, facultyMembers } from '../../data/mockData';

const TimetableManagement = ({ currentUser }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate more comprehensive timetable data
  const generateTimetableData = () => {
    const timetableData = [];
    weekDays.forEach(day => {
      timeSlots.forEach(timeSlot => {
        // Random assignment for demo purposes
        if (Math.random() > 0.3) { // 70% chance of having a class
          const randomFaculty = facultyMembers[Math.floor(Math.random() * facultyMembers.length)];
          const randomSubject = randomFaculty.subjects[Math.floor(Math.random() * randomFaculty.subjects.length)];
          timetableData.push({
            id: `${day}-${timeSlot}`,
            day,
            timeSlot,
            subject: randomSubject,
            faculty: randomFaculty.name,
            classroom: `Room ${Math.floor(Math.random() * 200) + 100}`,
            batch: `${randomFaculty.department.slice(0,3).toUpperCase()}-${2024 - Math.floor(Math.random() * 4)}-${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
            department: randomFaculty.department
          });
        }
      });
    });
    return timetableData;
  };

  const timetableData = generateTimetableData();

  // Filter data based on current user role and selections
  const filteredData = timetableData.filter(item => {
    const matchesDepartment = selectedDepartment === 'all' || item.department === selectedDepartment;
    const matchesFaculty = selectedFaculty === 'all' || item.faculty === selectedFaculty;
    const matchesSearch = searchTerm === '' || 
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.classroom.toLowerCase().includes(searchTerm.toLowerCase());
    
    // For faculty users, show only their classes
    if (currentUser.role === 'faculty') {
      return item.faculty === currentUser.name && matchesSearch;
    }
    
    // For HODs, show only their department
    if (currentUser.role === 'hod') {
      return item.department === currentUser.department && matchesDepartment && matchesFaculty && matchesSearch;
    }
    
    // For administrators, show all with filters
    return matchesDepartment && matchesFaculty && matchesSearch;
  });

  const WeeklyGridView = () => (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-6 gap-2 mb-4">
          <div className="p-3 bg-gray-100 rounded-lg font-semibold text-center">Time</div>
          {weekDays.map(day => (
            <div key={day} className="p-3 bg-gray-100 rounded-lg font-semibold text-center">
              {day}
            </div>
          ))}
        </div>
        
        {timeSlots.map(timeSlot => (
          <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
            <div className="p-3 bg-gray-50 rounded-lg text-center font-medium text-sm">
              {timeSlot}
            </div>
            {weekDays.map(day => {
              const classData = filteredData.find(item => 
                item.day === day && item.timeSlot === timeSlot
              );
              
              return (
                <div key={`${day}-${timeSlot}`} className="p-2 min-h-[80px] border border-gray-200 rounded-lg">
                  {classData ? (
                    <div className="bg-blue-50 border border-blue-200 rounded p-2 h-full">
                      <div className="text-xs font-semibold text-blue-900 mb-1">
                        {classData.subject}
                      </div>
                      <div className="text-xs text-blue-700 mb-1">
                        {classData.faculty}
                      </div>
                      <div className="text-xs text-blue-600">
                        {classData.classroom}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {classData.batch}
                      </Badge>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                      Free
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredData.map((item, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center bg-blue-100 rounded-lg p-3">
                  <div className="text-sm font-semibold text-blue-900">{item.day}</div>
                  <div className="text-xs text-blue-700">{item.timeSlot}</div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.subject}</h4>
                  <p className="text-sm text-gray-600">{item.faculty}</p>
                  <p className="text-xs text-gray-500">{item.department}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="mb-2">{item.classroom}</Badge>
                <div className="text-xs text-gray-500">{item.batch}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
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
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Timetable Management
              </CardTitle>
              <CardDescription>
                {currentUser.role === 'faculty' 
                  ? 'View your personal teaching schedule'
                  : currentUser.role === 'hod' 
                  ? `Manage ${currentUser.department} department timetable`
                  : 'Comprehensive timetable oversight and management'
                }
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              {currentUser.role !== 'faculty' && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search subjects, faculty, rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {currentUser.role !== 'faculty' && (
                <>
                  <Select 
                    value={selectedDepartment} 
                    onValueChange={setSelectedDepartment}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select 
                    value={selectedFaculty} 
                    onValueChange={setSelectedFaculty}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Faculty</SelectItem>
                      {facultyMembers.map(faculty => (
                        <SelectItem key={faculty.id} value={faculty.name}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timetable Views */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-2" />
              Weekly Schedule
            </span>
            <Badge variant="outline">
              {filteredData.length} classes scheduled
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? <WeeklyGridView /> : <ListView />}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableManagement;