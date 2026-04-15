import React, { useState, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';

const API_BASE = 'https://lumi-api.artfricastudio.com/api';

const InfoRow = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-start gap-4 py-3.5 group">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${accent || 'bg-gray-50 text-gray-400'} transition-colors`}>
      <Icon size={16} />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-[13px] font-extrabold text-primary-blue break-words">{value || '—'}</span>
    </div>
  </div>
);

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError('Teacher not found');
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

  const t = teacher;
  const profilePhotoUrl = t.profile_photo
    ? `${API_BASE.replace('/api', '')}/storage/${t.profile_photo}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(t.full_name || 'Teacher')}&background=random&size=200`;

  return (
    <div className="flex flex-col gap-8 py-8 animate-in fade-in duration-500 overflow-x-hidden pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('../teachers')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-blue tracking-tight">Teacher Profile</h1>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              <span>Dashboard</span>
              <span>/</span>
              <Link to="../teachers" className="text-sky-500 hover:text-sky-600 transition-colors">Teachers</Link>
              <span>/</span>
              <span>{t.full_name}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-50 text-gray-500 px-5 py-2.5 rounded-xl text-[12px] font-extrabold hover:bg-gray-100 transition-all border border-gray-100">
            <Printer size={14} />
            Print
          </button>
          <button className="flex items-center gap-2 bg-primary-pink text-white px-5 py-2.5 rounded-xl text-[12px] font-extrabold hover:brightness-105 transition-all shadow-lg shadow-primary-pink/20 active:scale-95">
            <Edit3 size={14} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-[40px] p-8 shadow-lg shadow-gray-200/40 border border-white relative overflow-hidden">
        {/* Decorative gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-blue via-sky-400 to-primary-pink rounded-t-[40px]"></div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-2">
          {/* Photo */}
          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-[28px] border-4 border-gray-50 p-1 shadow-lg shadow-gray-200/60">
              <img
                src={profilePhotoUrl}
                alt={t.full_name}
                className="w-full h-full rounded-[22px] object-cover"
              />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-4 border-white shadow-sm ${t.status === 'active' ? 'bg-emerald-400' : t.status === 'on_leave' ? 'bg-amber-400' : 'bg-gray-300'}`}></div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
              <h2 className="text-2xl font-extrabold text-primary-blue tracking-tight">{t.full_name}</h2>
              <span className={`text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 rounded-full border ${getStatusStyle(t.status)} w-max mx-auto lg:mx-0`}>
                {getStatusLabel(t.status)}
              </span>
            </div>
            <p className="text-[13px] font-bold text-gray-400 mb-4">{t.designation} · {t.department}</p>

            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
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
              {t.email && (
                <a href={`mailto:${t.email}`} className="flex items-center gap-2 bg-sky-50/80 px-3.5 py-2 rounded-xl border border-sky-100/50 hover:bg-sky-100 transition-colors">
                  <Mail size={13} className="text-sky-500" />
                  <span className="text-[11px] font-extrabold text-sky-600">{t.email}</span>
                </a>
              )}
              {t.phone && (
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
            <InfoRow icon={User} label="Full Name" value={t.full_name} accent="bg-sky-50 text-sky-500" />
            <InfoRow icon={User} label="Gender" value={t.gender ? t.gender.charAt(0).toUpperCase() + t.gender.slice(1) : null} accent="bg-pink-50 text-pink-500" />
            <InfoRow icon={Calendar} label="Date of Birth" value={formatDate(t.date_of_birth)} accent="bg-violet-50 text-violet-500" />
            <InfoRow icon={Mail} label="Email" value={t.email} accent="bg-sky-50 text-sky-500" />
            <InfoRow icon={Phone} label="Phone" value={t.phone ? `${t.phone_country_code || ''} ${t.phone}` : null} accent="bg-emerald-50 text-emerald-500" />
            <InfoRow icon={MapPin} label="Address" value={t.address} accent="bg-amber-50 text-amber-500" />
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
            <InfoRow icon={Hash} label="Teacher ID" value={t.teacher_id} accent="bg-blue-50 text-blue-500" />
            <InfoRow icon={Briefcase} label="Employee ID" value={t.employee_id} accent="bg-violet-50 text-violet-500" />
            <InfoRow icon={Building2} label="Department" value={t.department} accent="bg-indigo-50 text-indigo-500" />
            <InfoRow icon={Shield} label="Designation" value={t.designation} accent="bg-teal-50 text-teal-500" />
            <InfoRow icon={Calendar} label="Joining Date" value={formatDate(t.joining_date)} accent="bg-sky-50 text-sky-500" />
            <InfoRow icon={GraduationCap} label="Qualification" value={t.qualification} accent="bg-amber-50 text-amber-500" />
            <InfoRow icon={FileText} label="Specialization" value={t.specialization} accent="bg-rose-50 text-rose-500" />
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
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-[32px] p-7 shadow-lg shadow-gray-200/40 border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                <Users size={16} className="text-orange-500" />
              </div>
              <h3 className="text-[15px] font-extrabold text-primary-blue tracking-tight">Emergency Contacts</h3>
            </div>
            {t.emergency_contacts && t.emergency_contacts.length > 0 ? (
              <div className="space-y-3">
                {t.emergency_contacts.map((ec, i) => (
                  <div key={ec.id || i} className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100/50 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-extrabold text-primary-blue">{ec.name}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 bg-white px-2.5 py-0.5 rounded-full border border-gray-100">{ec.relation}</span>
                    </div>
                    <a href={`tel:${ec.phone_country_code || ''}${ec.phone}`} className="flex items-center gap-2 text-[12px] font-bold text-sky-500 hover:text-sky-600 transition-colors">
                      <Phone size={12} />
                      {ec.phone_country_code} {ec.phone}
                    </a>
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
