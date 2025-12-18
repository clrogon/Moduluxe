
import React, { useState } from 'react';
import { Communication } from '../../shared/types/index';
import { SendIcon } from '../../components/ui/icons/Icons';

interface MessageDetailProps {
    message: Communication;
    onReply: (text: string) => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message, onReply }) => {
    const [replyText, setReplyText] = useState('');

    const handleSendReply = () => {
        if (replyText.trim()) {
            onReply(replyText);
            setReplyText('');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className={`flex-shrink-0 h-12 w-12 rounded-full ${message.avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                    {message.sender.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{message.subject}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">From: {message.sender}</p>
                    <span className={`mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                         message.type === 'Email' ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' : 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                    }`}>
                        {message.type}
                    </span>
                </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">{message.body}</p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label htmlFor="reply" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reply</label>
                <div className="relative">
                    <textarea
                        id="reply"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={handleSendReply}
                            disabled={!replyText.trim()}
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                !replyText.trim() ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <SendIcon className="h-4 w-4 mr-2" />
                            Send Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetail;