import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  User, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Save,
  Edit,
  Camera,
  Shield,
  Bell,
  Key,
  Users
} from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { facultyMembers } from '../../data/mockData';

const Profile = ({ currentUser }) => {
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+1-555-0101',
    department: currentUser.department,
    designation: 'Assistant Professor',
    employeeId: 'EMP' + currentUser.id.toString().padStart(4, '0'),
    joiningDate: '2022-08-15',
    office: 'Room 305, Building A',
    biography: 'Experienced educator with expertise in computer science and software engineering. Passionate about teaching and research in artificial intelligence and machine learning.',
    qualifications: 'Ph.D. in Computer Science, M.S. in Software Engineering',
    researchInterests: 'Machine Learning, Artificial Intelligence, Data Science',
    personalWebsite: 'https://johndoe.university.edu',
    linkedIn: 'https://linkedin.com/in/johndoe',
    orcid: '0000-0000-0000-0000'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    passwordLastChanged: '2024-08-15'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    scheduleUpdates: true,
    leaveApprovals: true,
    systemMaintenance: true,
    newsUpdates: false,
    eventReminders: true,
    digest: 'weekly'
  });

  const handleProfileSave = () => {
    console.log('Saving profile:', profileData);
    alert('Profile updated successfully!');
  };

  const handleSecuritySave = () => {
    console.log('Saving security settings:', securitySettings);
    alert('Security settings updated successfully!');
  };

  const handleNotificationSave = () => {
    console.log('Saving notification settings:', notificationSettings);
    alert('Notification preferences updated successfully!');
  };

  const ProfileBasicInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Basic Information
          </CardTitle>
          <CardDescription>Update your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-2xl">
                {currentUser.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-sm text-gray-600 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="department">Department</Label>
              <Select 
                value={profileData.department} 
                onValueChange={(value) => setProfileData({...profileData, department: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="designation">Designation</Label>
              <Select 
                value={profileData.designation} 
                onValueChange={(value) => setProfileData({...profileData, designation: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={profileData.employeeId}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input
                id="joiningDate"
                type="date"
                value={profileData.joiningDate}
                onChange={(e) => setProfileData({...profileData, joiningDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="office">Office Location</Label>
              <Input
                id="office"
                value={profileData.office}
                onChange={(e) => setProfileData({...profileData, office: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="biography">Biography</Label>
            <Textarea
              id="biography"
              value={profileData.biography}
              onChange={(e) => setProfileData({...profileData, biography: e.target.value})}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <Button onClick={handleProfileSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const AcademicInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            Academic Information
          </CardTitle>
          <CardDescription>Your academic qualifications and research details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="qualifications">Qualifications</Label>
            <Textarea
              id="qualifications"
              value={profileData.qualifications}
              onChange={(e) => setProfileData({...profileData, qualifications: e.target.value})}
              rows={3}
              placeholder="List your academic qualifications..."
            />
          </div>

          <div>
            <Label htmlFor="researchInterests">Research Interests</Label>
            <Textarea
              id="researchInterests"
              value={profileData.researchInterests}
              onChange={(e) => setProfileData({...profileData, researchInterests: e.target.value})}
              rows={3}
              placeholder="Describe your research interests..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="website">Personal Website</Label>
              <Input
                id="website"
                value={profileData.personalWebsite}
                onChange={(e) => setProfileData({...profileData, personalWebsite: e.target.value})}
                placeholder="https://your-website.com"
              />
            </div>

            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                value={profileData.linkedIn}
                onChange={(e) => setProfileData({...profileData, linkedIn: e.target.value})}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <Label htmlFor="orcid">ORCID ID</Label>
              <Input
                id="orcid"
                value={profileData.orcid}
                onChange={(e) => setProfileData({...profileData, orcid: e.target.value})}
                placeholder="0000-0000-0000-0000"
              />
            </div>
          </div>

          <Button onClick={handleProfileSave} className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Update Academic Info
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-600" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security and privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <Switch
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={(checked) => setSecuritySettings({
                  ...securitySettings,
                  twoFactorEnabled: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between py-4 border-b">
              <div>
                <h4 className="font-medium">Login Alerts</h4>
                <p className="text-sm text-gray-600">Get notified when someone signs into your account</p>
              </div>
              <Switch
                checked={securitySettings.loginAlerts}
                onCheckedChange={(checked) => setSecuritySettings({
                  ...securitySettings,
                  loginAlerts: checked
                })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-gray-600">Last changed: {securitySettings.passwordLastChanged}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
          </div>

          <Button onClick={handleSecuritySave} className="bg-red-600 hover:bg-red-700">
            <Save className="w-4 h-4 mr-2" />
            Update Security Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-orange-600" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium">Schedule Updates</h4>
                <p className="text-sm text-gray-600">Changes to your teaching schedule</p>
              </div>
              <Switch
                checked={notificationSettings.scheduleUpdates}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  scheduleUpdates: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium">Leave Approvals</h4>
                <p className="text-sm text-gray-600">Status updates on your leave requests</p>
              </div>
              <Switch
                checked={notificationSettings.leaveApprovals}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  leaveApprovals: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium">System Maintenance</h4>
                <p className="text-sm text-gray-600">Scheduled maintenance and downtime alerts</p>
              </div>
              <Switch
                checked={notificationSettings.systemMaintenance}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  systemMaintenance: checked
                })}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <h4 className="font-medium">Event Reminders</h4>
                <p className="text-sm text-gray-600">Upcoming meetings and important events</p>
              </div>
              <Switch
                checked={notificationSettings.eventReminders}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  eventReminders: checked
                })}
              />
            </div>
          </div>

          <div>
            <Label>Email Digest Frequency</Label>
            <Select 
              value={notificationSettings.digest} 
              onValueChange={(value) => setNotificationSettings({
                ...notificationSettings,
                digest: value
              })}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleNotificationSave} className="bg-orange-600 hover:bg-orange-700">
            <Save className="w-4 h-4 mr-2" />
            Save Notification Preferences
          </Button>
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
                <User className="w-5 h-5 mr-2 text-blue-600" />
                My Profile
              </CardTitle>
              <CardDescription>
                Manage your personal information and account settings
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={`${
                currentUser.role === 'administrator' ? 'bg-red-100 text-red-800' :
                currentUser.role === 'hod' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {currentUser.role?.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-xl">
                {currentUser.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.designation} • {profileData.department}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {profileData.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {profileData.phone}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profileData.office}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <ProfileBasicInfo />
        </TabsContent>
        
        <TabsContent value="academic">
          <AcademicInfo />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;