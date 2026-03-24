import React from 'react';
import { Upload, FileDown, CheckCircle2, MessageSquare, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepIndicator from '../../components/onboarding/StepIndicator';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';

const UploadBulkTeachers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { school_name, admin_name } = location.state || {};

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleCompleteSetup = async () => {
    if (!file) {
      setError("Please select a file to upload, or tap 'Skip' to proceed without uploading.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://lumi-api.artfricastudio.com/api/teachers/import', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to upload teachers file.');
      }

      navigate('/');
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "A network or server error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout>
      {/* Left Upload Section */}
      <div className="flex-1 lg:w-[55%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 w-full overflow-y-auto">
        <StepIndicator currentStep={3} totalSteps={3} title="Import Teachers" />

        {error && (
          <div className="mb-6 mt-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-[1rem] text-sm font-medium animate-in fade-in slide-in-from-top-2" role="alert">
             {error}
          </div>
        )}

        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
          {/* Drop Zone */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <div 
            onClick={handleUploadClick}
            className={`border-2 ${file ? 'border-emerald-500 bg-emerald-50/50 flex-row px-8' : 'border-dashed border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50 flex-col'} rounded-[2rem] py-10 flex items-center justify-center gap-6 transition-all cursor-pointer group shadow-sm`}
          >
            <div className={`flex items-center justify-center transition-transform ${file ? 'w-14 h-14 bg-white rounded-2xl text-emerald-600 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]' : 'w-16 h-16 bg-white rounded-full text-gray-400 group-hover:scale-110 shadow-sm'}`}>
              <Upload size={file ? 24 : 32} />
            </div>
            
            <div className={`${file ? 'text-left' : 'text-center'} space-y-1.5`}>
              <h3 className="text-[16px] font-bold text-gray-900">
                {file ? file.name : (school_name ? `${school_name} Staff` : 'Upload Faculty File')}
              </h3>
              <p className="text-[13px] text-gray-500 font-medium">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready to sync` : 'Drag & drop staff provisioning files here'}
              </p>
            </div>
          </div>

           {/* Validated Fields / Template */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-[1.5rem] border border-gray-100 shadow-inner">
             <div className="space-y-4 pr-4 border-r border-gray-200 border-dashed hidden sm:block">
               <h4 className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                 <FileDown size={16} className="text-gray-400" /> Faculty Template
               </h4>
               <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                 Download our specific template for departments and payroll mapping.
               </p>
               <button className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors">
                 Download CSV
               </button>
             </div>
             
             <div className="space-y-3">
                <h4 className="text-[13px] font-bold text-gray-900 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500 fill-green-50" /> Required Maps
                </h4>
                <ul className="space-y-2">
                  {['Employee ID', 'Full Name', 'Department'].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[12px] font-semibold text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" /> {f}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button 
              className="flex items-center gap-2 text-gray-400 font-bold text-[14px] hover:text-gray-900 transition-colors group pl-2"
              onClick={() => navigate('/onboarding/upload-students')}
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            
            <div className="flex items-center gap-4">
               <button 
                 onClick={handleSkip}
                 className="text-gray-400 font-bold text-[14px] hover:text-gray-900 transition-colors"
               >
                 Skip
               </button>
               <button 
                 onClick={handleCompleteSetup}
                 disabled={loading}
                 className={`flex items-center gap-2 py-4 px-6 rounded-full text-[15px] font-semibold text-white bg-[#111111] hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] ${loading ? 'opacity-75 cursor-wait' : ''}`}
               >
                 {loading ? 'Completing...' : 'Finish Setup'} <CheckCircle2 size={18} />
               </button>
             </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Section */}
      <div className="hidden lg:flex lg:w-[45%] ml-2 relative rounded-[2.2rem] bg-emerald-50 flex-col items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 left-0 p-12 text-emerald-200/40 opacity-30 transform -translate-x-12 -translate-y-8 -rotate-12 scale-150 pointer-events-none">
           <BookOpen size={280} />
        </div>

        <div className="relative z-10 w-full max-w-sm space-y-6">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm border border-emerald-50">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Access Verification
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
              To ensure roles are correctly mapped, verify that each teacher is linked to their proper <span className="text-emerald-700 font-bold">Department ID</span>. This ensures they receive correct class module permissions automatically.
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default UploadBulkTeachers;
