import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Settings, 
  Bell, 
  Calendar as CalendarIcon, 
  ChevronDown,
  Upload,
  Phone,
  Mail,
  MoreVertical,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    studentId: 'S-2111',
    fullName: 'Olivia Bennett',
    dob: '2023-08-21',
    gender: 'Female',
    admissionNumber: 'ADM-1009',
    class: '7',
    section: 'B',
    enrollmentDate: '2035-03-05',
    previousSchool: '',
    email: 'olivia.bennett@student.studix.org',
    phone: '7900 112233',
    address: '',
    fatherName: 'Henry Bennett',
    fatherPhone: '7900 112233',
    motherName: 'Laura Bennett',
    motherPhone: '7900 112233',
    guardianName: 'Amelie Reese',
    guardianRelation: 'Aunt',
    guardianPhone: '7933 556677',
    hobbies: 'Painting, Robotics, and Reading Novels',
    specialNeeds: false,
    medicalCondition: true,
    medicalDetails: 'Mild asthma - requires inhaler during sports activities'
  });

  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-blue tracking-tight">Add New Student</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-sky-500">Students</span>
              <span>/</span>
              <span>Add New Student</span>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-blue transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search anything" 
              className="pl-12 pr-4 py-2.5 bg-white border border-transparent rounded-[18px] text-sm focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all w-64 shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-primary-blue shadow-sm border border-transparent hover:border-gray-100 transition-all">
            <Settings size={20} />
          </button>
          <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-primary-blue shadow-sm border border-transparent hover:border-gray-100 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-pink rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-extrabold text-primary-blue leading-none">Oscar Hansen</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Admin</p>
            </div>
            <img src="https://i.pravatar.cc/150?u=oscar" alt="Admin" className="w-10 h-10 rounded-xl object-cover shadow-sm border border-gray-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Personal Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Student ID</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.studentId}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none grayscale opacity-60 cursor-not-allowed"
                  />
                  <span className="text-[10px] font-bold text-gray-400 absolute -bottom-5 left-0">Auto-Generated</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date of Birth</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.dob}
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all appearance-none"
                  />
                  <CalendarIcon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8 mt-10">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Gender</label>
              <div className="flex items-center gap-4">
                <button 
                  className={`flex-1 flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all font-extrabold text-[13px] ${formData.gender === 'Male' ? 'bg-promo-bg border-sky-200 text-primary-blue' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                  onClick={() => setFormData({...formData, gender: 'Male'})}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.gender === 'Male' ? 'border-sky-500 bg-white' : 'border-gray-200'}`}>
                    {formData.gender === 'Male' && <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>}
                  </div>
                  Male
                </button>
                <button 
                  className={`flex-1 flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all font-extrabold text-[13px] ${formData.gender === 'Female' ? 'bg-sidebar-active border-purple-200 text-primary-blue shadow-sm shadow-purple-100' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                  onClick={() => setFormData({...formData, gender: 'Female'})}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.gender === 'Female' ? 'border-primary-pink bg-white' : 'border-gray-200'}`}>
                    {formData.gender === 'Female' && <div className="w-1.5 h-1.5 bg-primary-pink rounded-full"></div>}
                  </div>
                  Female
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-10">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Profile Photo</label>
              <div className="w-full border-2 border-dashed border-sky-200 rounded-[32px] p-10 flex flex-col items-center justify-center bg-sky-50/20 group cursor-pointer hover:bg-sky-50/40 transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm mb-4">
                  <Upload size={24} />
                </div>
                <p className="text-[14px] font-extrabold text-sky-600 mb-1">Click or drag to upload</p>
                <p className="text-[11px] font-bold text-gray-400">Upload a recent passport-size photo (Max: 2MB, JPG/PNG)</p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={formData.email}
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all"
                  />
                  <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                <div className="flex items-center">
                  <div className="relative shrink-0">
                    <select className="appearance-none bg-gray-50 border border-gray-100 rounded-l-2xl py-3 pl-4 pr-10 text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 transition-all h-[46px] border-r-0">
                      <option>+44</option>
                      <option>+1</option>
                      <option>+91</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <input 
                    type="text" 
                    value={formData.phone}
                    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-r-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 h-[46px] transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Address</label>
              <textarea 
                rows="2"
                placeholder="Street, City, State, ZIP"
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all resize-none"
              ></textarea>
            </div>
          </section>

          {/* Parent/Guardian Info */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Parent/Guardian Info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Father */}
              <div className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-50">
                <h3 className="text-[14px] font-extrabold text-primary-blue mb-6">Father</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Name</label>
                    <input 
                      type="text" 
                      value={formData.fatherName}
                      className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-extrabold text-primary-blue focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                    <div className="flex border border-gray-100 rounded-xl overflow-hidden">
                      <div className="relative shrink-0 border-r border-gray-100 bg-gray-50/30">
                        <select className="appearance-none py-2.5 pl-3 pr-8 text-[12px] font-extrabold text-primary-blue focus:outline-none">
                          <option>+44</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.fatherPhone}
                        className="w-full px-4 py-2.5 bg-white text-[12px] font-extrabold text-primary-blue focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mother */}
              <div className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-50">
                <h3 className="text-[14px] font-extrabold text-primary-blue mb-6">Mother</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Name</label>
                    <input 
                      type="text" 
                      value={formData.motherName}
                      className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-extrabold text-primary-blue focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                    <div className="flex border border-gray-100 rounded-xl overflow-hidden">
                      <div className="relative shrink-0 border-r border-gray-100 bg-gray-50/30">
                        <select className="appearance-none py-2.5 pl-3 pr-8 text-[12px] font-extrabold text-primary-blue focus:outline-none">
                          <option>+44</option>
                        </select>
                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.motherPhone}
                        className="w-full px-4 py-2.5 bg-white text-[12px] font-extrabold text-primary-blue focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Guardian */}
            <div className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-50">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-[14px] font-extrabold text-primary-blue">Alternative Guardian</h3>
                <span className="text-[11px] font-bold text-gray-400">(If Any)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Name</label>
                  <input 
                    type="text" 
                    value={formData.guardianName}
                    className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-extrabold text-primary-blue focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Relation</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-extrabold text-primary-blue focus:outline-none appearance-none">
                      <option>{formData.guardianRelation}</option>
                      <option>Uncle</option>
                      <option>Grandparent</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                  <div className="flex border border-gray-100 rounded-xl overflow-hidden">
                    <div className="relative shrink-0 border-r border-gray-100 bg-gray-50/30">
                      <select className="appearance-none py-2.5 pl-3 pr-8 text-[12px] font-extrabold text-primary-blue focus:outline-none">
                        <option>+44</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      value={formData.guardianPhone}
                      className="w-full px-4 py-2.5 bg-white text-[12px] font-extrabold text-primary-blue focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Administration */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Administration</h2>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Admission Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.admissionNumber}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none grayscale opacity-60 cursor-not-allowed"
                />
                <span className="text-[10px] font-bold text-gray-400 absolute -bottom-5 left-0">Auto-Generated</span>
              </div>
            </div>
          </section>

          {/* Academic Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Academic Information</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Class</label>
                <div className="relative">
                  <select 
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 text-[13px] font-bold text-gray-700 focus:ring-1 focus:ring-primary-pink/20 outline-none mt-2 transition-all cursor-pointer"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  >
                    <option>{formData.class}</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Section</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none appearance-none">
                    <option>{formData.section}</option>
                    <option>A</option>
                    <option>C</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8 mt-10">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Enrollment Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={formData.enrollmentDate}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none appearance-none"
                />
                <CalendarIcon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-10">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Previous School</label>
              <input 
                type="text" 
                placeholder="e.g., Greenfield Junior High"
                className="w-full px-4 py-3 bg-white border border-pink-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-primary-pink focus:ring-4 focus:ring-pink-50 transition-all"
              />
              <span className="text-[10px] font-bold text-primary-pink mt-1 italic">Previous school cannot be empty</span>
            </div>
          </section>

          {/* Additional Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Additional Information</h2>
            
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Hobbies / Interests</label>
              <input 
                type="text" 
                value={formData.hobbies}
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-extrabold text-gray-500">Special Needs Support</label>
                <button 
                  onClick={() => setFormData({...formData, specialNeeds: !formData.specialNeeds})}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${formData.specialNeeds ? 'bg-primary-blue' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute ${formData.specialNeeds ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-[12px] font-extrabold text-gray-500">Medical Condition Alert</label>
                <button 
                  onClick={() => setFormData({...formData, medicalCondition: !formData.medicalCondition})}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${formData.medicalCondition ? 'bg-primary-blue' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute ${formData.medicalCondition ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              {formData.medicalCondition && (
                <textarea 
                  value={formData.medicalDetails}
                  rows="3"
                  className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-[24px] text-[12px] font-bold text-gray-500 leading-relaxed focus:outline-none"
                ></textarea>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Footer Area */}
      <footer className="mt-12 pt-12 border-t border-gray-100 px-8 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <button className="text-[13px] font-extrabold text-sky-600 hover:text-sky-700 underline underline-offset-4 decoration-sky-200 transition-colors">
            Save as Draft
          </button>
          
          <div className="flex items-center gap-4">
            <button className="px-8 py-3.5 bg-sky-50 text-sky-600 rounded-[18px] text-[14px] font-extrabold hover:bg-sky-100 transition-all active:scale-95 shadow-sm shadow-sky-100/50">
              Cancel
            </button>
            <button className="px-8 py-3.5 bg-promo-btn text-primary-pink rounded-[18px] text-[14px] font-extrabold hover:brightness-95 transition-all active:scale-95 shadow-sm shadow-pink-100/50">
              Save & Add Student
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-t border-gray-50/50 pt-8 mt-4">
          <p className="text-[12px] font-bold text-gray-400">Copyright © 2025 Peterdraw</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Term and conditions', 'Contact'].map(link => (
              <a key={link} href="#" className="text-[12px] font-bold text-gray-400 hover:text-primary-blue transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <button key={i} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-primary-blue hover:text-white transition-all shadow-sm">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AddStudent;
