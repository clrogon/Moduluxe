import React, { useState } from 'react';
import { ShieldCheckIcon } from '../../components/ui/icons/Icons';
import { supabase } from '../../core/lib/supabaseClient';

const PrivacySecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMsg(null);

        if (newPassword !== confirmPassword) {
            setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        if (newPassword.length < 8) {
            setPasswordMsg({ type: 'error', text: 'Password must be at least 8 characters.' });
            return;
        }

        if (!supabase) {
            setPasswordMsg({ type: 'error', text: 'Authentication service unavailable.' });
            return;
        }

        setIsUpdating(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setPasswordMsg({ type: 'success', text: 'Password updated successfully.' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setPasswordMsg({ type: 'error', text: err.message || 'Failed to update password.' });
        } finally {
            setIsUpdating(false);
        }
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
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your password and account security.</p>
                </div>
            </div>

            {/* Change Password */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Change Password</h4>
                <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4 max-w-lg">
                    <div>
                        <label className={formLabelClasses}>New Password</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className={formInputClasses}
                        />
                    </div>
                    <div>
                        <label className={formLabelClasses}>Confirm New Password</label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className={formInputClasses}
                        />
                    </div>
                    {passwordMsg && (
                        <p className={`text-sm ${passwordMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {passwordMsg.text}
                        </p>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        >
                            {isUpdating ? 'Updating…' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Two-Factor Authentication — Coming Soon */}
            <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Two-Factor Authentication (2FA)</h4>
                <div className="mt-3 flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        Coming Soon
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">TOTP-based two-factor authentication will be available in a future update.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacySecuritySettings;
