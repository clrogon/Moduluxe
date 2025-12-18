import React, { useState } from 'react';
import { ShieldCheckIcon } from '../../components/ui/icons/Icons';

const mockSessions = [
    { id: 1, device: 'Chrome on macOS', location: 'Lisbon, Portugal', ip: '192.168.1.1', lastActivity: 'Active now' },
    { id: 2, device: 'iPhone App', location: 'New York, USA', ip: '10.0.0.1', lastActivity: '2 hours ago' },
    { id: 3, device: 'Safari on iPad', location: 'London, UK', ip: '172.16.0.1', lastActivity: '1 day ago' },
];

const PrivacySecuritySettings = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Password change functionality is for demonstration purposes.');
    };

    const formInputClasses = "mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
    const formLabelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Header */}
            <div className="p-6 flex items-start space-x-4">
                 <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                    <ShieldCheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-gray-100">Privacy & Security</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your password, two-factor authentication, and active sessions.</p>
                </div>
            </div>

            {/* Change Password */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Change Password</h4>
                <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4 max-w-lg">
                     <div>
                        <label className={formLabelClasses}>Current Password</label>
                        <input type="password" required className={formInputClasses} />
                    </div>
                     <div>
                        <label className={formLabelClasses}>New Password</label>
                        <input type="password" required className={formInputClasses} />
                    </div>
                     <div>
                        <label className={formLabelClasses}>Confirm New Password</label>
                        <input type="password" required className={formInputClasses} />
                    </div>
                    <div className="flex justify-end">
                         <button type="submit" className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-6">
                 <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Two-Factor Authentication (2FA)</h4>
                 <div className="mt-4 flex items-center justify-between max-w-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Protect your account from unauthorized access.</p>
                    <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                    >
                        <span
                            className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                                twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
                    </button>
                 </div>
                 {twoFactorEnabled && (
                     <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border dark:border-gray-600 max-w-lg">
                         <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">Setup Authenticator App</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Scan the QR code with an app like Google Authenticator or Authy.</p>
                         <div className="mt-2 h-24 w-24 bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">[QR Code]</div>
                     </div>
                 )}
            </div>

             {/* Active Sessions */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Active Sessions</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This is a list of devices that have logged into your account.</p>
                <div className="mt-4 flow-root">
                    <ul className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockSessions.map(session => (
                            <li key={session.id} className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{session.device}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.location} ({session.ip}) - <span className={session.lastActivity === 'Active now' ? 'text-green-600 font-semibold' : ''}>{session.lastActivity}</span></p>
                                </div>
                                <button className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                                    Sign out
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-6 flex justify-end">
                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors">
                        Sign Out All Other Devices
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacySecuritySettings;