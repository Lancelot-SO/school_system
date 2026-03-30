import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Calendar from './pages/Calendar';
import Teachers from './pages/Teachers';
import AddTeacher from './pages/AddTeacher';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import AddStudent from './pages/AddStudent';
import Attendance from './pages/Attendance';
import FeesCollection from './pages/FeesCollection';
import Expenses from './pages/Expenses';
import NoticeBoard from './pages/NoticeBoard';
import SchoolProfileSettings from './pages/admin/SchoolProfileSettings';
import SchoolDetails from './pages/onboarding/SchoolDetails';
import UploadBulkStudents from './pages/onboarding/UploadBulkStudents';
import UploadBulkTeachers from './pages/onboarding/UploadBulkTeachers';
import RegisterSchool from './pages/RegisterSchool';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';

const RootRedirect = () => {
  const token = localStorage.getItem('token');
  const slug = localStorage.getItem('active_school_slug');
  
  if (token && slug) {
    return <Navigate to={`/${slug}/admin/dashboard`} replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/register-school" element={<RegisterSchool />} />
        <Route path="/login" element={<Login />} />

        {/* Onboarding Routes - No Sidebar */}
        <Route path="/onboarding/school-details" element={<SchoolDetails />} />
        <Route path="/onboarding/upload-students" element={<UploadBulkStudents />} />
        <Route path="/onboarding/upload-teachers" element={<UploadBulkTeachers />} />

        {/* Private Dashboard Routes with Sidebar */}
        <Route path="/:school_slug/*" element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                {/* Admin Routes */}
                <Route path="admin/dashboard" element={<Dashboard />} />
                <Route path="admin/inbox" element={<Inbox />} />
                <Route path="admin/calendar" element={<Calendar />} />
                <Route path="admin/teachers" element={<Teachers />} />
                <Route path="admin/teachers/add" element={<AddTeacher />} />
                <Route path="admin/students" element={<Students />} />
                <Route path="admin/student-details" element={<StudentDetails />} />
                <Route path="admin/students/add" element={<AddStudent />} />
                <Route path="admin/attendance" element={<Attendance />} />
                <Route path="admin/finance/fees-collection" element={<FeesCollection />} />
                <Route path="admin/finance/expenses" element={<Expenses />} />
                <Route path="admin/notice-board" element={<NoticeBoard />} />
                <Route path="admin/school-profile" element={<SchoolProfileSettings />} />
                
                {/* Placeholder Routes for other roles */}
                <Route path="teacher/dashboard" element={<Dashboard />} />
                <Route path="student/dashboard" element={<Dashboard />} />
                
                {/* Fallback */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
