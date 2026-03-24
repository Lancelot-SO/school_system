import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Plus, Save, Building2, AlertCircle } from 'lucide-react';

const SchoolProfileSettings = () => {
  const [awards, setAwards] = useState(['']);
  const [formData, setFormData] = useState({
    school_name: '',
    school_location: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
          
          setFormData({
            school_name: p.school_name || p.name || '',
            school_location: p.school_location || p.location || '',
            description: p.description || ''
          });
          
          if (p.awards && Array.isArray(p.awards) && p.awards.length > 0) {
            setAwards(p.awards.map(a => typeof a === 'object' ? a.name : a));
          }
        }
      } catch (err) {
        console.error("Failed to fetch initial profile data:", err);
      }
    };
    
    fetchSchoolProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAwardChange = (idx, val) => {
    const newAwards = [...awards];
    newAwards[idx] = val;
    setAwards(newAwards);
  };

  const addAward = () => setAwards([...awards, '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const submitData = new FormData();
      submitData.append('school_name', formData.school_name);
      submitData.append('school_location', formData.school_location);
      submitData.append('description', formData.description);
      
      const filteredAwards = awards.filter(a => a.trim() !== '');
      filteredAwards.forEach((award, index) => {
        submitData.append(`awards[${index}]`, award);
      });
      
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
        throw new Error(data.message || data.error || 'Failed to update school profile.');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "A network or server error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-pink shadow-sm">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-primary-blue">School Details</h1>
          <p className="text-sm font-semibold text-gray-500">Manage your institution's profile and branding</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm p-6 sm:p-10 border border-gray-100 mt-2">
        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-[1rem] text-sm font-medium" role="alert">
             {error}
          </div>
        )}
        
        {success && (
          <div className="mb-8 bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-[1rem] text-sm font-medium flex items-center gap-2" role="alert">
             <Building2 size={16} /> School Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">School Name</label>
            <input 
              type="text" 
              name="school_name"
              value={formData.school_name}
              onChange={handleInputChange}
              required
              placeholder="e.g. St. James Academy"
              className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 ml-1">Primary Campus</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-pink transition-colors" size={20} />
                  <input 
                    type="text" 
                    name="school_location"
                    value={formData.school_location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                    className="appearance-none block w-full pl-12 pr-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

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
                    className="appearance-none block w-full px-5 py-3.5 border border-gray-200/80 rounded-full text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all duration-200 mb-2"
                  />
                ))}
              </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900 ml-1">Mission & Values</label>
            <textarea 
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="appearance-none block w-full px-5 py-4 border border-gray-200/80 rounded-3xl text-[15px] text-gray-900 bg-gray-50/50 hover:bg-gray-50 focus:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end">
             <button 
               type="submit"
               disabled={loading}
               className={`w-full md:w-auto flex items-center justify-center gap-2 py-4 px-10 rounded-full text-[15px] font-semibold text-white bg-primary-pink hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all duration-200 shadow-[0_4px_14px_0_rgba(244,63,94,0.39)] ${loading ? 'opacity-75 cursor-wait' : ''}`}
             >
               <Save size={18} /> {loading ? 'Saving...' : 'Update Details'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolProfileSettings;
