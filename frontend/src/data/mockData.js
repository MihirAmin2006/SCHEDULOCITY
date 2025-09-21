// Mock data for Higher Education Timetable Management System

// User accounts for authentication
export const mockUsers = [
  // Faculty accounts
  { id: 1, username: 'john.doe', password: 'faculty123', role: 'faculty', name: 'Dr. John Doe', department: 'Computer Science', email: 'john.doe@university.edu' },
  { id: 2, username: 'jane.smith', password: 'faculty123', role: 'faculty', name: 'Dr. Jane Smith', department: 'Mathematics', email: 'jane.smith@university.edu' },
  { id: 3, username: 'bob.wilson', password: 'faculty123', role: 'faculty', name: 'Prof. Bob Wilson', department: 'Physics', email: 'bob.wilson@university.edu' },
  
  // HOD accounts
  { id: 31, username: 'alice.johnson', password: 'hod123', role: 'hod', name: 'Dr. Alice Johnson', department: 'Computer Science', email: 'alice.johnson@university.edu' },
  { id: 32, username: 'david.brown', password: 'hod123', role: 'hod', name: 'Dr. David Brown', department: 'Mathematics', email: 'david.brown@university.edu' },
  
  // Administrator accounts
  { id: 51, username: 'admin', password: 'admin123', role: 'administrator', name: 'System Administrator', department: 'IT Services', email: 'admin@university.edu' },
  { id: 52, username: 'sarah.admin', password: 'admin123', role: 'administrator', name: 'Sarah Williams', department: 'Academic Affairs', email: 'sarah.williams@university.edu' }
];

// Generate 30 faculty members
export const facultyMembers = [
  { id: 1, name: 'Dr. John Doe', department: 'Computer Science', subjects: ['Programming', 'Data Structures', 'Algorithms'], availability: 'Available', email: 'john.doe@university.edu', phone: '+1-555-0101' },
  { id: 2, name: 'Dr. Jane Smith', department: 'Mathematics', subjects: ['Calculus', 'Linear Algebra', 'Statistics'], availability: 'Available', email: 'jane.smith@university.edu', phone: '+1-555-0102' },
  { id: 3, name: 'Prof. Bob Wilson', department: 'Physics', subjects: ['Mechanics', 'Thermodynamics', 'Quantum Physics'], availability: 'On Leave', email: 'bob.wilson@university.edu', phone: '+1-555-0103' },
  { id: 4, name: 'Dr. Sarah Davis', department: 'Chemistry', subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'], availability: 'Available', email: 'sarah.davis@university.edu', phone: '+1-555-0104' },
  { id: 5, name: 'Prof. Michael Chen', department: 'Biology', subjects: ['Cell Biology', 'Genetics', 'Ecology'], availability: 'Available', email: 'michael.chen@university.edu', phone: '+1-555-0105' },
  { id: 6, name: 'Dr. Emily Johnson', department: 'English', subjects: ['Literature', 'Creative Writing', 'Linguistics'], availability: 'Busy', email: 'emily.johnson@university.edu', phone: '+1-555-0106' },
  { id: 7, name: 'Prof. David Lee', department: 'History', subjects: ['World History', 'Ancient Civilizations', 'Modern History'], availability: 'Available', email: 'david.lee@university.edu', phone: '+1-555-0107' },
  { id: 8, name: 'Dr. Lisa Wang', department: 'Economics', subjects: ['Microeconomics', 'Macroeconomics', 'Econometrics'], availability: 'Available', email: 'lisa.wang@university.edu', phone: '+1-555-0108' },
  { id: 9, name: 'Prof. James Miller', department: 'Psychology', subjects: ['Cognitive Psychology', 'Social Psychology', 'Research Methods'], availability: 'Available', email: 'james.miller@university.edu', phone: '+1-555-0109' },
  { id: 10, name: 'Dr. Maria Garcia', department: 'Sociology', subjects: ['Social Theory', 'Research Methods', 'Urban Sociology'], availability: 'On Leave', email: 'maria.garcia@university.edu', phone: '+1-555-0110' },
  // Adding 20 more faculty members...
  { id: 11, name: 'Prof. Robert Taylor', department: 'Philosophy', subjects: ['Ethics', 'Logic', 'Ancient Philosophy'], availability: 'Available', email: 'robert.taylor@university.edu', phone: '+1-555-0111' },
  { id: 12, name: 'Dr. Helen Chang', department: 'Art', subjects: ['Drawing', 'Painting', 'Art History'], availability: 'Available', email: 'helen.chang@university.edu', phone: '+1-555-0112' },
  { id: 13, name: 'Prof. Thomas Anderson', department: 'Music', subjects: ['Music Theory', 'Composition', 'Performance'], availability: 'Busy', email: 'thomas.anderson@university.edu', phone: '+1-555-0113' },
  { id: 14, name: 'Dr. Rachel Green', department: 'Geography', subjects: ['Physical Geography', 'Human Geography', 'GIS'], availability: 'Available', email: 'rachel.green@university.edu', phone: '+1-555-0114' },
  { id: 15, name: 'Prof. Steven Clark', department: 'Political Science', subjects: ['Comparative Politics', 'International Relations', 'Public Policy'], availability: 'Available', email: 'steven.clark@university.edu', phone: '+1-555-0115' },
  { id: 16, name: 'Dr. Anna Rodriguez', department: 'Anthropology', subjects: ['Cultural Anthropology', 'Archaeology', 'Linguistic Anthropology'], availability: 'Available', email: 'anna.rodriguez@university.edu', phone: '+1-555-0116' },
  { id: 17, name: 'Prof. Mark Thompson', department: 'Engineering', subjects: ['Mechanical Engineering', 'Thermodynamics', 'Fluid Mechanics'], availability: 'On Leave', email: 'mark.thompson@university.edu', phone: '+1-555-0117' },
  { id: 18, name: 'Dr. Jennifer White', department: 'Nursing', subjects: ['Anatomy', 'Physiology', 'Patient Care'], availability: 'Available', email: 'jennifer.white@university.edu', phone: '+1-555-0118' },
  { id: 19, name: 'Prof. Kevin Moore', department: 'Business', subjects: ['Marketing', 'Finance', 'Management'], availability: 'Available', email: 'kevin.moore@university.edu', phone: '+1-555-0119' },
  { id: 20, name: 'Dr. Amy Davis', department: 'Education', subjects: ['Educational Psychology', 'Curriculum Development', 'Assessment'], availability: 'Busy', email: 'amy.davis@university.edu', phone: '+1-555-0120' },
  { id: 21, name: 'Prof. Daniel Kim', department: 'Computer Science', subjects: ['Machine Learning', 'Database Systems', 'Software Engineering'], availability: 'Available', email: 'daniel.kim@university.edu', phone: '+1-555-0121' },
  { id: 22, name: 'Dr. Nicole Brown', department: 'Mathematics', subjects: ['Discrete Mathematics', 'Number Theory', 'Applied Mathematics'], availability: 'Available', email: 'nicole.brown@university.edu', phone: '+1-555-0122' },
  { id: 23, name: 'Prof. Chris Wilson', department: 'Physics', subjects: ['Electromagnetism', 'Optics', 'Nuclear Physics'], availability: 'Available', email: 'chris.wilson@university.edu', phone: '+1-555-0123' },
  { id: 24, name: 'Dr. Laura Martinez', department: 'Chemistry', subjects: ['Analytical Chemistry', 'Biochemistry', 'Environmental Chemistry'], availability: 'On Leave', email: 'laura.martinez@university.edu', phone: '+1-555-0124' },
  { id: 25, name: 'Prof. Brian Jackson', department: 'Biology', subjects: ['Molecular Biology', 'Microbiology', 'Evolution'], availability: 'Available', email: 'brian.jackson@university.edu', phone: '+1-555-0125' },
  { id: 26, name: 'Dr. Michelle Lee', department: 'English', subjects: ['American Literature', 'British Literature', 'Composition'], availability: 'Available', email: 'michelle.lee@university.edu', phone: '+1-555-0126' },
  { id: 27, name: 'Prof. Ryan Taylor', department: 'History', subjects: ['European History', 'American History', 'Historical Methods'], availability: 'Busy', email: 'ryan.taylor@university.edu', phone: '+1-555-0127' },
  { id: 28, name: 'Dr. Stephanie Chen', department: 'Psychology', subjects: ['Developmental Psychology', 'Abnormal Psychology', 'Statistics'], availability: 'Available', email: 'stephanie.chen@university.edu', phone: '+1-555-0128' },
  { id: 29, name: 'Prof. Andrew Miller', department: 'Engineering', subjects: ['Electrical Engineering', 'Circuit Analysis', 'Digital Systems'], availability: 'Available', email: 'andrew.miller@university.edu', phone: '+1-555-0129' },
  { id: 30, name: 'Dr. Jessica Garcia', department: 'Business', subjects: ['Accounting', 'Operations Management', 'Strategic Management'], availability: 'Available', email: 'jessica.garcia@university.edu', phone: '+1-555-0130' }
];

// Generate 100 subjects across various departments
export const subjects = [
  // Computer Science
  { id: 1, name: 'Programming Fundamentals', department: 'Computer Science', credits: 3, semester: 1 },
  { id: 2, name: 'Data Structures', department: 'Computer Science', credits: 4, semester: 2 },
  { id: 3, name: 'Algorithms', department: 'Computer Science', credits: 4, semester: 3 },
  { id: 4, name: 'Database Systems', department: 'Computer Science', credits: 3, semester: 4 },
  { id: 5, name: 'Software Engineering', department: 'Computer Science', credits: 3, semester: 5 },
  { id: 6, name: 'Machine Learning', department: 'Computer Science', credits: 4, semester: 6 },
  { id: 7, name: 'Computer Networks', department: 'Computer Science', credits: 3, semester: 5 },
  { id: 8, name: 'Operating Systems', department: 'Computer Science', credits: 4, semester: 4 },
  { id: 9, name: 'Web Development', department: 'Computer Science', credits: 3, semester: 3 },
  { id: 10, name: 'Mobile App Development', department: 'Computer Science', credits: 3, semester: 6 },
  
  // Mathematics
  { id: 11, name: 'Calculus I', department: 'Mathematics', credits: 4, semester: 1 },
  { id: 12, name: 'Calculus II', department: 'Mathematics', credits: 4, semester: 2 },
  { id: 13, name: 'Linear Algebra', department: 'Mathematics', credits: 3, semester: 2 },
  { id: 14, name: 'Differential Equations', department: 'Mathematics', credits: 3, semester: 3 },
  { id: 15, name: 'Statistics', department: 'Mathematics', credits: 3, semester: 3 },
  { id: 16, name: 'Discrete Mathematics', department: 'Mathematics', credits: 3, semester: 1 },
  { id: 17, name: 'Number Theory', department: 'Mathematics', credits: 3, semester: 4 },
  { id: 18, name: 'Abstract Algebra', department: 'Mathematics', credits: 4, semester: 5 },
  { id: 19, name: 'Real Analysis', department: 'Mathematics', credits: 4, semester: 5 },
  { id: 20, name: 'Applied Mathematics', department: 'Mathematics', credits: 3, semester: 6 },
  
  // Physics
  { id: 21, name: 'Mechanics', department: 'Physics', credits: 4, semester: 1 },
  { id: 22, name: 'Thermodynamics', department: 'Physics', credits: 3, semester: 2 },
  { id: 23, name: 'Electromagnetism', department: 'Physics', credits: 4, semester: 3 },
  { id: 24, name: 'Quantum Physics', department: 'Physics', credits: 4, semester: 4 },
  { id: 25, name: 'Optics', department: 'Physics', credits: 3, semester: 3 },
  { id: 26, name: 'Nuclear Physics', department: 'Physics', credits: 3, semester: 5 },
  { id: 27, name: 'Solid State Physics', department: 'Physics', credits: 4, semester: 6 },
  { id: 28, name: 'Astrophysics', department: 'Physics', credits: 3, semester: 6 },
  { id: 29, name: 'Mathematical Physics', department: 'Physics', credits: 3, semester: 4 },
  { id: 30, name: 'Experimental Physics', department: 'Physics', credits: 2, semester: 2 },
  
  // Continue with more subjects for other departments...
  // Chemistry
  { id: 31, name: 'General Chemistry', department: 'Chemistry', credits: 4, semester: 1 },
  { id: 32, name: 'Organic Chemistry', department: 'Chemistry', credits: 4, semester: 2 },
  { id: 33, name: 'Inorganic Chemistry', department: 'Chemistry', credits: 3, semester: 3 },
  { id: 34, name: 'Physical Chemistry', department: 'Chemistry', credits: 4, semester: 4 },
  { id: 35, name: 'Analytical Chemistry', department: 'Chemistry', credits: 3, semester: 3 },
  { id: 36, name: 'Biochemistry', department: 'Chemistry', credits: 4, semester: 5 },
  { id: 37, name: 'Environmental Chemistry', department: 'Chemistry', credits: 3, semester: 6 },
  { id: 38, name: 'Medicinal Chemistry', department: 'Chemistry', credits: 3, semester: 6 },
  { id: 39, name: 'Polymer Chemistry', department: 'Chemistry', credits: 3, semester: 5 },
  { id: 40, name: 'Chemistry Lab', department: 'Chemistry', credits: 2, semester: 1 },
  
  // Biology
  { id: 41, name: 'Cell Biology', department: 'Biology', credits: 3, semester: 1 },
  { id: 42, name: 'Genetics', department: 'Biology', credits: 4, semester: 2 },
  { id: 43, name: 'Ecology', department: 'Biology', credits: 3, semester: 3 },
  { id: 44, name: 'Molecular Biology', department: 'Biology', credits: 4, semester: 4 },
  { id: 45, name: 'Microbiology', department: 'Biology', credits: 3, semester: 3 },
  { id: 46, name: 'Evolution', department: 'Biology', credits: 3, semester: 5 },
  { id: 47, name: 'Anatomy', department: 'Biology', credits: 4, semester: 2 },
  { id: 48, name: 'Physiology', department: 'Biology', credits: 4, semester: 3 },
  { id: 49, name: 'Biotechnology', department: 'Biology', credits: 3, semester: 6 },
  { id: 50, name: 'Marine Biology', department: 'Biology', credits: 3, semester: 6 },
  
  // Engineering
  { id: 51, name: 'Engineering Mechanics', department: 'Engineering', credits: 4, semester: 1 },
  { id: 52, name: 'Thermodynamics', department: 'Engineering', credits: 3, semester: 2 },
  { id: 53, name: 'Fluid Mechanics', department: 'Engineering', credits: 4, semester: 3 },
  { id: 54, name: 'Electrical Engineering', department: 'Engineering', credits: 4, semester: 2 },
  { id: 55, name: 'Circuit Analysis', department: 'Engineering', credits: 3, semester: 3 },
  { id: 56, name: 'Digital Systems', department: 'Engineering', credits: 3, semester: 4 },
  { id: 57, name: 'Control Systems', department: 'Engineering', credits: 4, semester: 5 },
  { id: 58, name: 'Materials Science', department: 'Engineering', credits: 3, semester: 4 },
  { id: 59, name: 'Manufacturing Processes', department: 'Engineering', credits: 3, semester: 5 },
  { id: 60, name: 'Project Management', department: 'Engineering', credits: 3, semester: 6 },
  
  // Business
  { id: 61, name: 'Accounting Principles', department: 'Business', credits: 3, semester: 1 },
  { id: 62, name: 'Marketing Fundamentals', department: 'Business', credits: 3, semester: 2 },
  { id: 63, name: 'Finance', department: 'Business', credits: 4, semester: 3 },
  { id: 64, name: 'Management', department: 'Business', credits: 3, semester: 2 },
  { id: 65, name: 'Operations Management', department: 'Business', credits: 3, semester: 4 },
  { id: 66, name: 'Strategic Management', department: 'Business', credits: 4, semester: 6 },
  { id: 67, name: 'Human Resources', department: 'Business', credits: 3, semester: 4 },
  { id: 68, name: 'International Business', department: 'Business', credits: 3, semester: 5 },
  { id: 69, name: 'Entrepreneurship', department: 'Business', credits: 3, semester: 6 },
  { id: 70, name: 'Business Ethics', department: 'Business', credits: 2, semester: 5 },
  
  // English
  { id: 71, name: 'English Composition', department: 'English', credits: 3, semester: 1 },
  { id: 72, name: 'American Literature', department: 'English', credits: 3, semester: 2 },
  { id: 73, name: 'British Literature', department: 'English', credits: 3, semester: 3 },
  { id: 74, name: 'Creative Writing', department: 'English', credits: 3, semester: 4 },
  { id: 75, name: 'Linguistics', department: 'English', credits: 3, semester: 5 },
  { id: 76, name: 'World Literature', department: 'English', credits: 3, semester: 6 },
  { id: 77, name: 'Poetry', department: 'English', credits: 2, semester: 4 },
  { id: 78, name: 'Drama', department: 'English', credits: 2, semester: 5 },
  { id: 79, name: 'Technical Writing', department: 'English', credits: 3, semester: 3 },
  { id: 80, name: 'Literary Criticism', department: 'English', credits: 3, semester: 6 },
  
  // History
  { id: 81, name: 'World History', department: 'History', credits: 3, semester: 1 },
  { id: 82, name: 'American History', department: 'History', credits: 3, semester: 2 },
  { id: 83, name: 'European History', department: 'History', credits: 3, semester: 3 },
  { id: 84, name: 'Ancient Civilizations', department: 'History', credits: 3, semester: 1 },
  { id: 85, name: 'Modern History', department: 'History', credits: 3, semester: 4 },
  { id: 86, name: 'Historical Methods', department: 'History', credits: 2, semester: 5 },
  { id: 87, name: 'Cultural History', department: 'History', credits: 3, semester: 5 },
  { id: 88, name: 'Military History', department: 'History', credits: 3, semester: 6 },
  { id: 89, name: 'Economic History', department: 'History', credits: 3, semester: 6 },
  { id: 90, name: 'Social History', department: 'History', credits: 3, semester: 4 },
  
  // Psychology
  { id: 91, name: 'Introduction to Psychology', department: 'Psychology', credits: 3, semester: 1 },
  { id: 92, name: 'Cognitive Psychology', department: 'Psychology', credits: 3, semester: 2 },
  { id: 93, name: 'Social Psychology', department: 'Psychology', credits: 3, semester: 3 },
  { id: 94, name: 'Developmental Psychology', department: 'Psychology', credits: 3, semester: 4 },
  { id: 95, name: 'Abnormal Psychology', department: 'Psychology', credits: 3, semester: 5 },
  { id: 96, name: 'Research Methods', department: 'Psychology', credits: 4, semester: 2 },
  { id: 97, name: 'Statistics', department: 'Psychology', credits: 3, semester: 3 },
  { id: 98, name: 'Personality Psychology', department: 'Psychology', credits: 3, semester: 6 },
  { id: 99, name: 'Clinical Psychology', department: 'Psychology', credits: 4, semester: 6 },
  { id: 100, name: 'Health Psychology', department: 'Psychology', credits: 3, semester: 5 }
];

// Generate 180 classrooms
export const classrooms = Array.from({ length: 180 }, (_, i) => ({
  id: i + 1,
  name: `Room ${String(i + 1).padStart(3, '0')}`,
  building: `Building ${String.fromCharCode(65 + Math.floor(i / 30))}`,
  capacity: Math.floor(Math.random() * 80) + 20, // 20-100 capacity
  type: ['Lecture Hall', 'Seminar Room', 'Laboratory', 'Computer Lab'][Math.floor(Math.random() * 4)],
  equipment: ['Projector', 'Whiteboard', 'Smart Board', 'Audio System'][Math.floor(Math.random() * 4)],
  status: ['Available', 'Occupied', 'Maintenance'][Math.floor(Math.random() * 3)]
}));

// Generate 150 labs
export const laboratories = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  name: `Lab ${String(i + 1).padStart(3, '0')}`,
  building: `Building ${String.fromCharCode(65 + Math.floor(i / 25))}`,
  capacity: Math.floor(Math.random() * 30) + 15, // 15-45 capacity
  type: ['Computer Lab', 'Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Engineering Lab'][Math.floor(Math.random() * 5)],
  equipment: ['Computers', 'Lab Equipment', 'Safety Equipment', 'Measuring Instruments'][Math.floor(Math.random() * 4)],
  status: ['Available', 'Occupied', 'Maintenance'][Math.floor(Math.random() * 3)]
}));

// Student batches
export const studentBatches = [
  { id: 1, name: 'CS-2024-A', department: 'Computer Science', year: 2024, semester: 1, strength: 60 },
  { id: 2, name: 'CS-2024-B', department: 'Computer Science', year: 2024, semester: 1, strength: 55 },
  { id: 3, name: 'CS-2023-A', department: 'Computer Science', year: 2023, semester: 3, strength: 58 },
  { id: 4, name: 'CS-2023-B', department: 'Computer Science', year: 2023, semester: 3, strength: 52 },
  { id: 5, name: 'MATH-2024-A', department: 'Mathematics', year: 2024, semester: 1, strength: 45 },
  { id: 6, name: 'MATH-2023-A', department: 'Mathematics', year: 2023, semester: 3, strength: 42 },
  { id: 7, name: 'PHY-2024-A', department: 'Physics', year: 2024, semester: 1, strength: 38 },
  { id: 8, name: 'PHY-2023-A', department: 'Physics', year: 2023, semester: 3, strength: 40 },
  { id: 9, name: 'CHEM-2024-A', department: 'Chemistry', year: 2024, semester: 1, strength: 35 },
  { id: 10, name: 'CHEM-2023-A', department: 'Chemistry', year: 2023, semester: 3, strength: 37 }
];

