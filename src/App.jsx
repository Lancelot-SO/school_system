import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Teachers from './pages/Teachers';
import StudentDetails from './pages/StudentDetails';
import AddStudent from './pages/AddStudent';
import Attendance from './pages/Attendance';
import FeesCollection from './pages/FeesCollection';
import Expenses from './pages/Expenses';
import NoticeBoard from './pages/NoticeBoard';
import RegisterSchool from './pages/RegisterSchool';
import SchoolDetails from './pages/onboarding/SchoolDetails';
import UploadBulkStudents from './pages/onboarding/UploadBulkStudents';
import UploadBulkTeachers from './pages/onboarding/UploadBulkTeachers';

function App() {
  return (
    <Router>
      <Routes>
        {/* No Sidebar Routes */}
        <Route path="/register-school" element={<RegisterSchool />} />
        <Route path="/onboarding/school-details" element={<SchoolDetails />} />
        <Route path="/onboarding/upload-students" element={<UploadBulkStudents />} />
        <Route path="/onboarding/upload-teachers" element={<UploadBulkTeachers />} />

        {/* Private Dashboard Routes with Sidebar */}
        <Route path="*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/student-details" element={<StudentDetails />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/finance/fees-collection" element={<FeesCollection />} />
              <Route path="/finance/expenses" element={<Expenses />} />
              <Route path="/notice-board" element={<NoticeBoard />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
