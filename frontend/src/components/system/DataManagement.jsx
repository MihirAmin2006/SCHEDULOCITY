import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Database, 
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Archive,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cloud,
  Shield
} from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const DataManagement = ({ currentUser }) => {
  const [importStatus, setImportStatus] = useState('idle');
  const [exportStatus, setExportStatus] = useState('idle');
  const [backupStatus, setBackupStatus] = useState('idle');
  const [selectedExportType, setSelectedExportType] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('current-semester');

  const dataStats = {
    totalRecords: 15847,
    facultyRecords: 30,
    subjectRecords: 100,
    studentRecords: 462,
    timetableRecords: 1245,
    roomRecords: 330,
    lastBackup: '2024-09-07 02:00:00',
    backupSize: '245 MB',
    databaseSize: '1.2 GB',
    storageUsed: 68
  };

  const recentBackups = [
    { id: 1, date: '2024-09-07', time: '02:00:00', size: '245 MB', status: 'Success', type: 'Automatic' },
    { id: 2, date: '2024-09-06', time: '02:00:00', size: '243 MB', status: 'Success', type: 'Automatic' },
    { id: 3, date: '2024-09-05', time: '02:00:00', size: '241 MB', status: 'Success', type: 'Automatic' },
    { id: 4, date: '2024-09-04', time: '14:30:00', size: '240 MB', status: 'Success', type: 'Manual' },
    { id: 5, date: '2024-09-03', time: '02:00:00', size: '239 MB', status: 'Success', type: 'Automatic' }
  ];

  const importTemplates = [
    { name: 'Faculty Data', description: 'Import faculty member information', file: 'faculty_template.csv' },
    { name: 'Subject Data', description: 'Import course and subject details', file: 'subjects_template.csv' },
    { name: 'Student Data', description: 'Import student enrollment data', file: 'students_template.csv' },
    { name: 'Room Data', description: 'Import classroom and laboratory information', file: 'rooms_template.csv' },
    { name: 'Timetable Data', description: 'Import pre-existing timetable schedules', file: 'timetable_template.csv' }
  ];

  const handleExport = async (type) => {
    setExportStatus('processing');
    // Simulate export process
    setTimeout(() => {
      setExportStatus('completed');
      console.log(`Exporting ${type} data...`);
      setTimeout(() => setExportStatus('idle'), 3000);
    }, 2000);
  };

  const handleImport = async (type) => {
    setImportStatus('processing');
    // Simulate import process
    setTimeout(() => {
      setImportStatus('completed');
      console.log(`Importing ${type} data...`);
      setTimeout(() => setImportStatus('idle'), 3000);
    }, 3000);
  };

  const handleBackup = async () => {
    setBackupStatus('processing');
    // Simulate backup process
    setTimeout(() => {
      setBackupStatus('completed');
      console.log('Creating system backup...');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }, 4000);
  };

  const handleRestore = async (backupId) => {
    if (confirm('Are you sure you want to restore this backup? This will overwrite current data.')) {
      console.log(`Restoring backup ${backupId}...`);
      alert('Backup restoration initiated. This may take several minutes.');
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const DataOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-3xl font-bold text-gray-900">{dataStats.totalRecords.toLocaleString()}</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Database Size</p>
                <p className="text-3xl font-bold text-gray-900">{dataStats.databaseSize}</p>
              </div>
              <HardDrive className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-3xl font-bold text-gray-900">{dataStats.storageUsed}%</p>
                <Progress value={dataStats.storageUsed} className="w-full h-2 mt-2" />
              </div>
              <Cloud className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Backup</p>
                <p className="text-lg font-bold text-gray-900">{dataStats.backupSize}</p>
                <p className="text-xs text-gray-500">{dataStats.lastBackup}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Distribution</CardTitle>
          <CardDescription>Breakdown of records by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Faculty Records</span>
              <div className="flex items-center space-x-3">
                <Progress value={(dataStats.facultyRecords / dataStats.totalRecords) * 100} className="w-32 h-2" />
                <span className="text-sm font-medium text-gray-900">{dataStats.facultyRecords}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Subject Records</span>
              <div className="flex items-center space-x-3">
                <Progress value={(dataStats.subjectRecords / dataStats.totalRecords) * 100} className="w-32 h-2" />
                <span className="text-sm font-medium text-gray-900">{dataStats.subjectRecords}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Student Records</span>
              <div className="flex items-center space-x-3">
                <Progress value={(dataStats.studentRecords / dataStats.totalRecords) * 100} className="w-32 h-2" />
                <span className="text-sm font-medium text-gray-900">{dataStats.studentRecords}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Timetable Records</span>
              <div className="flex items-center space-x-3">
                <Progress value={(dataStats.timetableRecords / dataStats.totalRecords) * 100} className="w-32 h-2" />
                <span className="text-sm font-medium text-gray-900">{dataStats.timetableRecords}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Room Records</span>
              <div className="flex items-center space-x-3">
                <Progress value={(dataStats.roomRecords / dataStats.totalRecords) * 100} className="w-32 h-2" />
                <span className="text-sm font-medium text-gray-900">{dataStats.roomRecords}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ImportExportTools = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="w-5 h-5 mr-2 text-green-600" />
              Data Import
            </CardTitle>
            <CardDescription>Import data from CSV files or external systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {importTemplates.map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Template
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleImport(template.name)}
                      disabled={importStatus === 'processing'}
                    >
                      <Upload className="w-4 h-4 mr-1" />
                      Import
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {importStatus !== 'idle' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(importStatus)}
                  <span className="text-sm font-medium text-blue-700">
                    {importStatus === 'processing' ? 'Importing data...' : 'Import completed successfully!'}
                  </span>
                </div>
                {importStatus === 'processing' && (
                  <Progress value={65} className="w-full h-2 mt-2" />
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-5 h-5 mr-2 text-blue-600" />
              Data Export
            </CardTitle>
            <CardDescription>Export system data in various formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="exportType">Export Type</Label>
                <Select value={selectedExportType} onValueChange={setSelectedExportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Data</SelectItem>
                    <SelectItem value="faculty">Faculty Only</SelectItem>
                    <SelectItem value="subjects">Subjects Only</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="timetable">Timetable Only</SelectItem>
                    <SelectItem value="rooms">Rooms Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-semester">Current Semester</SelectItem>
                    <SelectItem value="previous-semester">Previous Semester</SelectItem>
                    <SelectItem value="academic-year">Academic Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => handleExport('csv')}
                  disabled={exportStatus === 'processing'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  onClick={() => handleExport('json')}
                  disabled={exportStatus === 'processing'}
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>

            {exportStatus !== 'idle' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(exportStatus)}
                  <span className="text-sm font-medium text-green-700">
                    {exportStatus === 'processing' ? 'Preparing export...' : 'Export ready for download!'}
                  </span>
                </div>
                {exportStatus === 'processing' && (
                  <Progress value={45} className="w-full h-2 mt-2" />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const BackupManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Archive className="w-5 h-5 mr-2 text-purple-600" />
            Backup Management
          </CardTitle>
          <CardDescription>Create, restore, and manage system backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div>
              <h4 className="font-medium text-purple-900">Create New Backup</h4>
              <p className="text-sm text-purple-700">Generate a complete system backup</p>
            </div>
            <Button 
              onClick={handleBackup}
              disabled={backupStatus === 'processing'}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {backupStatus === 'processing' ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4 mr-2" />
                  Create Backup
                </>
              )}
            </Button>
          </div>

          {backupStatus === 'processing' && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm font-medium text-blue-700">Creating system backup...</span>
              </div>
              <Progress value={75} className="w-full h-2" />
              <p className="text-xs text-blue-600 mt-1">This may take several minutes</p>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Recent Backups</h4>
            <div className="space-y-2">
              {recentBackups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Archive className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {backup.date} at {backup.time}
                      </div>
                      <div className="text-sm text-gray-600">
                        {backup.size} • {backup.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(backup.status)}>
                      {backup.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRestore(backup.id)}
                      >
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Restore
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
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
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                Data Management
              </CardTitle>
              <CardDescription>
                Import, export, and manage system data and backups
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              Administrator Only
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Data Management Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Data Overview</TabsTrigger>
          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DataOverview />
        </TabsContent>
        
        <TabsContent value="import-export">
          <ImportExportTools />
        </TabsContent>
        
        <TabsContent value="backups">
          <BackupManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagement;