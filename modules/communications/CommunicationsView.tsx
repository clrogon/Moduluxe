import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, SendIcon } from '../../components/ui/icons/Icons';
import { Communication } from '../../shared/types/index';
import Modal from '../../components/ui/Modal';
import MessageDetail from './MessageDetail';
import ComposeMessage from './ComposeMessage';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface CommunicationsViewProps {
    communications: Communication[];
    onMarkAsRead: (id: string) => void;
    onSend: (comm: Communication) => void;
}

const CommunicationsView: React.FC<CommunicationsViewProps> = ({ communications, onMarkAsRead, onSend }) => {
    const [selectedMessage, setSelectedMessage] = useState<Communication | null>(null);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const { t } = useTranslation();

    const handleRowClick = (comm: Communication) => {
        setSelectedMessage(comm);
        if (!comm.read) {
            onMarkAsRead(comm.id);
        }
    };

    const handleReply = (text: string) => {
        // Simulate sending a reply
        const reply: Communication = {
            id: `reply-${Date.now()}`,
            sender: 'You',
            subject: `Re: ${selectedMessage?.subject}`,
            preview: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
            body: text,
            timestamp: 'Just now',
            read: true,
            type: selectedMessage?.type || 'Email',
            avatarColor: 'bg-gray-500'
        };
        onSend(reply);
        setSelectedMessage(null); // Close modal after reply
    };

    const handleSendNew = (comm: Communication) => {
        onSend(comm);
        setIsComposeOpen(false);
    };

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('communications.title')}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('communications.subtitle')}</p>
            </div>
            <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {t('communications.unread', { count: communications.filter(c => !c.read).length })}
                </span>
                <button
                    onClick={() => setIsComposeOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
                >
                    <SendIcon className="h-4 w-4 mr-2" />
                    {t('communications.newMessage')}
                </button>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {communications.map((comm) => (
                    <li key={comm.id} className="group relative hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => handleRowClick(comm)}>
                         <div className="block focus:outline-none">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center truncate">
                                         <div className={`flex-shrink-0 h-10 w-10 rounded-full ${comm.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-gray-800`}>
                                            {comm.sender.charAt(0).toUpperCase()}
                                        </div>
                                        <p className="ml-4 text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {comm.sender}
                                        </p>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            comm.type === 'Email' ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800' : 'bg-emerald-50 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800'
                                        }`}>
                                            {comm.type}
                                        </p>
                                        {!comm.read && (
                                            <span className="flex h-2.5 w-2.5 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <p className={`text-sm truncate ${comm.read ? 'text-gray-600 dark:text-gray-300 font-medium' : 'text-gray-900 dark:text-gray-100 font-bold'}`}>
                                            {comm.subject}
                                        </p>
                                        <div className="ml-2 flex items-center text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                                            <time dateTime={comm.timestamp}>{comm.timestamp}</time>
                                        </div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                        {comm.preview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
                {communications.length === 0 && (
                    <li className="px-4 py-16 text-center flex flex-col items-center justify-center">
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
                            <ChatBubbleLeftRightIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('communications.empty.title')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
                            {t('communications.empty.message')}
                        </p>
                    </li>
                )}
            </ul>
        </div>

        {/* Message Detail Modal */}
        <Modal 
            isOpen={!!selectedMessage} 
            onClose={() => setSelectedMessage(null)} 
            title={t('communications.detailsTitle')}
        >
            {selectedMessage && (
                <MessageDetail 
                    message={selectedMessage} 
                    onReply={handleReply} 
                />
            )}
        </Modal>

        {/* Compose Message Modal */}
        <Modal
            isOpen={isComposeOpen}
            onClose={() => setIsComposeOpen(false)}
            title={t('communications.composeTitle')}
        >
            <ComposeMessage 
                onSend={handleSendNew} 
                onCancel={() => setIsComposeOpen(false)} 
            />
        </Modal>
    </div>
  );
};

export default CommunicationsView;