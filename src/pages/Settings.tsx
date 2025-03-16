
import React from "react";

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Security & Privacy Settings</h1>
      
      <div className="space-y-6">
        <div className="dashboard-card p-6">
          <h2 className="text-xl font-semibold mb-4">Account Security</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-400">Last changed 30 days ago</p>
              </div>
              <button className="btn-outline text-sm py-1 px-3">Change</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Not enabled</p>
              </div>
              <button className="btn-outline text-sm py-1 px-3">Enable</button>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Sharing</p>
                <p className="text-sm text-gray-400">Control how your data is used</p>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="data-sharing" 
                  className="form-checkbox h-4 w-4 text-fiscal-purple-500 rounded" 
                />
                <label htmlFor="data-sharing" className="ml-2 text-sm">Enabled</label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics Cookies</p>
                <p className="text-sm text-gray-400">Help us improve with usage data</p>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="analytics" 
                  className="form-checkbox h-4 w-4 text-fiscal-purple-500 rounded" 
                  checked 
                />
                <label htmlFor="analytics" className="ml-2 text-sm">Enabled</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card p-6">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Download Your Data</p>
                <p className="text-sm text-gray-400">Get a copy of all your financial records</p>
              </div>
              <button className="btn-outline text-sm py-1 px-3">Download</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-gray-400 text-red-400">This action cannot be undone</p>
              </div>
              <button className="btn-outline border-red-500 text-red-500 text-sm py-1 px-3">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
