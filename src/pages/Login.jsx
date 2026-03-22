import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { School, ArrowLeft, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // State Machine
  const [step, setStep] = useState(1); // 1 = Email, 2 = Workspace, 3 = Password
  
  // Form Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://lumi-api.artfricastudio.com/api/auth/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'No account found with that email.');
      }

      const activeSchools = data.schools || [];

      if (activeSchools.length === 0) {
        throw new Error('No workspaces linked to this email.');
      } else if (activeSchools.length === 1) {
        setSelectedSchool(activeSchools[0]);
        setStep(3);
      } else {
        setSchools(activeSchools);
        setStep(2);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
    setError(null);
    setStep(3);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!selectedSchool || !selectedSchool.school_slug) {
         throw new Error("Invalid workspace configuration");
      }

      const response = await fetch(`https://lumi-api.artfricastudio.com/api/schools/${selectedSchool.school_slug}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed. Please check your password.');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Role-based routing
      const role = data.user?.role?.toLowerCase();
      const slug = selectedSchool.school_slug;
      
      if (role === 'admin') navigate(`/${slug}/admin/dashboard`);
      else if (role === 'teacher') navigate(`/${slug}/teacher/dashboard`);
      else if (role === 'student') navigate(`/${slug}/student/dashboard`);
      else navigate(`/${slug}/admin/dashboard`); // fallback destination

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step === 3 && schools.length > 1) {
      setStep(2);
      setSelectedSchool(null);
      setPassword('');
      setError(null);
    } else {
      setStep(1);
      setSchools([]);
      setSelectedSchool(null);
      setPassword('');
      setError(null);
    }
  };

  // View switch renderers
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] p-4 sm:p-8 font-sans">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white/40 p-3 sm:p-5 relative">

          {/* Left Side: Form Logic */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 overflow-hidden min-h-[500px]">
            
            {/* Step 1: Email Lookup */}
            <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-center ${step === 1 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-[120%] pointer-events-none'}`}>
              <h2 className="text-[2rem] font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
              <p className="text-gray-500 mb-8 text-sm">Enter your email to sign in to your workspace</p>

              {error && step === 1 && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-[1rem] text-sm font-medium animate-in fade-in slide-in-from-top-2" role="alert">
                   {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleEmailSubmit}>
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-full text-[15px] font-semibold text-white bg-[#111111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Searching...' : 'Continue'} <ArrowRight size={18} />
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6 pt-4">
                Don't have an account? {' '}
                <Link to="/register-school" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Register Domain
                </Link>
              </p>
            </div>


            {/* Step 2: Workspace Selection */}
            <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-start overflow-y-auto ${step === 2 ? 'opacity-100 translate-x-0 pointer-events-auto' : step < 2 ? 'opacity-0 translate-x-[120%] pointer-events-none' : 'opacity-0 -translate-x-[120%] pointer-events-none'}`}>
              <button 
                onClick={goBack} 
                className="self-start text-gray-400 hover:text-gray-900 transition-colors mb-6 p-2 -ml-2 rounded-full hover:bg-gray-50 inline-flex items-center"
              >
                <ArrowLeft size={20} />
              </button>
              
              <h2 className="text-[1.8rem] font-bold text-gray-900 mb-2 tracking-tight">Select Workspace</h2>
              <p className="text-gray-500 mb-6 text-sm">You have access to multiple schools</p>

              <div className="flex flex-col gap-3">
                {schools.map((school, index) => (
                   <button
                     key={school.school_id || index}
                     onClick={() => handleSchoolSelect(school)}
                     className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 group text-left"
                   >
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                          <Building2 size={20} />
                       </div>
                       <div>
                         <h3 className="font-bold text-gray-900 text-[15px] leading-snug">{school.school_name}</h3>
                         <p className="text-[12px] text-gray-400 font-medium">lumi-ed.artfricastudio.com/{school.school_slug}</p>
                       </div>
                     </div>
                     <ArrowRight size={18} className="text-gray-300 group-hover:text-gray-900 transition-colors transform group-hover:translate-x-1" />
                   </button>
                ))}
              </div>
            </div>


            {/* Step 3: Password Entry */}
            <div className={`transition-all duration-500 absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-center ${step === 3 ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-[120%] pointer-events-none'}`}>
              <button 
                onClick={goBack} 
                className="self-start text-gray-400 hover:text-gray-900 transition-colors mb-6 p-2 -ml-2 rounded-full hover:bg-gray-50 inline-flex items-center"
              >
                <ArrowLeft size={20} />
              </button>
              
              <h2 className="text-[2rem] font-bold text-gray-900 mb-2 tracking-tight">Enter Password</h2>
              <p className="text-gray-500 mb-6 text-sm flex items-center gap-1.5 flex-wrap">
                Signing in to <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md text-[13px]">{selectedSchool?.school_name}</span> as <span className="font-medium text-gray-700">{email}</span>
              </p>

              {error && step === 3 && (
                <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-[1rem] text-sm font-medium animate-in fade-in slide-in-from-top-2" role="alert">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center items-center gap-2 py-4 px-4 rounded-full text-[15px] font-semibold text-white bg-[#111111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Authenticating...' : 'Sign in to workspace'} <CheckCircle2 size={18} />
                </button>
              </form>
            </div>

          </div>

          {/* Right Side: Image/Branding */}
          <div className="hidden md:flex w-1/2 ml-4 relative rounded-[2rem] bg-indigo-50 items-start justify-start overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
              alt="Student smiling"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent"></div>

            <div className="relative z-10 p-8 flex items-center transition-all duration-500">
              <School className="w-8 h-8 text-[#FF9E00] mr-3 drop-shadow-md fill-current" />
              <span className="text-white font-bold text-2xl drop-shadow-md tracking-tight">Lumi Ed</span>
            </div>
            
            {/* Cool Workspace Badge transition */}
            <div className={`absolute bottom-8 right-8 z-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${selectedSchool ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
              <div className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-blue shadow-sm">
                    <Building2 size={20} />
                 </div>
                 <div className="text-white">
                    <p className="text-[11px] font-medium opacity-80 uppercase tracking-widest mb-0.5">Active Workspace</p>
                    <p className="text-[15px] font-bold leading-none">{selectedSchool?.school_name}</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
