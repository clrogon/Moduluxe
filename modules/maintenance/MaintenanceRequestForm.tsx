
import React, { useState, useEffect } from 'react';
import { MaintenanceRequest, MaintenancePriority, House, MaintenanceStatus } from '../../shared/types/index';

interface MaintenanceRequestFormProps {
  initialData?: MaintenanceRequest | null;
  houses: House[];
  onSubmit: (req: MaintenanceRequest) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const MaintenanceRequestForm: React.FC<MaintenanceRequestFormProps> = ({ initialData, houses, onSubmit, onCancel, onDelete }) => {
  const [houseId, setHouseId] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<MaintenancePriority>('Low');
  const [status, setStatus] = useState<MaintenanceStatus>('Pending');

  useEffect(() => {
    if (initialData) {
        setHouseId(initialData.houseId);
        setDescription(initialData.description);
        setPriority(initialData.priority);
        setStatus(initialData.status);
    } else {
        setHouseId(houses.length > 0 ? houses[0].id : '');
        setDescription('');
        setPriority('Low');
        setStatus('Pending');
    }
  }, [initialData, houses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!houseId) {
        alert("Please select a property.");
        return;
    }

    const selectedHouse = houses.find(h => h.id === houseId);
    
    const newRequest: MaintenanceRequest = {
      id: initialData ? initialData.id : `m-${Date.now()}`,
      houseId,
      houseName: selectedHouse ? selectedHouse.address : 'Unknown Property',
      description,
      status: initialData ? status : 'Pending', // New requests always Pending
      priority,
      reportedDate: initialData ? initialData.reportedDate : new Date().toISOString().split('T')[0],
    };
    onSubmit(newRequest);
  };

  const handleDelete = () => {
      if (initialData && onDelete) {
          if (window.confirm(`Are you sure you want to delete the maintenance request for "${initialData.houseName}"?`)) {
              onDelete();
          }
      }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="house" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property</label>
        <select
          id="house"
          required
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          disabled={!!initialData}
        >
            {houses.length === 0 && <option value="">No properties available</option>}
            {houses.map(house => (
                <option key={house.id} value={house.id}>{house.address}</option>
            ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Issue Description</label>
        <textarea
          id="description"
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Describe the issue (e.g., Leaking faucet in kitchen)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
            <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            </select>
        </div>

        {initialData && (
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as MaintenanceStatus)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                </select>
            </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
        {initialData && onDelete ? (
             <button
                 type="button"
                 onClick={handleDelete}
                 className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
             >
                 Delete Request
             </button>
         ) : <div></div>}

        <div className="flex space-x-3">
            <button
            type="button"
            onClick={onCancel}
            className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Cancel
            </button>
            <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            {initialData ? 'Update Issue' : 'Report Issue'}
            </button>
        </div>
      </div>
    </form>
  );
};

export default MaintenanceRequestForm;
