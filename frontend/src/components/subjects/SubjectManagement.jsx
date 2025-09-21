import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  BookOpen, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Filter,
  GraduationCap,
  Clock,
  Users
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { subjects, departments, facultyMembers } from '../../data/mockData';

const SubjectManagement = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');

  // Filter subjects based on user role and selections
  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = searchTerm === '' || 
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || subject.department === selectedDepartment;
    const matchesSemester = selectedSemester === 'all' || subject.semester.toString() === selectedSemester;
    
    // For HODs, show only their department subjects
    if (currentUser.role === 'hod') {
      return subject.department === currentUser.department && matchesSearch && matchesSemester;
    }
    
    // For administrators, show all with filters
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const getCreditColor = (credits) => {
    if (credits >= 4) return 'bg-red-100 text-red-800';
    if (credits >= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getAssignedFaculty = (subjectName) => {
    return facultyMembers.filter(faculty => 
      faculty.subjects.includes(subjectName)
    );
  };

  const SubjectCard = ({ subject }) => {
    const assignedFaculty = getAssignedFaculty(subject.name);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{subject.department}</p>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${getCreditColor(subject.credits)}`}>
                  {subject.credits} Credits
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Semester {subject.semester}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              {currentUser.role === 'administrator' && (
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Weekly Hours:</span>
              <span className="font-medium">{subject.credits * 2} hrs</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Assigned Faculty:</span>
              <span className="font-medium">{assignedFaculty.length}</span>
            </div>

            {assignedFaculty.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Faculty:</div>
                <div className="space-y-1">
                  {assignedFaculty.slice(0, 2).map((faculty, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-xs">
                          {faculty.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-700">{faculty.name}</span>
                    </div>
                  ))}
                  {assignedFaculty.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{assignedFaculty.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const AddSubjectDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
          <DialogDescription>
            Enter the details for the new subject.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Subject Name</label>
            <Input placeholder="Enter subject name" />
          </div>
          <div>
            <label className="text-sm font-medium">Department</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Credits</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Credits" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Credit</SelectItem>
                  <SelectItem value="2">2 Credits</SelectItem>
                  <SelectItem value="3">3 Credits</SelectItem>
                  <SelectItem value="4">4 Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Semester</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1">Add Subject</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Subject Management
              </CardTitle>
              <CardDescription>
                {currentUser.role === 'hod' 
                  ? `Manage subjects in ${currentUser.department} department`
                  : 'Comprehensive subject catalog and assignment management'
                }
              </CardDescription>
            </div>
            {(currentUser.role === 'administrator' || currentUser.role === 'hod') && (
              <AddSubjectDialog />
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search subjects by name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              {currentUser.role === 'administrator' && (
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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
              )}
              
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-3xl font-bold text-gray-900">{filteredSubjects.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Credits</p>
                <p className="text-3xl font-bold text-green-600">
                  {filteredSubjects.reduce((sum, subject) => sum + subject.credits, 0)}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Credits</p>
                <p className="text-3xl font-bold text-orange-600">
                  {filteredSubjects.length > 0 
                    ? (filteredSubjects.reduce((sum, subject) => sum + subject.credits, 0) / filteredSubjects.length).toFixed(1)
                    : '0'
                  }
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Faculty</p>
                <p className="text-3xl font-bold text-purple-600">
                  {filteredSubjects.reduce((sum, subject) => sum + getAssignedFaculty(subject.name).length, 0)}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Subjects Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or add new subjects.
            </p>
            {(currentUser.role === 'administrator' || currentUser.role === 'hod') && (
              <AddSubjectDialog />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SubjectManagement;