import React, { useState, useRef } from 'react';
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
  Linkedin,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE = 'https://lumi-api.artfricastudio.com/api';

const AddTeacher = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone_country_code: '+233',
    phone: '',
    address: '',
    department: '',
    designation: '',
    joining_date: '',
    qualification: '',
    specialization: '',
    medical_condition_alert: false,
    medical_condition_details: '',
    status: 'active'
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: '', relation: '', phone_country_code: '+233', phone: '' }
  ]);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setToast({ type: 'error', message: 'Photo must be under 2MB' });
        return;
      }
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEmergencyChange = (index, field, value) => {
    setEmergencyContacts(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addEmergencyContact = () => {
    setEmergencyContacts(prev => [...prev, { name: '', relation: '', phone_country_code: '+233', phone: '' }]);
  };

  const removeEmergencyContact = (index) => {
    if (emergencyContacts.length === 1) return;
    setEmergencyContacts(prev => prev.filter((_, i) => i !== index));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.joining_date) newErrors.joining_date = 'Joining date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showToast('error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const token = localStorage.getItem('token');
      
      const body = new FormData();
      
      // Append all form fields
      body.append('full_name', formData.full_name);
      body.append('email', formData.email);
      body.append('gender', formData.gender.toLowerCase());
      body.append('phone_country_code', formData.phone_country_code);
      body.append('phone', formData.phone);
      body.append('status', formData.status);
      body.append('department', formData.department);
      body.append('designation', formData.designation);
      body.append('joining_date', formData.joining_date);
      body.append('medical_condition_alert', formData.medical_condition_alert ? '1' : '0');
      
      if (formData.date_of_birth) body.append('date_of_birth', formData.date_of_birth);
      if (formData.address) body.append('address', formData.address);
      if (formData.qualification) body.append('qualification', formData.qualification);
      if (formData.specialization) body.append('specialization', formData.specialization);
      if (formData.medical_condition_alert && formData.medical_condition_details) {
        body.append('medical_condition_details', formData.medical_condition_details);
      }

      // Append profile photo
      if (profilePhoto) {
        body.append('profile_photo', profilePhoto);
      }

      // Append emergency contacts
      emergencyContacts.forEach((contact, index) => {
        if (contact.name.trim()) {
          body.append(`emergency_contacts[${index}][name]`, contact.name);
          body.append(`emergency_contacts[${index}][relation]`, contact.relation);
          body.append(`emergency_contacts[${index}][phone_country_code]`, contact.phone_country_code);
          body.append(`emergency_contacts[${index}][phone]`, contact.phone);
        }
      });

      const response = await fetch(`${API_BASE}/teachers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body
      });

      const data = await response.json();

      if (response.ok) {
        showToast('success', 'Teacher added successfully!');
        setTimeout(() => navigate('../teachers'), 1500);
      } else if (response.status === 422) {
        // Validation errors from API
        const apiErrors = {};
        if (data.errors) {
          Object.entries(data.errors).forEach(([key, messages]) => {
            apiErrors[key] = Array.isArray(messages) ? messages[0] : messages;
          });
        }
        setErrors(apiErrors);
        showToast('error', data.message || 'Validation failed. Please check the fields.');
      } else {
        showToast('error', data.message || 'Failed to add teacher. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit teacher:', err);
      showToast('error', 'Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) => `w-full px-4 py-3 bg-white border ${errors[field] ? 'border-red-300 ring-2 ring-red-50' : 'border-gray-100'} rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all`;

  const countryCodes = [
    { code: '+233', label: '🇬🇭 +233' },
    { code: '+44', label: '🇬🇧 +44' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+91', label: '🇮🇳 +91' },
    { code: '+234', label: '🇳🇬 +234' },
    { code: '+254', label: '🇰🇪 +254' },
    { code: '+27', label: '🇿🇦 +27' },
    { code: '+61', label: '🇦🇺 +61' },
  ];

  return (
    <div className="flex flex-col gap-6 py-6 animate-in fade-in duration-500 overflow-x-hidden pb-24 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all animate-in slide-in-from-top-2 duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="text-[13px] font-extrabold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 p-1 rounded-full hover:bg-white/50 transition-colors">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="../teachers" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-blue tracking-tight">Add New Teacher</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-sky-500">Teachers</span>
              <span>/</span>
              <span>Add New Teacher</span>
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
              <p className="text-xs font-extrabold text-primary-blue leading-none">Admin User</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Admin</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 uppercase font-bold border border-gray-50 shadow-sm">
              AU
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Personal Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.full_name}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  placeholder="Enter full name"
                  className={inputClass('full_name')}
                />
                {errors.full_name && <span className="text-[10px] font-bold text-red-400">{errors.full_name}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date of Birth</label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={formData.date_of_birth}
                    onChange={(e) => handleChange('date_of_birth', e.target.value)}
                    className={inputClass('date_of_birth') + ' appearance-none'}
                  />
                  <CalendarIcon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Gender <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-4">
                <button 
                  className={`flex-1 flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all font-extrabold text-[13px] ${formData.gender === 'Male' ? 'bg-promo-bg border-sky-200 text-primary-blue' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                  onClick={() => handleChange('gender', 'Male')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.gender === 'Male' ? 'border-sky-500 bg-white' : 'border-gray-200'}`}>
                    {formData.gender === 'Male' && <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>}
                  </div>
                  Male
                </button>
                <button 
                  className={`flex-1 flex items-center gap-3 px-6 py-3.5 rounded-2xl border transition-all font-extrabold text-[13px] ${formData.gender === 'Female' ? 'bg-sidebar-active border-purple-200 text-primary-blue shadow-sm shadow-purple-100' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                  onClick={() => handleChange('gender', 'Female')}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.gender === 'Female' ? 'border-primary-pink bg-white' : 'border-gray-200'}`}>
                    {formData.gender === 'Female' && <div className="w-1.5 h-1.5 bg-primary-pink rounded-full"></div>}
                  </div>
                  Female
                </button>
              </div>
              {errors.gender && <span className="text-[10px] font-bold text-red-400">{errors.gender}</span>}
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Profile Photo</label>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-sky-200 rounded-[32px] p-10 flex flex-col items-center justify-center bg-sky-50/20 group cursor-pointer hover:bg-sky-50/40 transition-all"
              >
                {photoPreview ? (
                  <div className="flex flex-col items-center gap-4">
                    <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-lg" />
                    <p className="text-[12px] font-bold text-sky-600">Click to change photo</p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="text-[14px] font-extrabold text-sky-600 mb-1">Click or drag to upload</p>
                    <p className="text-[11px] font-bold text-gray-400">Upload a recent passport-size photo (Max: 2MB, JPG/PNG)</p>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="jane.doe@school.edu"
                    className={inputClass('email')}
                  />
                  <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.email && <span className="text-[10px] font-bold text-red-400">{errors.email}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center">
                  <div className="relative shrink-0">
                    <select 
                      value={formData.phone_country_code}
                      onChange={(e) => handleChange('phone_country_code', e.target.value)}
                      className="appearance-none bg-gray-50 border border-gray-100 rounded-l-2xl py-3 pl-4 pr-10 text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 transition-all h-[46px] border-r-0 cursor-pointer"
                    >
                      {countryCodes.map(cc => (
                        <option key={cc.code} value={cc.code}>{cc.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="XX XXXX XXXX"
                    className={`w-full px-4 py-3 bg-white border ${errors.phone ? 'border-red-300' : 'border-gray-100'} rounded-r-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 h-[46px] transition-all`}
                  />
                </div>
                {errors.phone && <span className="text-[10px] font-bold text-red-400">{errors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Address</label>
              <textarea 
                rows="2"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Street, City, State, ZIP"
                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all resize-none"
              ></textarea>
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-extrabold text-primary-blue">Emergency Contacts</h2>
              <button 
                onClick={addEmergencyContact}
                className="flex items-center gap-1.5 text-[11px] font-extrabold text-sky-600 bg-sky-50 px-4 py-2 rounded-xl hover:bg-sky-100 transition-colors border border-sky-100"
              >
                <Plus size={14} />
                Add Contact
              </button>
            </div>
            
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-50 relative group">
                  {emergencyContacts.length > 1 && (
                    <button 
                      onClick={() => removeEmergencyContact(index)}
                      className="absolute top-4 right-4 p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Name</label>
                      <input 
                        type="text" 
                        value={contact.name}
                        onChange={(e) => handleEmergencyChange(index, 'name', e.target.value)}
                        placeholder="Contact name"
                        className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-extrabold text-primary-blue focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Relation</label>
                      <div className="relative">
                        <select 
                          value={contact.relation}
                          onChange={(e) => handleEmergencyChange(index, 'relation', e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-extrabold text-primary-blue focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="">Select...</option>
                          <option>Husband</option>
                          <option>Wife</option>
                          <option>Parent</option>
                          <option>Sibling</option>
                          <option>Friend</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</label>
                      <div className="flex border border-gray-100 rounded-xl overflow-hidden bg-white">
                        <div className="relative shrink-0 border-r border-gray-100 bg-gray-50/30">
                          <select 
                            value={contact.phone_country_code}
                            onChange={(e) => handleEmergencyChange(index, 'phone_country_code', e.target.value)}
                            className="appearance-none py-2.5 pl-3 pr-8 text-[12px] font-extrabold text-primary-blue focus:outline-none cursor-pointer text-center"
                          >
                            {countryCodes.map(cc => (
                              <option key={cc.code} value={cc.code}>{cc.code}</option>
                            ))}
                          </select>
                          <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <input 
                          type="text" 
                          value={contact.phone}
                          onChange={(e) => handleEmergencyChange(index, 'phone', e.target.value)}
                          placeholder="Phone number"
                          className="w-full px-4 py-2.5 text-[12px] font-extrabold text-primary-blue focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Status */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-6">Status</h2>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Teacher Status</label>
              <div className="relative">
                <select 
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3.5 text-[13px] font-bold text-gray-700 outline-none transition-all cursor-pointer appearance-none focus:ring-2 focus:ring-sky-100"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </section>

          {/* Professional Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-8">Professional Info</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Department <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select 
                    className={`w-full bg-gray-50 border ${errors.department ? 'border-red-300' : 'border-transparent'} rounded-xl px-4 py-3.5 text-[13px] font-bold text-gray-700 outline-none mt-2 transition-all cursor-pointer appearance-none focus:ring-2 focus:ring-sky-100`}
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                    <option>Physical Education</option>
                    <option>Arts</option>
                    <option>ICT</option>
                    <option>French</option>
                    <option>Social Studies</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {errors.department && <span className="text-[10px] font-bold text-red-400">{errors.department}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Designation <span className="text-red-400">*</span>
                </label>
                <div className="relative mt-2">
                  <select 
                    className={`w-full px-4 py-3 bg-white border ${errors.designation ? 'border-red-300' : 'border-gray-100'} rounded-2xl text-[13px] font-extrabold text-primary-blue focus:outline-none appearance-none cursor-pointer focus:border-sky-200 focus:ring-4 focus:ring-sky-50 transition-all`}
                    value={formData.designation}
                    onChange={(e) => handleChange('designation', e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option>Teacher</option>
                    <option>Senior Teacher</option>
                    <option>Head of Department</option>
                    <option>Assistant Teacher</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {errors.designation && <span className="text-[10px] font-bold text-red-400">{errors.designation}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8 mt-10">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Joining Date <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input 
                  type="date" 
                  value={formData.joining_date}
                  onChange={(e) => handleChange('joining_date', e.target.value)}
                  className={inputClass('joining_date') + ' appearance-none'}
                />
                <CalendarIcon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.joining_date && <span className="text-[10px] font-bold text-red-400">{errors.joining_date}</span>}
            </div>

            <div className="flex flex-col gap-2 mt-10">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Qualification</label>
              <input 
                type="text" 
                value={formData.qualification}
                onChange={(e) => handleChange('qualification', e.target.value)}
                placeholder="e.g., BSc., M.Ed"
                className={inputClass('qualification')}
              />
            </div>
            
            <div className="flex flex-col gap-2 mt-8">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Specialization</label>
              <input 
                type="text" 
                value={formData.specialization}
                onChange={(e) => handleChange('specialization', e.target.value)}
                placeholder="e.g., Algebra & Calculus"
                className={inputClass('specialization')}
              />
            </div>
          </section>

          {/* Health Information */}
          <section className="bg-white rounded-[40px] p-8 shadow-sm border border-white">
            <h2 className="text-lg font-extrabold text-primary-blue mb-6">Health Info</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-extrabold text-gray-500">Medical Condition Alert</label>
                <button 
                  onClick={() => handleChange('medical_condition_alert', !formData.medical_condition_alert)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center shrink-0 ${formData.medical_condition_alert ? 'bg-primary-blue' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform absolute ${formData.medical_condition_alert ? 'translate-x-6' : 'translate-x-1'}`}></div>
                </button>
              </div>

              {formData.medical_condition_alert && (
                <textarea 
                  value={formData.medical_condition_details}
                  onChange={(e) => handleChange('medical_condition_details', e.target.value)}
                  rows="3"
                  placeholder="Describe medical condition"
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
            <Link 
              to="../teachers"
              className="px-8 py-3.5 bg-sky-50 text-sky-600 rounded-[18px] text-[14px] font-extrabold hover:bg-sky-100 transition-all active:scale-95 shadow-sm shadow-sky-100/50"
            >
              Cancel
            </Link>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-primary-pink text-white rounded-[18px] text-[14px] font-extrabold hover:brightness-105 transition-all active:scale-95 shadow-lg shadow-primary-pink/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save & Add Teacher</span>
              )}
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

export default AddTeacher;
