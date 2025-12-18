import React, { useState } from 'react';
import { Document, User, House } from '../../shared/types/index';

interface DocumentFormProps {
    users: User[];
    houses: House[];
    onSubmit: (doc: Document) => void;
    onCancel: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ users, houses, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<'Lease' | 'ID' | 'Proof of Income' | 'Other'>('Lease');
    const [relatedTo, setRelatedTo] = useState(''); // Stores a string like "User:u1" or "House:h1"

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!relatedTo) {
            alert("Please select what this document is related to.");
            return;
        }

        const [relatedType, relatedId] = relatedTo.split(':');
        let relatedName = '';
        if (relatedType === 'User') {
            relatedName = users.find(u => u.id === relatedId)?.name || 'Unknown User';
        } else {
            relatedName = houses.find(h => h.id === relatedId)?.address || 'Unknown House';
        }

        const newDoc: Document = {
            id: `doc-${Date.now()}`,
            name: name,
            type: type,
            uploadDate: new Date().toISOString().split('T')[0],
            fileUrl: '#', // Placeholder for actual file upload logic
            relatedTo: {
                type: relatedType as 'User' | 'House',
                id: relatedId,
                name: relatedName,
            },
        };
        onSubmit(newDoc);
    };

    const formInputClasses = "mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
    const formLabelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
    const formSelectClasses = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="file-upload" className={formLabelClasses}>File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">PDF, PNG, JPG, DOCX up to 10MB</p>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="name" className={formLabelClasses}>Document Name</label>
                <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)} className={formInputClasses} placeholder="e.g., Lease Agreement - 123 Main St" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="type" className={formLabelClasses}>Document Type</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value as any)} className={formSelectClasses}>
                        <option>Lease</option>
                        <option>ID</option>
                        <option>Proof of Income</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="relatedTo" className={formLabelClasses}>Related To</label>
                    <select id="relatedTo" required value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)} className={formSelectClasses}>
                        <option value="" disabled>Select User or Property</option>
                        <optgroup label="Users">
                            {users.map(user => <option key={user.id} value={`User:${user.id}`}>{user.name}</option>)}
                        </optgroup>
                        <optgroup label="Properties">
                            {houses.map(house => <option key={house.id} value={`House:${house.id}`}>{house.address}</option>)}
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={onCancel} className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    Cancel
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Upload Document
                </button>
            </div>
        </form>
    );
};

export default DocumentForm;