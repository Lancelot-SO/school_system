import { Search, Settings, Bell, Menu, X, User, Building2 } from 'lucide-react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Header = ({ onMenuClick, isMenuOpen, user }) => {
  const location = useLocation();
  const { school_slug } = useParams();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/inbox')) return 'Inbox';
    if (path.includes('/calendar')) return 'Calendar';
    if (path.includes('/attendance')) return 'Attendance';
    if (path.includes('/teachers')) return 'Teachers';
    if (path.includes('/students/add')) return 'Add Student';
    if (path.includes('/student-details')) return 'Student Details';
    if (path.includes('/finance/fees-collection')) return 'Fees Collection';
    if (path.includes('/finance/expenses')) return 'Expenses';
    if (path.includes('/notice-board')) return 'Notice Board';
    return 'Dashboard';
  };

  return (
    <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center px-4 md:px-8 sticky top-0 z-40 w-full">
      {/* Mobile Header (3-Column Layout) */}
      <div className="flex md:hidden items-center justify-between w-full">
        <div className="flex-1 flex justify-start">
          <div className="w-8 h-8 bg-linear-to-br from-primary-pink to-primary-blue rounded-lg flex items-center justify-center text-white font-black shadow-sm">
            S
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <h2 className="text-[17px] font-extrabold text-primary-blue tracking-tight whitespace-nowrap">{getPageTitle()}</h2>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={onMenuClick}
            className="p-2 -mr-2 text-gray-400 hover:text-primary-blue transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden block p-2 -ml-2 text-gray-400 hover:text-primary-blue transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl font-extrabold text-primary-blue leading-tight">{getPageTitle()}</h2>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search anything"
              className="pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink/20 w-64 shadow-sm text-xs transition-all"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative" ref={settingsRef}>
              <button 
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-2.5 rounded-xl transition-all ${isSettingsOpen ? 'bg-primary-pink/10 text-primary-pink' : 'bg-gray-50 text-gray-400 hover:text-primary-pink'}`}
              >
                <Settings size={18} />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Link 
                    to={`/${school_slug}/admin/school-profile`}
                    onClick={() => setIsSettingsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[14px] font-bold text-gray-700 hover:bg-gray-50 hover:text-primary-pink transition-colors"
                  >
                    <Building2 size={16} />
                    School Details
                  </Link>
                </div>
              )}
            </div>
            <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-primary-pink transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-pink rounded-full border-2 border-white"></span>
            </button>
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
            <div className="text-right">
              <p className="text-[13px] font-extrabold text-primary-blue leading-none mb-0.5">{user?.name || 'Default User'}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{user?.role || 'User'}</p>
            </div>
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt="User"
                className="w-10 h-10 rounded-xl border-2 border-white shadow-md object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl border-2 border-white shadow-md bg-gray-50 flex items-center justify-center text-gray-400">
                <User size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
