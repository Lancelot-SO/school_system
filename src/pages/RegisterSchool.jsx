import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { School } from 'lucide-react';

const RegisterSchool = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school_name: '',
    school_slug: '',
    admin_name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/schools/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed. Please try again.');
      }

      setSuccess(true);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] p-4 sm:p-8 font-sans">
        {/* Main Glass/Shadow Container */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white/40 p-3 sm:p-5 relative">

          {/* Left Side: Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
            <h2 className="text-[2rem] font-bold text-gray-900 mb-2 tracking-tight">Sign up</h2>
            <p className="text-gray-500 mb-8 text-sm">Register your school to get started</p>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-[1rem] text-sm font-medium" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-[1rem] text-sm font-medium" role="alert">
                Registration successful! Redirecting to dashboard...
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    id="school_name"
                    name="school_name"
                    type="text"
                    placeholder="School Name"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={formData.school_name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    id="school_slug"
                    name="school_slug"
                    type="text"
                    placeholder="School Slug (URL)"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={formData.school_slug}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    id="admin_name"
                    name="admin_name"
                    type="text"
                    placeholder="Admin Full Name"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={formData.admin_name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    required
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-4 px-4 rounded-full text-[15px] font-semibold text-white bg-[#111111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6 pt-4">
                Do you have an account? {' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Login
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side: Image/Branding */}
          <div className="hidden md:flex w-1/2 ml-4 relative rounded-[2rem] bg-blue-100 items-start justify-start overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
              alt="Student smiling"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent"></div>

            <div className="relative z-10 p-8 flex items-center">
              <School className="w-8 h-8 text-[#FF9E00] mr-3 drop-shadow-md fill-current" />
              <span className="text-white font-bold text-2xl drop-shadow-md tracking-tight">Lumi Ed</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default RegisterSchool;
