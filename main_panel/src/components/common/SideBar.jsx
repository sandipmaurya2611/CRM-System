import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShieldAlt, FaBars, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { 
  FaHome, 
  FaTags, 
  FaFolder, 
  FaUsers, 
  FaChartBar, 
  FaRegStar, 
  FaRegCommentAlt, 
  FaQuestionCircle, 
  FaLightbulb, 
  FaUserCog, 
  FaCog,
  FaFileAlt,
  FaFileContract,
  FaCheckCircle,
  FaRegCreditCard,
  FaCreditCard,
  FaEnvelope,
  FaSignOutAlt,
  FaBell
} from 'react-icons/fa';

const Sidebar = ({ 
  className = '', 
  isMinimized = false, 
  onToggleMinimize = () => {} 
}) => {
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  
  // User data - in a real app, this would come from a context or props
  const userData = {
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com'
  };
  
  // Check if any seller route is active
  const isSellerActive = location.pathname.startsWith('/seller');
  const colors = {
    sidebarBg: '#202444',
    textWhite: '#ffffff',
    sectionHeader: '#9ca3af',
    activeBg: '#ffffff',
    activeText: '#111827',
    badgeBg: '#202444',
    badgeText: '#ffffff',
    hoverBg: 'rgba(255, 255, 255, 0.1)'
  };

  const sellerMenuItems = [
    { icon: <FaUsers size={18} />, label: 'All Sellers', href: '/seller' },
    { icon: <FaFileAlt size={18} />, label: 'Seller Registration', href: '/seller-add' },
  ];

  const mainMenuItems = [
    { icon: <FaHome size={20} />, label: 'Dashboard', href: '/' },
    { icon: <FaTags size={20} />, label: 'Products', href: '/products' },
    { 
      icon: <FaUsers size={20} />, 
      label: 'Seller', 
      href: '/seller',
      hasSubmenu: true,
      submenu: sellerMenuItems
    },
    { 
      icon: <FaCheckCircle size={20} />, 
      label: 'Products Verification', 
      href: '/product-verify'
    },
    { icon: <FaRegCreditCard size={20} />, label: 'Subscription', href: '/subscription' },
    { icon: <FaCreditCard size={20} />, label: 'Payments', href: '/payments' },
    { icon: <FaBell size={20} />, label: 'Notifications', href: '/Notifications' },
  ];

  const otherMenuItems = [
    { icon: <FaQuestionCircle size={20} />, label: 'Knowledge Base', href: '/knowledge-base' },
    { icon: <FaLightbulb size={20} />, label: 'Product Updates', href: '/product-updates' },
  ];

  const settingsMenuItems = [
    { icon: <FaUserCog size={20} />, label: 'Personal Settings', href: '/personal-settings' },
    { icon: <FaCog size={20} />, label: 'Global Settings', href: '/global-settings' },
  ];

  const MenuItem = ({ icon, label, href, badge, active = false, hasSubmenu = false, submenu = [] }) => {
    const isActive = active || (hasSubmenu && isSellerActive);
    const isExpanded = isSellerOpen || isMinimized;
    
    return (
      <li className="mb-1">
        <div className="flex flex-col">
          <div className="flex items-center">
            <Link
              to={href}
              className={`flex-1 flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-white text-gray-900 font-medium' : 'text-white hover:bg-white/10'
              } ${isMinimized ? 'justify-center' : ''} text-sm`}
              title={isMinimized ? label : ''}
              onClick={(e) => {
                if (hasSubmenu && !isMinimized) {
                  e.preventDefault();
                  setIsSellerOpen(!isSellerOpen);
                }
              }}
            >
              <span className="mr-4 flex-shrink-0">
                {icon}
              </span>
              {!isMinimized && (
                <>
                  <span className="flex-grow">{label}</span>
                  {hasSubmenu && (
                    <span className="ml-2">
                      {isSellerOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                    </span>
                  )}
                  {badge && (
                    <span 
                      className="text-xs font-bold px-2.5 py-1 rounded-full ml-2"
                      style={{
                        backgroundColor: colors.badgeBg,
                        color: colors.badgeText
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          </div>
          
          {hasSubmenu && !isMinimized && isSellerOpen && (
            <div className="mt-1 ml-8">
              <ul>
                {submenu.map((item, index) => (
                  <li key={index} className="mb-1">
                    <Link
                      to={item.href}
                      className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 text-sm ${
                        location.pathname === item.href 
                          ? 'text-blue-400 font-medium' 
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </li>
    );
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-full flex flex-col transition-all duration-300 p-4 z-40 ${className}`}
      style={{ 
        backgroundColor: colors.sidebarBg,
        width: isMinimized ? '70px' : '240px',
        transitionProperty: 'width, transform',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out'
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          {!isMinimized ? (
            <Link to="/" className="flex items-center space-x-3">
              <FaShieldAlt 
                className="text-3xl flex-shrink-0" 
                style={{ color: colors.textWhite }}
              />
              <span className="text-lg font-bold text-white">
                Admin Panel
              </span>
            </Link>
          ) : (
            <button 
              onClick={() => onToggleMinimize()}
              className="p-2 -ml-2"
              title="Expand menu"
            >
              <FaBars 
                className="text-2xl" 
                style={{ color: colors.textWhite }}
              />
            </button>
          )}
        </div>
        
        {!isMinimized && (
          <button
            onClick={() => onToggleMinimize()}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white flex-shrink-0"
            title="Minimize"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>

      <nav className="flex-grow space-y-1">
        <ul className="space-y-2">
          {mainMenuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              icon={item.icon} 
              label={item.label} 
              href={item.href} 
              badge={item.badge}
              active={location.pathname === item.href}
              hasSubmenu={item.hasSubmenu}
              submenu={item.submenu}
            />
          ))}
        </ul>
      </nav>
      
      {/* Profile Section */}
      <div className={`mt-auto pt-4 border-t border-gray-700 ${isMinimized ? 'px-0' : 'px-2'}`}>
        <div className="relative">
          <button
            onClick={() => !isMinimized && setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
              isProfileOpen ? 'bg-white/10' : 'hover:bg-white/5'
            } ${isMinimized ? 'justify-center' : ''}`}
          >
            <div className={`flex items-center ${!isMinimized ? 'w-full' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">
                  {userData.name.charAt(0)}
                </span>
              </div>
              
              {!isMinimized && (
                <div className="ml-3 text-left overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {userData.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {userData.role}
                  </p>
                </div>
              )}
              
              {!isMinimized && (
                <div className="ml-auto">
                  <FaChevronDown 
                    className={`text-gray-400 transition-transform duration-200 ${
                      isProfileOpen ? 'transform rotate-180' : ''
                    }`}
                    size={14}
                  />
                </div>
              )}
            </div>
          </button>
          
          {/* Profile Dropdown */}
          {!isMinimized && isProfileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {userData.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userData.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <FaUserCog className="mr-3 text-gray-400" size={14} />
                  Profile Settings
                </Link>
                <button
                  className="w-full flex items-center px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                  onClick={() => {
                    // Handle logout
                    console.log('Logout clicked');
                    setIsProfileOpen(false);
                  }}
                >
                  <FaSignOutAlt className="mr-3" size={14} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;