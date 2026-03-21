import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import RegisterSchool from './pages/RegisterSchool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-school" element={<RegisterSchool />} />
        
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
