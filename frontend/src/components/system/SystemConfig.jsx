import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Settings, 
  Save,
  RotateCcw,
  Database,
  Mail,
  Bell,
  Shield,
  Clock,
  Calendar,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  Server,
  Globe
} from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const SystemConfig = ({ currentUser }) => {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: 'SCHEDULOCITY',
    institutionName: 'University College',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    language: 'English',
    currency: 'USD',
    academicYearStart: '2024-08-01',
    semesterDuration: '16',
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const [timetableSettings, setTimetableSettings] = useState({
    workingDaysPerWeek: 5,
    classStartTime: '08:00',
    classEndTime: '18:00',
    classDuration: 60,
    breakDuration: 15,
    lunchBreakStart: '12:00',
    lunchBreakDuration: 60,
    maxClassesPerDay: 8,
    minGapBetweenClasses: 0,
    allowBackToBack: true,
    autoScheduling: true,
    conflictResolution: 'manual'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: false,
    pushNotifications: true,
    scheduleChangeNotifications: true,
    leaveRequestNotifications: true,
    maintenanceAlerts: true,
    reminderLeadTime: 24,
    digestFrequency: 'weekly',
    smtpServer: 'smtp.university.edu',
    smtpPort: '587',
    senderEmail: 'noreply@university.edu'
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordComplexity: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    twoFactorRequired: false,
    ipWhitelisting: false,
    auditLogging: true,
    encryptionEnabled: true,
    backupEncryption: true
  });

  const [systemStatus, setSystemStatus] = useState({
    database: 'healthy',
    emailService: 'healthy',
    backupService: 'healthy',
    schedulingEngine: 'healthy',
    apiGateway: 'healthy',
    lastBackup: '2024-09-07 02:00:00',
    uptime: '99.8%',
    responseTime: '142ms',
    activeUsers: 156,
    systemLoad: 'Normal'
  });

  const handleSaveGeneral = () => {
    console.log('Saving general settings:', generalSettings);
    alert('General settings saved successfully!');
  };

  const handleSaveTimetable = () => {
    console.log('Saving timetable settings:', timetableSettings);
    alert('Timetable settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    console.log('Saving notification settings:', notificationSettings);
    alert('Notification settings saved successfully!');
  };

  const handleSaveSecurity = () => {
    console.log('Saving security settings:', securitySettings);
    alert('Security settings saved successfully!');
  };

  const handleRestoreDefaults = (category) => {
    if (confirm(`Are you sure you want to restore default ${category} settings?`)) {
      console.log(`Restoring default ${category} settings`);
      alert(`Default ${category} settings restored!`);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Server className="w-4 h-4 text-gray-600" />;
    }
  };

  const GeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            System Information
          </CardTitle>
          <CardDescription>Basic system configuration and institutional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="systemName">System Name</Label>
              <Input
                id="systemName"
                value={generalSettings.systemName}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  systemName: e.target.value
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="institutionName">Institution Name</Label>
              <Input
                id="institutionName"
                value={generalSettings.institutionName}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  institutionName: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select 
                value={generalSettings.timezone} 
                onValueChange={(value) => setGeneralSettings({
                  ...generalSettings,
                  timezone: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">Default Language</Label>
              <Select 
                value={generalSettings.language} 
                onValueChange={(value) => setGeneralSettings({
                  ...generalSettings,
                  language: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select 
                value={generalSettings.dateFormat} 
                onValueChange={(value) => setGeneralSettings({
                  ...generalSettings,
                  dateFormat: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeFormat">Time Format</Label>
              <Select 
                value={generalSettings.timeFormat} 
                onValueChange={(value) => setGeneralSettings({
                  ...generalSettings,
                  timeFormat: value
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12-hour">12 Hour</SelectItem>
                  <SelectItem value="24-hour">24 Hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="academicYearStart">Academic Year Start</Label>
              <Input
                id="academicYearStart"
                type="date"
                value={generalSettings.academicYearStart}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  academicYearStart: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="semesterDuration">Semester Duration (weeks)</Label>
              <Input
                id="semesterDuration"
                type="number"
                min="1"
                max="52"
                value={generalSettings.semesterDuration}
                onChange={(e) => setGeneralSettings({
                  ...generalSettings,
                  semesterDuration: e.target.value
                })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div>
                <h4 className="font-medium">Maintenance Mode</h4>
                <p className="text-sm text-gray-600">Temporarily disable system access for maintenance</p>
              </div>
              <Switch
                checked={generalSettings.maintenanceMode}
                onCheckedChange={(checked) => setGeneralSettings({
                  ...generalSettings,
                  maintenanceMode: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h4 className="font-medium">Automatic Backups</h4>
                <p className="text-sm text-gray-600">Enable automated system backups</p>
              </div>
              <Switch
                checked={generalSettings.autoBackup}
                onCheckedChange={(checked) => setGeneralSettings({
                  ...generalSettings,
                  autoBackup: checked
                })}
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSaveGeneral} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save General Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleRestoreDefaults('general')}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TimetableSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Timetable Configuration
          </CardTitle>
          <CardDescription>Configure scheduling rules and constraints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="workingDays">Working Days Per Week</Label>
              <Select 
                value={timetableSettings.workingDaysPerWeek.toString()} 
                onValueChange={(value) => setTimetableSettings({
                  ...timetableSettings,
                  workingDaysPerWeek: parseInt(value)
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Days</SelectItem>
                  <SelectItem value="6">6 Days</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="classDuration">Class Duration (minutes)</Label>
              <Input
                id="classDuration"
                type="number"
                min="30"
                max="180"
                value={timetableSettings.classDuration}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  classDuration: parseInt(e.target.value)
                })}
              />
            </div>

            <div>
              <Label htmlFor="classStartTime">Daily Start Time</Label>
              <Input
                id="classStartTime"
                type="time"
                value={timetableSettings.classStartTime}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  classStartTime: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="classEndTime">Daily End Time</Label>
              <Input
                id="classEndTime"
                type="time"
                value={timetableSettings.classEndTime}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  classEndTime: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="lunchBreakStart">Lunch Break Start</Label>
              <Input
                id="lunchBreakStart"
                type="time"
                value={timetableSettings.lunchBreakStart}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  lunchBreakStart: e.target.value
                })}
              />
            </div>

            <div>
              <Label htmlFor="lunchBreakDuration">Lunch Break Duration (minutes)</Label>
              <Input
                id="lunchBreakDuration"
                type="number"
                min="30"
                max="120"
                value={timetableSettings.lunchBreakDuration}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  lunchBreakDuration: parseInt(e.target.value)
                })}
              />
            </div>

            <div>
              <Label htmlFor="maxClassesPerDay">Max Classes Per Day</Label>
              <Input
                id="maxClassesPerDay"
                type="number"
                min="1"
                max="12"
                value={timetableSettings.maxClassesPerDay}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  maxClassesPerDay: parseInt(e.target.value)
                })}
              />
            </div>

            <div>
              <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
              <Input
                id="breakDuration"
                type="number"
                min="0"
                max="30"
                value={timetableSettings.breakDuration}
                onChange={(e) => setTimetableSettings({
                  ...timetableSettings,
                  breakDuration: parseInt(e.target.value)
                })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-t border-gray-200">
              <div>
                <h4 className="font-medium">Allow Back-to-Back Classes</h4>
                <p className="text-sm text-gray-600">Permit consecutive classes without breaks</p>
              </div>
              <Switch
                checked={timetableSettings.allowBackToBack}
                onCheckedChange={(checked) => setTimetableSettings({
                  ...timetableSettings,
                  allowBackToBack: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <h4 className="font-medium">Automatic Scheduling</h4>
                <p className="text-sm text-gray-600">Enable AI-powered automatic timetable generation</p>
              </div>
              <Switch
                checked={timetableSettings.autoScheduling}
                onCheckedChange={(checked) => setTimetableSettings({
                  ...timetableSettings,
                  autoScheduling: checked
                })}
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSaveTimetable} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Timetable Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleRestoreDefaults('timetable')}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SystemStatus = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="w-5 h-5 mr-2 text-purple-600" />
            System Health Monitor
          </CardTitle>
          <CardDescription>Real-time system status and health metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{systemStatus.uptime}</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemStatus.responseTime}</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{systemStatus.activeUsers}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Service Status</h4>
            {Object.entries(systemStatus).slice(0, 5).map(([service, status], index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(status)}
                  <div>
                    <h5 className="font-medium text-gray-900 capitalize">
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </h5>
                  </div>
                </div>
                <Badge className={getStatusColor(status)}>
                  {status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Last Backup</h4>
            <p className="text-sm text-gray-600">{systemStatus.lastBackup}</p>
            <p className="text-xs text-gray-500 mt-1">Next scheduled backup: Today at 02:00 AM</p>
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
                <Settings className="w-5 h-5 mr-2 text-blue-600" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system-wide settings and preferences
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              System Administrator Access
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Configuration Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="timetable">
          <TimetableSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-600" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={notificationSettings.smtpServer}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      smtpServer: e.target.value
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={notificationSettings.senderEmail}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      senderEmail: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailEnabled}
                    onCheckedChange={(checked) => setNotificationSettings({
                      ...notificationSettings,
                      emailEnabled: checked
                    })}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Browser push notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: checked
                    })}
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSaveNotifications} className="bg-orange-600 hover:bg-orange-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Notification Settings
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRestoreDefaults('notifications')}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restore Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status">
          <SystemStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemConfig;