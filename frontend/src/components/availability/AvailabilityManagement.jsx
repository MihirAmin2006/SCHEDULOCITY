import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { 
  Clock, 
  Calendar,
  Save,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Settings,
  User
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { timeSlots, weekDays } from '../../data/mockData';

const AvailabilityManagement = ({ currentUser }) => {
  const [availabilityStatus, setAvailabilityStatus] = useState('Available');
  const [weeklySchedule, setWeeklySchedule] = useState(() => {
    // Initialize with some default availability
    const schedule = {};
    weekDays.forEach(day => {
      schedule[day] = {};
      timeSlots.forEach(slot => {
        schedule[day][slot] = Math.random() > 0.3; // 70% available by default
      });
    });
    return schedule;
  });

  const [preferences, setPreferences] = useState({
    maxHoursPerDay: 6,
    maxHoursPerWeek: 25,
    preferredDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    avoidBackToBack: true,
    lunchBreakRequired: true,
    lunchBreakTime: '12:15-13:15',
    specialRequirements: '',
    notificationPreference: 'email'
  });

  const [conflicts, setConflicts] = useState([
    {
      id: 1,
      day: 'Monday',
      time: '10:00-11:00',
      reason: 'Faculty meeting scheduled',
      type: 'conflict'
    },
    {
      id: 2,
      day: 'Wednesday',
      time: '14:00-15:00',
      reason: 'Maintenance window',
      type: 'warning'
    }
  ]);

  const handleScheduleToggle = (day, slot) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day][slot]
      }
    }));
  };

  const handleSaveAvailability = () => {
    // Mock save - in real app would call API
    console.log('Saving availability:', {
      status: availabilityStatus,
      schedule: weeklySchedule,
      preferences
    });
    alert('Availability preferences saved successfully!');
  };

  const handleResetToDefault = () => {
    setWeeklySchedule(() => {
      const schedule = {};
      weekDays.forEach(day => {
        schedule[day] = {};
        timeSlots.forEach(slot => {
          schedule[day][slot] = true; // All available
        });
      });
      return schedule;
    });
  };

  const getAvailabilityStats = () => {
    let totalSlots = 0;
    let availableSlots = 0;
    
    weekDays.forEach(day => {
      timeSlots.forEach(slot => {
        totalSlots++;
        if (weeklySchedule[day][slot]) {
          availableSlots++;
        }
      });
    });

    return {
      totalSlots,
      availableSlots,
      percentage: Math.round((availableSlots / totalSlots) * 100),
      unavailableSlots: totalSlots - availableSlots
    };
  };

  const stats = getAvailabilityStats();

  const WeeklyAvailabilityGrid = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Weekly Availability Schedule
        </CardTitle>
        <CardDescription>
          Click on time slots to toggle your availability. Green = Available, Red = Not Available
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  const isAvailable = weeklySchedule[day][timeSlot];
                  const hasConflict = conflicts.some(c => c.day === day && c.time === timeSlot);
                  
                  return (
                    <button
                      key={`${day}-${timeSlot}`}
                      onClick={() => handleScheduleToggle(day, timeSlot)}
                      className={`p-3 rounded-lg text-xs font-medium transition-colors min-h-[60px] flex items-center justify-center ${
                        hasConflict
                          ? 'bg-orange-100 border-2 border-orange-300 text-orange-800'
                          : isAvailable
                          ? 'bg-green-100 hover:bg-green-200 border-2 border-green-300 text-green-800'
                          : 'bg-red-100 hover:bg-red-200 border-2 border-red-300 text-red-800'
                      }`}
                    >
                      {hasConflict ? (
                        <div className="text-center">
                          <AlertCircle className="w-4 h-4 mx-auto mb-1" />
                          <div>Conflict</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          {isAvailable ? (
                            <>
                              <CheckCircle className="w-4 h-4 mx-auto mb-1" />
                              <div>Available</div>
                            </>
                          ) : (
                            <div>Not Available</div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PreferencesCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-600" />
          Teaching Preferences
        </CardTitle>
        <CardDescription>Set your preferred teaching schedule and constraints</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="maxHoursDay">Maximum Hours Per Day</Label>
            <Input
              id="maxHoursDay"
              type="number"
              min="1"
              max="12"
              value={preferences.maxHoursPerDay}
              onChange={(e) => setPreferences({
                ...preferences,
                maxHoursPerDay: parseInt(e.target.value)
              })}
            />
          </div>
          
          <div>
            <Label htmlFor="maxHoursWeek">Maximum Hours Per Week</Label>
            <Input
              id="maxHoursWeek"
              type="number"
              min="1"
              max="40"
              value={preferences.maxHoursPerWeek}
              onChange={(e) => setPreferences({
                ...preferences,
                maxHoursPerWeek: parseInt(e.target.value)
              })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="lunchBreak">Lunch Break Time</Label>
          <Select 
            value={preferences.lunchBreakTime} 
            onValueChange={(value) => setPreferences({
              ...preferences,
              lunchBreakTime: value
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12:15-13:15">12:15 PM - 1:15 PM</SelectItem>
              <SelectItem value="13:15-14:15">1:15 PM - 2:15 PM</SelectItem>
              <SelectItem value="11:15-12:15">11:15 AM - 12:15 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="avoidBackToBack">Avoid Back-to-Back Classes</Label>
              <p className="text-sm text-gray-600">Prefer breaks between consecutive classes</p>
            </div>
            <Switch
              id="avoidBackToBack"
              checked={preferences.avoidBackToBack}
              onCheckedChange={(checked) => setPreferences({
                ...preferences,
                avoidBackToBack: checked
              })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="lunchRequired">Lunch Break Required</Label>
              <p className="text-sm text-gray-600">Ensure lunch break is protected</p>
            </div>
            <Switch
              id="lunchRequired"
              checked={preferences.lunchBreakRequired}
              onCheckedChange={(checked) => setPreferences({
                ...preferences,
                lunchBreakRequired: checked
              })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea
            id="specialRequirements"
            placeholder="Any special scheduling requirements or constraints..."
            value={preferences.specialRequirements}
            onChange={(e) => setPreferences({
              ...preferences,
              specialRequirements: e.target.value
            })}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );

  const ConflictsCard = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
          Schedule Conflicts & Warnings
        </CardTitle>
        <CardDescription>Potential conflicts with your availability preferences</CardDescription>
      </CardHeader>
      <CardContent>
        {conflicts.length > 0 ? (
          <div className="space-y-3">
            {conflicts.map((conflict) => (
              <div key={conflict.id} className={`p-4 rounded-lg border ${
                conflict.type === 'conflict' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    conflict.type === 'conflict' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {conflict.day} at {conflict.time}
                    </div>
                    <div className={`text-sm ${
                      conflict.type === 'conflict' ? 'text-red-700' : 'text-orange-700'
                    }`}>
                      {conflict.reason}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p>No conflicts detected with your current availability</p>
          </div>
        )}
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
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Availability Management
              </CardTitle>
              <CardDescription>
                Manage your teaching schedule preferences and availability
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={availabilityStatus} onValueChange={setAvailabilityStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Badge className={`${
                availabilityStatus === 'Available' ? 'bg-green-100 text-green-800' :
                availabilityStatus === 'Busy' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {availabilityStatus}
              </Badge>
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
                <p className="text-sm font-medium text-gray-600">Total Time Slots</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSlots}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Slots</p>
                <p className="text-3xl font-bold text-green-600">{stats.availableSlots}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unavailable</p>
                <p className="text-3xl font-bold text-red-600">{stats.unavailableSlots}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Availability</p>
                <p className="text-3xl font-bold text-purple-600">{stats.percentage}%</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyAvailabilityGrid />
        </div>
        
        <div className="space-y-6">
          <ConflictsCard />
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleSaveAvailability}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Availability
              </Button>
              <Button 
                onClick={handleResetToDefault}
                variant="outline" 
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to All Available
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preferences */}
      <PreferencesCard />
    </div>
  );
};

export default AvailabilityManagement;