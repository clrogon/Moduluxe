
import React, { useState } from 'react';
import { Communication } from '../../shared/types/index';

interface ComposeMessageProps {
    onSend: (comm: Communication) => void;
    onCancel: () => void;
}

const ComposeMessage: React.FC<ComposeMessageProps> = ({ onSend, onCancel }) => {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [type, setType] = useState<'Email' | 'SMS'>('Email');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newComm: Communication = {
            id: `com-${Date.now()}`,
            sender: 'You (Admin)', // In a real app, this would be the logged-in user
            subject: subject,
            preview: body.substring(0, 50) + (body.length > 50 ? '...' : ''),
            body: `To: ${recipient}\n\n${body}`,
            timestamp: 'Just now',
            read: true,
            type: type,
            avatarColor: 'bg-gray-500'
        };
        onSend(newComm);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message Type</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                </select>
            </div>

            <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipient</label>
                <input
                    type="text"
                    id="recipient"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={type === 'Email' ? "user@example.com" : "+1 555 123 4567"}
                />
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <input
                    type="text"
                    id="subject"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Message Subject"
                />
            </div>

            <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message Body</label>
                <textarea
                    id="body"
                    rows={6}
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Type your message here..."
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Send Message
                </button>
            </div>
        </form>
    );
};

export default ComposeMessage;