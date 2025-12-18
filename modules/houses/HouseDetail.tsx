
import React from 'react';
import { House, MaintenanceRequest } from '../../shared/types/index';
import StatusPill from '../../components/ui/StatusPill';
import { BuildingIcon, WrenchScrewdriverIcon } from '../../components/ui/icons/Icons';

interface HouseDetailProps {
  house: House;
  maintenanceRequests: MaintenanceRequest[];
}

const HouseDetail: React.FC<HouseDetailProps> = ({ house, maintenanceRequests }) => {
  const houseRequests = maintenanceRequests.filter(r => r.houseId === house.id);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
          <BuildingIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property Details</h4>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{house.address}</h2>
            <div className="mt-2">
                <StatusPill status={house.status} />
            </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-6 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Property Type</p>
          <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">{house.type}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Rent</p>
          <p className="mt-1 text-lg text-gray-900 dark:text-gray-100">${house.rent.toLocaleString()}</p>
        </div>
         <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Property ID</p>
          <p className="mt-1 text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 inline-block px-2 py-1 rounded">{house.id}</p>
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex items-center mb-4">
            <WrenchScrewdriverIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Maintenance History</h3>
        </div>
        
        {houseRequests.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
            {houseRequests.map(req => (
              <li key={req.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{req.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reported: {req.reportedDate}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <StatusPill status={req.status} />
                    <span className="text-xs text-gray-400 dark:text-gray-500">Priority: {req.priority}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">No maintenance records found for this property.</p>
        )}
      </div>
    </div>
  );
};

export default HouseDetail;