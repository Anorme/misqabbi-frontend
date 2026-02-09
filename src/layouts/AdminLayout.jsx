import { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/admin/Sidebar';
import SEO from '../components/SEO';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Admin" robots="noindex,nofollow" />
      {/* Mobile overlay: only over content area, tap to close sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-y-0 left-64 right-0 z-40  lg:hidden"
          aria-hidden
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content: pushed right on mobile when sidebar open, smooth transition */}
      <div
        className={`min-w-0 transition-[margin-left] duration-300 ease-in-out lg:ml-0 lg:pl-64 ${
          sidebarOpen ? 'ml-64' : ''
        }`}
      >
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex justify-end items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Page content: scrolls horizontally if needed when sidebar is open on small screens */}
        <main className="p-4 sm:p-6 overflow-x-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
