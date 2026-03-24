import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, Plus, ArrowRight, Lightbulb, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepIndicator from '../../components/onboarding/StepIndicator';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';

const SchoolDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { school_name: initialSchoolName, admin_name } = location.state || {};

  const [awards, setAwards] = useState(['']);
  const [formData, setFormData] = useState({
    school_name: initialSchoolName || '',
    school_location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSchoolProfile = async () => {
      try {
        const response = await fetch('https://lumi-api.artfricastudio.com/api/school/profile', {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const p = data.data || data;
          
          setFormData(prev => ({
            ...prev,
            school_name: p.school_name || p.name || prev.school_name,
            school_location: p.school_location || p.location || prev.school_location,
            description: p.description || prev.description
          }));
          
          if (p.awards && Array.isArray(p.awards) && p.awards.length > 0) {
            setAwards(p.awards.map(a => typeof a === 'object' ? a.name : a));
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial setup data:", err);
      }
    };
    
    fetchSchoolProfile();
  }, []);

  const logoInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const handleLogoUploadClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const addAward = () => setAwards([...awards, '']);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAwardChange = (idx, val) => {
    const newAwards = [...awards];
    newAwards[idx] = val;
    setAwards(newAwards);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const submitData = new FormData();
      submitData.append('school_name', formData.school_name);
      submitData.append('school_location', formData.school_location);
      submitData.append('description', formData.description);
      
      const filteredAwards = awards.filter(a => a.trim() !== '');
      filteredAwards.forEach((award, index) => {
        submitData.append(`awards[${index}]`, award);
      });
      
      if (logoFile) {
        submitData.append('logo', logoFile);
      }

      // Laravel expects PUT for this route, but PHP drops multipart/form-data files sent over raw PUT.
      // The secure workaround is to POST the binary data and pass '_method=PUT' to trigger Laravel's method spoofing.
      submitData.append('_method', 'PUT');

      const response = await fetch('https://lumi-api.artfricastudio.com/api/school/profile', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: submitData
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to sync school profile.');
      }

      navigate('/onboarding/upload-students', { state: { school_name: formData.school_name, admin_name } });
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "A network or server error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout>
      {/* Left Form Section */}
      <div className="flex-1 lg:w-[55%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 w-full overflow-y-auto">
        <StepIndicator currentStep={1} totalSteps={3} title="School Profile" />

        {error && (
          <div className="mb-6 mt-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-[1rem] text-sm font-medium animate-in fade-in slide-in-from-top-2" role="alert">
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
          {/* School Logo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">Institutional Logo</label>
            <input 
              type="file" 
              ref={logoInputRef} 
              onChange={handleLogoChange} 
              className="hidden" 
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />
            <div 
              onClick={handleLogoUploadClick}
              className="w-40 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group relative overflow-hidden"
            >
              {logoPreview ? (
                 <img src={logoPreview} alt="Logo preview" className="absolute inset-0 w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
              ) : null}
              <div className={`w-10 h-10 ${logoPreview ? 'bg-white/80 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'} rounded-full flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-all mb-1.5 relative z-10`}>
                <Camera size={20} />
              </div>
              <span className={`text-[10px] font-bold ${logoPreview ? 'text-gray-800 bg-white/80 px-2 rounded-full backdrop-blur-sm' : 'text-gray-400'} uppercase tracking-widest group-hover:text-blue-600 relative z-10`}>
                {logoPreview ? 'Change Logo' : 'Upload Logo'}
              </span>
            </div>
          </div>

          {/* School Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">School Name</label>
            <input 
              type="text" 
              name="school_name"
              value={formData.school_name}
              onChange={handleInputChange}
              required
              placeholder="e.g. St. James Academy"
              className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* School Location */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Primary Campus</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                  <input 
                    type="text" 
                    name="school_location"
                    value={formData.school_location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    className="appearance-none block w-full pl-12 pr-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Awards Header */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1 flex justify-between items-center mr-2">
                  Awards
                  <button type="button" onClick={addAward} className="text-blue-600 hover:text-blue-800 p-1">
                    <Plus size={16} strokeWidth={3} />
                  </button>
                </label>
                {awards.map((award, idx) => (
                  <input 
                    key={idx}
                    type="text" 
                    placeholder="e.g. Blue Ribbon 2023"
                    value={award}
                    onChange={(e) => handleAwardChange(idx, e.target.value)}
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 mb-2"
                  />
                ))}
              </div>
          </div>

          {/* School Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">Mission & Values</label>
            <textarea 
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell us about your institution's history, mission, and distinct pedagogical approaches..."
              className="appearance-none block w-full px-5 py-4 border border-gray-200/80 rounded-3xl text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
             <button 
               type="submit"
               disabled={loading}
               className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-full text-[15px] font-semibold text-white bg-[#111111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
             >
               {loading ? 'Saving Profile...' : 'Next Step'} <ArrowRight size={18} />
             </button>
          </div>
        </form>
      </div>

      {/* Right Info Section */}
      <div className="hidden lg:flex lg:w-[45%] ml-2 relative rounded-[2.2rem] bg-indigo-50 flex-col items-center justify-center p-12 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 p-12 text-indigo-200/40 opacity-30 transform translate-x-12 -translate-y-8 rotate-12 scale-150 pointer-events-none">
           <ShieldCheck size={280} />
        </div>

        <div className="relative z-10 w-full max-w-sm space-y-8">
          {/* Tip Card */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-blue-50">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">
              {admin_name ? `Welcome, ${admin_name}!` : 'Onboarding Tip'}
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
              A clear and compelling portfolio helps align your staff and faculty seamlessly. Ensure your <span className="text-blue-600 font-bold underline decoration-2 underline-offset-4">branding and mottos</span> accurately reflect your school's vision.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white flex items-center gap-4 shadow-sm group cursor-pointer transition-all hover:bg-white/80">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
               <ShieldCheck size={20} />
            </div>
            <div>
               <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-wider mb-0.5">Trust Factor</h4>
               <p className="text-[12px] text-gray-500 font-medium">Verified domains get prioritized support routing.</p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SchoolDetails;
