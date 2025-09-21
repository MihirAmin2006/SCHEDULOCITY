import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  FileText, 
  Plus, 
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { leaveRequests as mockLeaveRequests } from '../../data/mockData';

const LeaveRequests = ({ currentUser }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Filter leave requests for current faculty member
  const userLeaveRequests = mockLeaveRequests.filter(req => 
    req.facultyName === currentUser.name
  );

  // Add some more mock requests for better demo
  const allUserRequests = [
    ...userLeaveRequests,
    {
      id: 3,
      facultyId: currentUser.id,
      facultyName: currentUser.name,
      startDate: '2024-12-15',
      endDate: '2024-12-16',
      reason: 'Conference',
      status: 'Approved',
      requestDate: '2024-12-10',
      approvedBy: 'Dr. Alice Johnson',
      approvedDate: '2024-12-11'
    },
    {
      id: 4,
      facultyId: currentUser.id,
      facultyName: currentUser.name,
      startDate: '2024-11-28',
      endDate: '2024-11-28',
      reason: 'Personal',
      status: 'Rejected',
      requestDate: '2024-11-25',
      rejectedBy: 'Dr. Alice Johnson',
      rejectedDate: '2024-11-26',
      rejectionReason: 'Important exam scheduled'
    }
  ];

  const filteredRequests = selectedFilter === 'all' 
    ? allUserRequests 
    : allUserRequests.filter(req => req.status.toLowerCase() === selectedFilter);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const LeaveRequestCard = ({ request }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon(request.status)}
            <div>
              <h3 className="font-semibold text-gray-900">
                {request.reason} Leave
              </h3>
              <p className="text-sm text-gray-600">
                {request.startDate} to {request.endDate}
              </p>
            </div>
          </div>
          <Badge className={`${getStatusColor(request.status)}`}>
            {request.status}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Requested on: {request.requestDate}</span>
          </div>
          
          {request.status === 'Approved' && request.approvedBy && (
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>Approved by {request.approvedBy} on {request.approvedDate}</span>
            </div>
          )}
          
          {request.status === 'Rejected' && request.rejectedBy && (
            <div className="flex items-center text-sm text-red-600">
              <XCircle className="w-4 h-4 mr-2" />
              <span>Rejected by {request.rejectedBy} on {request.rejectedDate}</span>
            </div>
          )}
          
          {request.rejectionReason && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Reason for rejection:</strong> {request.rejectionReason}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {Math.ceil((new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24)) + 1}
              </div>
              <div className="text-gray-600 text-xs">Days</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {Math.ceil((new Date() - new Date(request.requestDate)) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-gray-600 text-xs">Days Ago</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900 capitalize">
                {request.reason}
              </div>
              <div className="text-gray-600 text-xs">Type</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const NewLeaveRequestDialog = () => {
    const [formData, setFormData] = useState({
      startDate: '',
      endDate: '',
      reason: '',
      description: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Mock submission - in real app would call API
      console.log('Submitting leave request:', formData);
      // Reset form and close dialog
      setFormData({ startDate: '', endDate: '', reason: '', description: '' });
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Leave Request
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Leave Request</DialogTitle>
            <DialogDescription>
              Fill in the details for your leave request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason</Label>
              <Select 
                value={formData.reason} 
                onValueChange={(value) => setFormData({...formData, reason: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reason for leave" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Conference">Conference/Training</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                placeholder="Provide additional details about your leave request..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="submit" className="flex-1">Submit Request</Button>
              <Button type="button" variant="outline" className="flex-1">Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const stats = {
    total: allUserRequests.length,
    approved: allUserRequests.filter(r => r.status === 'Approved').length,
    pending: allUserRequests.filter(r => r.status === 'Pending').length,
    rejected: allUserRequests.filter(r => r.status === 'Rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                My Leave Requests
              </CardTitle>
              <CardDescription>
                Submit and track your leave requests
              </CardDescription>
            </div>
            <NewLeaveRequestDialog />
          </div>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRequests.map((request, index) => (
          <LeaveRequestCard key={index} request={request} />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Leave Requests</h3>
            <p className="text-gray-600 mb-4">
              {selectedFilter === 'all' 
                ? "You haven't submitted any leave requests yet." 
                : `No ${selectedFilter} leave requests found.`}
            </p>
            <NewLeaveRequestDialog />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeaveRequests;