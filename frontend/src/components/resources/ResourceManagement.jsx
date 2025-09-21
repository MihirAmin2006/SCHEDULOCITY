import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Building, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Monitor,
  Wifi,
  Users,
  MapPin,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { classrooms, laboratories } from '../../data/mockData';

const ResourceManagement = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const buildings = ['Building A', 'Building B', 'Building C', 'Building D', 'Building E', 'Building F'];

  const filterResources = (resources) => {
    return resources.filter(resource => {
      const matchesSearch = searchTerm === '' || 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBuilding = selectedBuilding === 'all' || resource.building === selectedBuilding;
      const matchesStatus = selectedStatus === 'all' || resource.status === selectedStatus;
      
      return matchesSearch && matchesBuilding && matchesStatus;
    });
  };

  const filteredClassrooms = filterResources(classrooms);
  const filteredLabs = filterResources(laboratories);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Occupied': return 'bg-orange-100 text-orange-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityColor = (capacity) => {
    if (capacity >= 80) return 'text-red-600';
    if (capacity >= 50) return 'text-orange-600';
    return 'text-green-600';
  };

  const ResourceCard = ({ resource, type }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              {type === 'classroom' ? (
                <Building className="w-5 h-5 text-blue-600" />
              ) : (
                <Monitor className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{resource.name}</h3>
              <p className="text-sm text-gray-600">{resource.building}</p>
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
          <div className="flex items-center justify-between">
            <Badge className={`text-xs ${getStatusColor(resource.status)}`}>
              {resource.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {resource.type}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Capacity:</span>
              <span className={`font-medium ${getCapacityColor(resource.capacity)}`}>
                {resource.capacity}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Equipment:</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {resource.equipment}
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {Math.floor(Math.random() * 40) + 20}%
                </div>
                <div className="text-gray-600 text-xs">Utilization</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {Math.floor(Math.random() * 20) + 5}
                </div>
                <div className="text-gray-600 text-xs">Bookings</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {resource.status === 'Available' ? '0' : Math.floor(Math.random() * 5) + 1}
                </div>
                <div className="text-gray-600 text-xs">Issues</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AddResourceDialog = ({ type }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add {type === 'classroom' ? 'Classroom' : 'Laboratory'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New {type === 'classroom' ? 'Classroom' : 'Laboratory'}</DialogTitle>
          <DialogDescription>
            Enter the details for the new {type}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder={`${type === 'classroom' ? 'Room' : 'Lab'} number/name`} />
          </div>
          <div>
            <label className="text-sm font-medium">Building</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select building" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map(building => (
                  <SelectItem key={building} value={building}>{building}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Capacity</label>
              <Input placeholder="Number of seats" type="number" />
            </div>
            <div>
              <label className="text-sm font-medium">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {type === 'classroom' ? (
                    <>
                      <SelectItem value="Lecture Hall">Lecture Hall</SelectItem>
                      <SelectItem value="Seminar Room">Seminar Room</SelectItem>
                      <SelectItem value="Computer Lab">Computer Lab</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Computer Lab">Computer Lab</SelectItem>
                      <SelectItem value="Physics Lab">Physics Lab</SelectItem>
                      <SelectItem value="Chemistry Lab">Chemistry Lab</SelectItem>
                      <SelectItem value="Biology Lab">Biology Lab</SelectItem>
                      <SelectItem value="Engineering Lab">Engineering Lab</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Equipment</label>
            <Input placeholder="Available equipment" />
          </div>
          <div className="flex space-x-2 pt-4">
            <Button className="flex-1">Add {type === 'classroom' ? 'Classroom' : 'Laboratory'}</Button>
            <Button variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ResourceStats = ({ resources, type }) => {
    const available = resources.filter(r => r.status === 'Available').length;
    const occupied = resources.filter(r => r.status === 'Occupied').length;
    const maintenance = resources.filter(r => r.status === 'Maintenance').length;
    const totalCapacity = resources.reduce((sum, r) => sum + r.capacity, 0);
    const avgCapacity = resources.length > 0 ? Math.round(totalCapacity / resources.length) : 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total {type}s</p>
                <p className="text-3xl font-bold text-gray-900">{resources.length}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-green-600">{available}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-3xl font-bold text-orange-600">{occupied}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Capacity</p>
                <p className="text-3xl font-bold text-purple-600">{avgCapacity}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                Resource Management
              </CardTitle>
              <CardDescription>
                Manage classrooms, laboratories, and educational facilities
              </CardDescription>
            </div>
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
                placeholder="Search resources by name, building, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Buildings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Buildings</SelectItem>
                  {buildings.map(building => (
                    <SelectItem key={building} value={building}>{building}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Tabs */}
      <Tabs defaultValue="classrooms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="classrooms">
            Classrooms ({filteredClassrooms.length})
          </TabsTrigger>
          <TabsTrigger value="laboratories">
            Laboratories ({filteredLabs.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="classrooms" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Classroom Resources</h3>
            {(currentUser.role === 'administrator' || currentUser.role === 'hod') && (
              <AddResourceDialog type="classroom" />
            )}
          </div>
          
          <ResourceStats resources={filteredClassrooms} type="Classroom" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClassrooms.map((classroom, index) => (
              <ResourceCard key={index} resource={classroom} type="classroom" />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="laboratories" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Laboratory Resources</h3>
            {(currentUser.role === 'administrator' || currentUser.role === 'hod') && (
              <AddResourceDialog type="laboratory" />
            )}
          </div>
          
          <ResourceStats resources={filteredLabs} type="Laboratory" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab, index) => (
              <ResourceCard key={index} resource={lab} type="laboratory" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceManagement;