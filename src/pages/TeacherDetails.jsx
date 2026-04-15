import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Building2,
  User,
  Heart,
  AlertTriangle,
  Shield,
  Clock,
  Hash,
  RefreshCw,
  FileText,
  Users,
  Edit3,
  Printer,
  X,
  Save,
  Loader2,
  Plus,
  Trash2,
  Camera
} from 'lucide-react';

const API_BASE = 'https://lumi-api.artfricastudio.com/api';

const InfoRow = ({ icon: Icon, label, value, accent, isEditing, field, onChange, type = "text", options = [], locked = false }) => {
  return (
    <div className="flex items-start gap-4 py-3.5 group">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent || 'bg-gray-50 text-gray-400'} transition-colors`}>
        <Icon size={16} />
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          {label}
          {isEditing && locked && <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">Locked</span>}
        </span>
        
        {isEditing && !locked ? (
          type === "select" ? (
            <select
              value={value || ''}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-extrabold text-primary-blue focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            >
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={value || ''}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-extrabold text-primary-blue focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-gray-300 placeholder:font-medium"
              placeholder={`Enter ${label}...`}
            />
          )
        ) : (
          <span className={`text-[13px] font-extrabold break-words ${locked ? 'text-gray-500' : 'text-primary-blue'}`}>
            {value || '—'}
          </span>
        )}
      </div>
    </div>
  );
};

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/teachers/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTeacher(data.data || data);
        } else if (response.status === 404) {
          // Fallback to legacy profiles endpoint
          const fallbackResponse = await fetch(`${API_BASE}/profiles/teachers`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });

          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            const legacyTeachers = fallbackData.data || [];
            
            // Allow matching by database id or the custom teacher_id string
            const foundProfile = legacyTeachers.find(t => String(t.id) === id || String(t.teacher_id) === id);

            if (foundProfile) {
              setTeacher({
                id: foundProfile.id,
                full_name: foundProfile.name || foundProfile.full_name || 'Unknown Teacher',
                email: foundProfile.email || '',
                phone: foundProfile.profile?.phone || '',
                phone_country_code: '+233',
                department: foundProfile.profile?.subject_specialty ? foundProfile.profile.subject_specialty.split(',')[0] : 'General',
                designation: 'Legacy Profile',
                joining_date: foundProfile.created_at ? foundProfile.created_at.split('T')[0] : null,
                qualification: '',
                specialization: foundProfile.profile?.subject_specialty || '',
                gender: '',
                address: foundProfile.profile?.address || '',
                teacher_id: foundProfile.teacher_id,
                employee_id: foundProfile.employee_id,
                status: foundProfile.profile?.employment_status === 'full-time' ? 'active' : 'inactive',
                created_at: foundProfile.created_at,
                updated_at: foundProfile.updated_at,
                profile_photo: null, 
                _legacy_profile_picture_url: foundProfile.profile_picture,
                medical_condition_alert: false,
                emergency_contacts: []
              });
            } else {
              setError('Teacher not found');
            }
          } else {
            setError('Teacher not found');
          }
        } else {
          setError('Failed to load teacher details');
        }
      } catch (err) {
        console.error('Failed to fetch teacher:', err);
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleEdit = () => {
    setEditData({ ...teacher, emergency_contacts: [...(teacher.emergency_contacts || [])] });
    setPhotoPreview(null);
    setSelectedPhoto(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
    setPhotoPreview(null);
    setSelectedPhoto(null);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'Photo must be under 2MB');
        return;
      }
      setSelectedPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEmergencyChange = (index, field, value) => {
    setEditData(prev => {
      const contacts = [...prev.emergency_contacts];
      contacts[index] = { ...contacts[index], [field]: value };
      return { ...prev, emergency_contacts: contacts };
    });
  };

  const addEmergencyContact = () => {
    setEditData(prev => ({
      ...prev,
      emergency_contacts: [...(prev.emergency_contacts || []), { name: '', relation: '', phone_country_code: '+233', phone: '' }]
    }));
  };

  const removeEmergencyContact = (index) => {
    setEditData(prev => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!editData.full_name?.trim() || !editData.email?.trim() || !editData.phone?.trim()) {
      showToast('error', 'Name, Email, and Phone are required.');
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        status: editData.status || 'active',
        full_name: editData.full_name || '',
        email: editData.email || '',
        gender: editData.gender || '',
        date_of_birth: editData.date_of_birth || null,
        phone: editData.phone || '',
        phone_country_code: editData.phone_country_code || '+233',
        address: editData.address || '',
        department: editData.department || '',
        designation: editData.designation || '',
        joining_date: editData.joining_date || null,
        qualification: editData.qualification || '',
        specialization: editData.specialization || '',
        medical_condition_alert: editData.medical_condition_alert ? true : false,
        medical_condition_details: editData.medical_condition_details || null,
      };

      if (editData.emergency_contacts && editData.emergency_contacts.length > 0) {
        const ec = editData.emergency_contacts[0];
        if (ec.name?.trim()) {
          payload.emergency_contact = {
            name: ec.name,
            relation: ec.relation || '',
            phone: ec.phone || '',
            phone_country_code: ec.phone_country_code || '+233'
          };
        }
      }

      // Important: Use PUT method with application/json
      const response = await fetch(`${API_BASE}/teachers/${teacher.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setTeacher(data.data || data || editData);
        setIsEditing(false);
        showToast('success', 'Profile updated successfully!');
      } else {
        showToast('error', data.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error(err);
      showToast('error', 'Network error. Could not update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      'active': 'bg-emerald-50 text-emerald-600 border-emerald-200',
      'inactive': 'bg-gray-100 text-gray-500 border-gray-200',
      'on_leave': 'bg-amber-50 text-amber-600 border-amber-200',
    };
    return styles[status] || 'bg-gray-50 text-gray-500 border-gray-200';
  };

  const getStatusLabel = (status) => {
    const labels = { 'active': 'Active', 'inactive': 'Inactive', 'on_leave': 'On Leave' };
    return labels[status] || status || 'Unknown';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 animate-in fade-in duration-500">
        <RefreshCw size={32} className="text-primary-pink animate-spin" />
        <p className="text-sm font-bold text-gray-500">Loading teacher profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in duration-500">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-primary-blue mb-2">{error}</h2>
          <p className="text-sm text-gray-400 font-bold">The teacher profile could not be loaded.</p>
        </div>
        <button
          onClick={() => navigate('../teachers')}
          className="flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-3 rounded-xl text-sm font-extrabold hover:bg-sky-100 transition-all"
        >
          <ChevronLeft size={16} />
          Back to Teachers
        </button>
      </div>
    );
  }

  const t = isEditing ? editData : teacher;
  const originalT = teacher;
  
  const profilePhotoUrl = photoPreview || (originalT.profile_photo
    ? `${API_BASE.replace('/api', '')}/storage/${originalT.profile_photo}`
    : originalT._legacy_profile_picture_url
      ? originalT._legacy_profile_picture_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(originalT.full_name || 'Teacher')}&background=random&size=200`);

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in duration-500 overflow-x-hidden pb-16 relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl animate-in slide-in-from-top-4 ${
          toast.type === 'success' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 'bg-red-50 border border-red-100 text-red-600'
        }`}>
          {toast.type === 'success' ? <Shield size={20} /> : <AlertTriangle size={20} />}
          <span className="text-sm font-extrabold">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('../teachers')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-blue tracking-tight">
              {isEditing ? 'Edit Teacher Profile' : 'Teacher Profile'}
            </h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              <span>Dashboard</span>
              <span>/</span>
              <Link to="../teachers" className="text-sky-500 hover:text-sky-600 transition-colors">Teachers</Link>
              <span>/</span>
              <span>{originalT.full_name}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <>
              <button className="flex items-center gap-2 bg-gray-50 text-gray-500 px-5 py-2.5 rounded-xl text-[12px] font-extrabold hover:bg-gray-100 transition-all border border-gray-100">
                <Printer size={14} />
                Print
              </button>
              <button 
                onClick={handleEdit}
                className="flex items-center gap-2 bg-primary-pink text-white px-5 py-2.5 rounded-xl text-[12px] font-extrabold hover:brightness-105 transition-all shadow-lg shadow-primary-pink/20 active:scale-95"
              >
                <Edit3 size={14} />
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleCancel}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gray-50 text-gray-500 px-5 py-2.5 rounded-xl text-[12px] font-extrabold hover:bg-gray-100 transition-all border border-gray-100 disabled:opacity-50"
              >
                <X size={14} />
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-[12px] font-extrabold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-blue via-sky-400 to-primary-pink rounded-t-[40px]"></div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-2">
          {/* Photo */}
          <div className="relative shrink-0 group">
            <div className={`w-32 h-32 rounded-[28px] border-4 border-gray-50 p-1 shadow-lg shadow-gray-200/60 overflow-hidden relative ${isEditing ? 'cursor-pointer' : ''}`}
                 onClick={() => isEditing && fileInputRef.current?.click()}
            >
              <img
                src={profilePhotoUrl}
                alt={t.full_name}
                className={`w-full h-full rounded-[22px] object-cover transition-all ${isEditing ? 'group-hover:blur-sm' : ''}`}
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-[22px] m-1 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                  <Camera size={24} className="text-white mb-1" />
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider">Change Photo</span>
                </div>
              )}
            </div>
            {!isEditing && (
              <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-4 border-white shadow-sm ${t.status === 'active' ? 'bg-emerald-400' : t.status === 'on_leave' ? 'bg-amber-400' : 'bg-gray-300'}`}></div>
            )}
            <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/jpeg,image/png,image/jpg" className="hidden" />
            
            {isEditing && (
              <div className="mt-4 text-center">
                <select 
                  value={t.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className={`text-[11px] font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-full border focus:outline-none appearance-none text-center ${getStatusStyle(t.status)}`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left w-full">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
              {isEditing ? (
                <input
                  type="text"
                  value={t.full_name || ''}
                  onChange={(e) => handleChange('full_name', e.target.value)}
                  className="text-2xl font-extrabold text-primary-blue bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  placeholder="Full Name"
                />
              ) : (
                <h2 className="text-2xl font-extrabold text-primary-blue tracking-tight">{t.full_name}</h2>
              )}
              
              {!isEditing && (
                <span className={`text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border ${getStatusStyle(t.status)} w-max mx-auto lg:mx-0`}>
                  {getStatusLabel(t.status)}
                </span>
              )}
            </div>
            
            {!isEditing && <p className="text-[13px] font-bold text-gray-400 mb-4">{t.designation} · {t.department}</p>}

            <div className={`flex flex-wrap items-center gap-4 justify-center lg:justify-start ${isEditing ? 'mt-6' : ''}`}>
              {t.teacher_id && (
                <div className="flex items-center gap-2 bg-blue-50/80 px-3.5 py-2 rounded-xl border border-blue-100/50">
                  <Hash size={13} className="text-blue-500" />
                  <span className="text-[11px] font-extrabold text-blue-600">{t.teacher_id}</span>
                </div>
              )}
              {t.employee_id && (
                <div className="flex items-center gap-2 bg-violet-50/80 px-3.5 py-2 rounded-xl border border-violet-100/50">
                  <Briefcase size={13} className="text-violet-500" />
                  <span className="text-[11px] font-extrabold text-violet-600">{t.employee_id}</span>
                </div>
              )}
              {!isEditing && t.email && (
                <a href={`mailto:${t.email}`} className="flex items-center gap-2 bg-sky-50/80 px-3.5 py-2 rounded-xl border border-sky-100/50 hover:bg-sky-100 transition-colors">
                  <Mail size={13} className="text-sky-500" />
                  <span className="text-[11px] font-extrabold text-sky-600">{t.email}</span>
                </a>
              )}
              {!isEditing && t.phone && (
                <a href={`tel:${t.phone_country_code || ''}${t.phone}`} className="flex items-center gap-2 bg-emerald-50/80 px-3.5 py-2 rounded-xl border border-emerald-100/50 hover:bg-emerald-100 transition-colors">
                  <Phone size={13} className="text-emerald-500" />
                  <span className="text-[11px] font-extrabold text-emerald-600">{t.phone_country_code} {t.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-gray-200/40 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
              <User size={16} className="text-sky-500" />
            </div>
            <h3 className="text-[15px] font-extrabold text-primary-blue tracking-tight">Personal Information</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <InfoRow icon={User} label="Gender" field="gender" value={t.gender ? t.gender.charAt(0).toUpperCase() + t.gender.slice(1) : ''} isEditing={isEditing} onChange={handleChange} type="select" options={[{value: 'male', label: 'Male'}, {value: 'female', label: 'Female'}]} accent="bg-pink-50 text-pink-500" />
            <InfoRow icon={Calendar} label="Date of Birth" field="date_of_birth" value={isEditing ? t.date_of_birth : formatDate(t.date_of_birth)} isEditing={isEditing} onChange={handleChange} type="date" accent="bg-violet-50 text-violet-500" />
            <InfoRow icon={Mail} label="Email" field="email" value={t.email} isEditing={isEditing} onChange={handleChange} type="email" accent="bg-sky-50 text-sky-500" />
            
            {/* Custom Phone field in edit mode because it needs two inputs */}
            {isEditing ? (
              <div className="flex items-start gap-4 py-3.5 group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-500 transition-colors">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={t.phone_country_code || '+233'}
                      onChange={(e) => handleChange('phone_country_code', e.target.value)}
                      className="w-24 bg-gray-50 border border-gray-200 rounded-xl px-2 py-2 text-[13px] font-extrabold text-primary-blue focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    >
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇺🇸 +1</option>
                    </select>
                    <input
                      type="text"
                      value={t.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[13px] font-extrabold text-primary-blue focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-300"
                      placeholder="Phone number..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <InfoRow icon={Phone} label="Phone" value={t.phone ? `${t.phone_country_code || ''} ${t.phone}` : null} accent="bg-emerald-50 text-emerald-500" />
            )}

            <InfoRow icon={MapPin} label="Address" field="address" value={t.address} isEditing={isEditing} onChange={handleChange} accent="bg-amber-50 text-amber-500" />
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-gray-200/40 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Briefcase size={16} className="text-violet-500" />
            </div>
            <h3 className="text-[15px] font-extrabold text-primary-blue tracking-tight">Professional Information</h3>
          </div>
          <div className="divide-y divide-gray-50">
            <InfoRow icon={Hash} label="Teacher ID" field="teacher_id" value={t.teacher_id} locked isEditing={isEditing} accent="bg-blue-50 text-blue-500" />
            <InfoRow icon={Briefcase} label="Employee ID" field="employee_id" value={t.employee_id} locked isEditing={isEditing} accent="bg-violet-50 text-violet-500" />
            
            <InfoRow icon={Building2} label="Department" field="department" value={t.department} isEditing={isEditing} onChange={handleChange} type="select" options={[
              {value: 'Mathematics', label: 'Mathematics'}, {value: 'Science', label: 'Science'}, {value: 'English', label: 'English'},
              {value: 'Information Technology', label: 'Information Tech'}, {value: 'Geography', label: 'Geography'}
            ]} accent="bg-indigo-50 text-indigo-500" />
            
            <InfoRow icon={Shield} label="Designation" field="designation" value={t.designation} isEditing={isEditing} onChange={handleChange} type="select" options={[
              {value: 'Senior Teacher', label: 'Senior Teacher'}, {value: 'Class Teacher', label: 'Class Teacher'}, {value: 'Subject Teacher', label: 'Subject Teacher'}
            ]} accent="bg-teal-50 text-teal-500" />
            
            <InfoRow icon={Calendar} label="Joining Date" field="joining_date" value={isEditing ? t.joining_date : formatDate(t.joining_date)} isEditing={isEditing} onChange={handleChange} type="date" accent="bg-sky-50 text-sky-500" />
            <InfoRow icon={GraduationCap} label="Qualification" field="qualification" value={t.qualification} isEditing={isEditing} onChange={handleChange} accent="bg-amber-50 text-amber-500" />
            <InfoRow icon={FileText} label="Specialization" field="specialization" value={t.specialization} isEditing={isEditing} onChange={handleChange} accent="bg-rose-50 text-rose-500" />
          </div>
        </div>

        {/* Health & Emergency */}
        <div className="flex flex-col gap-8">
          {/* Medical Info */}
          <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <Heart size={16} className="text-red-500" />
              </div>
              <h3 className="text-[15px] font-extrabold text-primary-blue tracking-tight">Health Information</h3>
            </div>
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100/50">
                  <span className="text-[12px] font-extrabold text-gray-500 tracking-wide">Has Medical Condition?</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={t.medical_condition_alert || false}
                      onChange={(e) => handleChange('medical_condition_alert', e.target.checked)} 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
                {t.medical_condition_alert && (
                  <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100/50">
                    <label className="text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-2">Medical Details / Alerts</label>
                    <textarea 
                      value={t.medical_condition_details || ''}
                      onChange={(e) => handleChange('medical_condition_details', e.target.value)}
                      className="w-full bg-white border border-red-200 rounded-xl px-3 py-2 text-[12px] font-bold text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 placeholder:text-red-300 min-h-[60px]"
                      placeholder="E.g., Asthma, severe nut allergy..."
                    ></textarea>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-2xl p-4 border border-gray-100/50">
                  <span className="text-[12px] font-extrabold text-gray-500">Medical Condition Alert</span>
                  <span className={`text-[11px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border ${t.medical_condition_alert ? 'bg-red-50 text-red-500 border-red-200' : 'bg-emerald-50 text-emerald-500 border-emerald-200'}`}>
                    {t.medical_condition_alert ? 'Yes' : 'No'}
                  </span>
                </div>
                {t.medical_condition_alert && t.medical_condition_details && (
                  <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100/50">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={14} className="text-red-400" />
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Medical Details</span>
                    </div>
                    <p className="text-[12px] font-bold text-red-600 leading-relaxed">{t.medical_condition_details}</p>
                  </div>
                )}
                {!t.medical_condition_alert && (
                  <p className="text-[12px] font-bold text-gray-400 text-center py-2">No medical conditions recorded.</p>
                )}
              </>
            )}
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Users size={16} className="text-orange-500" />
                </div>
                <h3 className="text-[15px] font-extrabold text-primary-blue tracking-tight">Emergency Contacts</h3>
              </div>
              {isEditing && (
                <button onClick={addEmergencyContact} className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-100 transition-colors">
                  <Plus size={16} />
                </button>
              )}
            </div>
            
            {t.emergency_contacts && t.emergency_contacts.length > 0 ? (
              <div className="space-y-4">
                {t.emergency_contacts.map((ec, i) => (
                  <div key={ec.id || i} className={`bg-gray-50/70 rounded-2xl p-4 border border-gray-100/50 ${isEditing ? '' : 'hover:shadow-md transition-all'}`}>
                    {isEditing ? (
                      <div className="space-y-3 relative group">
                        {t.emergency_contacts.length > 1 && (
                          <button onClick={() => removeEmergencyContact(i)} className="absolute -top-6 -right-2 text-red-400 p-1 hover:bg-red-50 rounded-lg">
                            <Trash2 size={14} />
                          </button>
                        )}
                        <input
                          type="text"
                          value={ec.name}
                          onChange={(e) => handleEmergencyChange(i, 'name', e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-extrabold text-primary-blue focus:outline-none focus:border-orange-300 transition-all placeholder:text-gray-300"
                          placeholder="Contact Name"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={ec.relation}
                            onChange={(e) => handleEmergencyChange(i, 'relation', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-2 py-2 text-[12px] font-extrabold text-primary-blue focus:outline-none focus:border-orange-300 transition-all"
                          >
                            <option value="">Relation...</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Husband">Husband</option>
                            <option value="Wife">Wife</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Colleague">Colleague</option>
                          </select>
                          <input
                            type="text"
                            value={ec.phone}
                            onChange={(e) => handleEmergencyChange(i, 'phone', e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-extrabold text-primary-blue focus:outline-none focus:border-orange-300 transition-all placeholder:text-gray-300"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] font-extrabold text-primary-blue">{ec.name}</span>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 bg-white px-2.5 py-0.5 rounded-full border border-gray-100">{ec.relation}</span>
                        </div>
                        <a href={`tel:${ec.phone_country_code || ''}${ec.phone}`} className="flex items-center gap-2 text-[12px] font-bold text-sky-500 hover:text-sky-600 transition-colors">
                          <Phone size={12} />
                          {ec.phone_country_code} {ec.phone}
                        </a>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] font-bold text-gray-400 text-center py-4">No emergency contacts recorded.</p>
            )}
          </div>
        </div>
      </div>

      {/* Metadata Footer */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <span className="text-[11px] font-bold text-gray-400">Created: {formatDate(t.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={14} className="text-gray-400" />
              <span className="text-[11px] font-bold text-gray-400">Updated: {formatDate(t.updated_at)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Record ID:</span>
            <span className="text-[11px] font-extrabold text-gray-500 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100 font-mono">{t.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
