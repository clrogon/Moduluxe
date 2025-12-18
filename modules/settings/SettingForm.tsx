
import React, { useState } from 'react';
import { AppSetting, SettingCategory } from '../../shared/types/index';

interface SettingFormProps {
  category: SettingCategory;
  onSubmit: (setting: AppSetting) => void;
  onCancel: () => void;
}

const SettingForm: React.FC<SettingFormProps> = ({ category, onSubmit, onCancel }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSetting: AppSetting = {
      id: `s-${Date.now()}`,
      category,
      key,
      value
    };
    onSubmit(newSetting);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
            type="text"
            disabled
            value={category}
            className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 shadow-sm py-2 px-3 text-gray-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="key" className="block text-sm font-medium text-gray-700">Setting Name (Key)</label>
        <input
          type="text"
          id="key"
          required
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Max Upload Size"
        />
      </div>

      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value</label>
        <input
          type="text"
          id="value"
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., 50MB"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Setting
        </button>
      </div>
    </form>
  );
};

export default SettingForm;