// Sample timetable data
export const sampleTimetable = [
  {
    id: 1,
    day: 'Monday',
    timeSlot: '09:00-10:00',
    subject: 'Programming Fundamentals',
    faculty: 'Dr. John Doe',
    classroom: 'Room 101',
    batch: 'CS-2024-A',
    department: 'Computer Science'
  },
  {
    id: 2,
    day: 'Monday',
    timeSlot: '10:00-11:00',
    subject: 'Calculus I',
    faculty: 'Dr. Jane Smith',
    classroom: 'Room 205',
    batch: 'CS-2024-A',
    department: 'Computer Science'
  },
  {
    id: 3,
    day: 'Tuesday',
    timeSlot: '09:00-10:00',
    subject: 'Data Structures',
    faculty: 'Prof. Daniel Kim',
    classroom: 'Lab 001',
    batch: 'CS-2023-A',
    department: 'Computer Science'
  }
];

// Leave requests
export const leaveRequests = [
  {
    id: 1,
    facultyId: 3,
    facultyName: 'Prof. Bob Wilson',
    startDate: '2024-12-20',
    endDate: '2024-12-22',
    reason: 'Medical',
    status: 'Approved',
    requestDate: '2024-12-15'
  },
  {
    id: 2,
    facultyId: 10,
    facultyName: 'Dr. Maria Garcia',
    startDate: '2024-12-25',
    endDate: '2024-12-30',
    reason: 'Personal',
    status: 'Pending',
    requestDate: '2024-12-18'
  }
];

export const departments = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Engineering',
  'Business',
  'English',
  'History',
  'Psychology',
  'Economics',
  'Sociology',
  'Philosophy',
  'Art',
  'Music',
  'Geography',
  'Political Science',
  'Anthropology',
  'Nursing',
  'Education'
];

export const timeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:15-12:15',
  '12:15-13:15',
  '14:00-15:00',
  '15:00-16:00',
  '16:15-17:15'
];

export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];