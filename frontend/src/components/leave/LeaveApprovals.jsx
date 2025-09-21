import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  UserCheck, 
  Search,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { leaveRequests as mockLeaveRequests, facultyMembers } from '../../data/mockData';

const LeaveApprovals = ({ currentUser }) => {
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generate more comprehensive leave requests for the department
  const departmentFaculty = facultyMembers.filter(f => f.department === currentUser.department);
  const allDepartmentRequests = [
    ...mockLeaveRequests,
    {
      id: 5,
      facultyId: 25,
      facultyName: 'Prof. Daniel Kim',
      department: currentUser.department,
      startDate: '2024-12-28',
      endDate: '2024-12-30',
      reason: 'Personal',
      status: 'Pending',
      requestDate: '2024-12-20',
      description: 'Family function attendance'
    },
    {
      id: 6,
      facultyId: 22,
      facultyName: 'Dr. Nicole Brown',
      department: currentUser.department, 
      startDate: '2024-12-23',
      endDate: '2024-12-23',
      reason: 'Medical',
      status: 'Pending',
      requestDate: '2024-12-18',
      description: 'Doctor appointment'
    },
    {
      id: 7,
      facultyId: 1,
      facultyName: 'Dr. John Doe',
      department: currentUser.department,
      startDate: '2024-11-15',
      endDate: '2024-11-16',
      reason: 'Conference',
      status: 'Approved',
      requestDate: '2024-11-10',
      approvedBy: currentUser.name,
      approvedDate: '2024-11-12'
    }
  ];

  // Filter requests based on current user's department and search/filter criteria
  const filteredRequests = allDepartmentRequests.filter(req => {
    const matchesSearch = searchTerm === '' || 
      req.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || req.status.toLowerCase() === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

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

  const ApprovalDialog = ({ request, action }) => {
    const [rejectionReason, setRejectionReason] = useState('');

    const handleApproval = () => {
      // Mock approval - in real app would call API
      console.log(`${action}ing leave request:`, request.id);
      if (action === 'reject' && rejectionReason) {
        console.log('Rejection reason:', rejectionReason);
      }
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant={action === 'approve' ? 'default' : 'destructive'}
            className={action === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {action === 'approve' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </DialogTitle>
            <DialogDescription>
              {action === 'approve' 
                ? `Approve leave request from ${request.facultyName}?`
                : `Reject leave request from ${request.facultyName}?`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2 text-sm">
                <div><strong>Faculty:</strong> {request.facultyName}</div>
                <div><strong>Dates:</strong> {request.startDate} to {request.endDate}</div>
                <div><strong>Reason:</strong> {request.reason}</div>
                {request.description && (
                  <div><strong>Details:</strong> {request.description}</div>
                )}
              </div>
            </div>

            {action === 'reject' && (
              <div>
                <Label htmlFor="rejectionReason">Reason for Rejection</Label>
                <Textarea
                  id="rejectionReason"
                  placeholder="Please provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button 
                onClick={handleApproval}
                className={`flex-1 ${
                  action === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {action === 'approve' ? 'Approve Request' : 'Reject Request'}
              </Button>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const LeaveRequestCard = ({ request }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {request.facultyName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {request.facultyName}
              </h3>
              <p className="text-sm text-gray-600">
                {request.reason} Leave • {request.startDate} to {request.endDate}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(request.status)}
            <Badge className={`${getStatusColor(request.status)}`}>
              {request.status}
            </Badge>
          </div>
        </div>

        {request.description && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">{request.description}</p>
          </div>
        )}

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
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">
                  {Math.ceil((new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24)) + 1}
                </div>
                <div className="text-gray-600 text-xs">Days</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 capitalize">
                  {request.reason}
                </div>
                <div className="text-gray-600 text-xs">Type</div>
              </div>
            </div>
            
            {request.status === 'Pending' && (
              <div className="flex space-x-2">
                <ApprovalDialog request={request} action="approve" />
                <ApprovalDialog request={request} action="reject" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const stats = {
    total: filteredRequests.length,
    approved: filteredRequests.filter(r => r.status === 'Approved').length,
    pending: filteredRequests.filter(r => r.status === 'Pending').length,
    rejected: filteredRequests.filter(r => r.status === 'Rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                Leave Approvals
              </CardTitle>
              <CardDescription>
                Review and approve faculty leave requests for {currentUser.department} department
              </CardDescription>
            </div>
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
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
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
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by faculty name or leave reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request, index) => (
          <LeaveRequestCard key={index} request={request} />
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Leave Requests</h3>
            <p className="text-gray-600">
              {selectedFilter === 'all' 
                ? "No leave requests found for your department." 
                : `No ${selectedFilter} leave requests found.`}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeaveApprovals;