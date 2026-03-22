import React, { useState } from 'react';
import { Camera, MapPin, Plus, ArrowRight, Lightbulb, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/onboarding/StepIndicator';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import schoolPreview from '../../assets/onboarding/school_building_preview.png';

const SchoolDetails = () => {
  const navigate = useNavigate();
  const [awards, setAwards] = useState(['Award Name 01', 'Award Name 02']);

  const addAward = () => setAwards([...awards, '']);

  return (
    <OnboardingLayout>
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start w-full">
        {/* Left Form Section */}
        <div className="flex-1 w-full max-w-2xl">
          <StepIndicator currentStep={1} totalSteps={3} title="School Details" />

          <form className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
            {/* School Logo Upload */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">School Logo</label>
              <div className="w-48 h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-white hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-2">
                  <Camera size={24} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600">Upload Branding</span>
              </div>
            </div>

            {/* School Name */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">School Name</label>
              <input 
                type="text" 
                placeholder="e.g. St. James International Academy"
                className="w-full px-5 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400"
              />
            </div>

            {/* Awards & Recognition */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Awards & Recognition</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {awards.map((award, idx) => (
                  <input 
                    key={idx}
                    type="text" 
                    placeholder="Award Name"
                    defaultValue={award}
                    className="w-full px-5 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400"
                  />
                ))}
              </div>
              <button 
                type="button" 
                onClick={addAward}
                className="flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-wider hover:gap-3 transition-all"
              >
                <Plus size={16} strokeWidth={3} />
                Add Another Award
              </button>
            </div>

            {/* School Location */}
            <div className="space-y-3 relative">
              <label className="text-sm font-bold text-slate-700">School Location(s)</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter primary campus address"
                  className="w-full pl-14 pr-5 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* School Description */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">School Description</label>
              <textarea 
                rows={5}
                placeholder="Tell us about your institution's history, mission, and values..."
                className="w-full px-6 py-5 bg-slate-100 border-none rounded-3xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-slate-900 font-medium placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="button"
              onClick={() => navigate('/onboarding/upload-students')}
              className="mt-8 flex items-center gap-3 bg-blue-700 text-white px-10 py-5 rounded-[20px] font-bold text-base hover:bg-blue-800 hover:shadow-2xl hover:shadow-blue-200 transition-all hover:-translate-y-1 active:translate-y-0 group"
            >
              Next (Optional)
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} strokeWidth={2.5} />
            </button>
          </form>
        </div>

        {/* Right Info Section */}
        <div className="w-full lg:w-[400px] space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
          {/* Tip Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-50">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-4">Institutional Tip</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
              A clear and compelling description helps parents and students understand your school's unique pedagogical approach. Focus on your <span className="text-blue-600 font-bold underline decoration-2 underline-offset-4">Key Differentiators</span>.
            </p>
            
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 group cursor-pointer">
                <img 
                  src={schoolPreview} 
                  alt="School Preview" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Trust Factor Card */}
          <div className="bg-[#fff1f1] rounded-[24px] p-6 flex items-start gap-4 border border-rose-100 transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-200">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-[13px] font-black text-rose-900 uppercase tracking-wider mb-1">Trust Factor</h4>
              <p className="text-[12px] italic text-rose-800/80 leading-relaxed">
                "90% of applicants choose schools with a complete profile."
              </p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SchoolDetails;
