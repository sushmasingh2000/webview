import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className=" bg-blue-600 text-white shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>

        {/* Right side icons and profile dropdown can go here */}
      </div>
    </header>
  );
};

export default Header;
