import React from 'react';
import { Upload, FileDown, CheckCircle2, MessageSquare, ArrowLeft, ArrowRight, Info, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/onboarding/StepIndicator';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';

const UploadBulkStudents = () => {
  const navigate = useNavigate();
  return (
    <OnboardingLayout>
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start w-full">
        {/* Left Upload Section */}
        <div className="flex-1 w-full max-w-2xl">
          <StepIndicator currentStep={2} totalSteps={3} title="Upload Bulk Students" />

          <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
            {/* Drop Zone */}
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-16 flex flex-col items-center justify-center space-y-8 hover:border-blue-400 hover:bg-blue-50/20 transition-all cursor-pointer group relative">
              <div className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Upload size={32} />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Students List Drop Zone</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Drag and drop your spreadsheet here, or browse your files to upload.
                </p>
              </div>

              <button className="bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all shadow-lg shadow-blue-200">
                Upload File
              </button>

              <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2"><CheckCircle2 size={12} /> CSV</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Excel (XLSX)</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Max 10MB</span>
              </div>
            </div>

            {/* Support Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sample Template */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 leading-tight">Sample Template</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  Don't have a file ready? Use our pre-formatted template to ensure all student data is correctly mapped to our institution's database.
                </p>
                <button className="flex items-center gap-2 text-blue-600 font-bold text-[11px] uppercase tracking-wider group">
                  <FileDown size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  Download CSV Template
                </button>
              </div>

              {/* Validated Fields */}
              <div className="bg-slate-50/50 rounded-[28px] p-8 border border-slate-100 space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-black text-[11px] uppercase tracking-wider">
                  <CheckCircle2 size={16} className="text-blue-600" />
                  Validated Fields
                </div>
                <ul className="space-y-2.5">
                  {['Full Legal Name', 'Date of Birth (YYYY-MM-DD)', 'Primary Email Address', 'Enrolled Course ID'].map((field, i) => (
                    <li key={i} className="text-[13px] text-slate-600 font-medium flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-100">
              <button 
                className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors group"
                onClick={() => navigate('/onboarding/school-details')}
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              <button 
                onClick={() => navigate('/onboarding/upload-teachers')}
                className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-xl shadow-slate-200"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Section */}
        <div className="w-full lg:w-[400px] space-y-8 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
          {/* Tip Card */}
          <div className="bg-[#fff1e7] rounded-[32px] p-8 border border-orange-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-orange-200 opacity-20 transform translate-x-4 -translate-y-4 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Info size={120} />
            </div>
            
            <div className="w-12 h-12 bg-orange-900 rounded-2xl flex items-center justify-center text-white mb-6 relative">
              <Info size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-orange-950 mb-4 relative">Institutional Tip</h3>
            <p className="text-sm text-orange-900/80 leading-relaxed mb-6 font-medium relative">
              Preparing your student list accurately is key to a smooth onboarding. Ensure there are no empty rows or duplicate email addresses. Our system will flag any inconsistencies before the final import.
            </p>
            
            <button className="flex items-center gap-2 text-orange-900 font-bold text-[11px] uppercase tracking-widest relative group">
              Read Best Practices
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Assistance Card */}
          <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 flex flex-col items-center text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">Need Assistance?</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Our registrar support team is available to help with bulk data migrations.
              </p>
            </div>

            <div className="flex -space-x-3 mb-2">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
              ].map((img, i) => (
                <img key={i} src={img} className="w-12 h-12 rounded-2xl border-4 border-white object-cover shadow-sm" alt="Support" />
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold text-[13px] hover:bg-slate-50 hover:border-slate-300 transition-all">
              <MessageSquare size={18} className="text-slate-400" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default UploadBulkStudents;
