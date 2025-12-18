import React, { useMemo, useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Modal from '../../components/ui/Modal';
import HouseForm from './HouseForm';
import HouseDetail from './HouseDetail';
import HouseCard from './HouseCard';
import { House, MaintenanceRequest } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { EyeIcon, PencilIcon, BuildingIcon, ClipboardDocumentListIcon, CalendarDaysIcon } from '../../components/ui/icons/Icons';
import EmptyState from '../../components/ui/EmptyState';

interface HousesViewProps {
  houses: House[];
  onAddHouse: (house: House) => void;
  onUpdateHouse: (house: House) => void;
  onDeleteHouse: (id: string) => void;
  maintenanceRequests: MaintenanceRequest[];
  initialSearchTerm?: string;
}

const HousesView: React.FC<HousesViewProps> = ({ houses, onAddHouse, onUpdateHouse, onDeleteHouse, maintenanceRequests, initialSearchTerm }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const { t } = useTranslation();

  const handleViewDetails = (house: House) => {
    setSelectedHouse(house);
    setIsDetailOpen(true);
  };

  const handleEdit = (house: House) => {
    setSelectedHouse(house);
    setIsFormOpen(true);
  };

  const houseColumns = useMemo(() => [
    { key: 'address', label: t('houses.columns.address') },
    { key: 'type', label: t('houses.columns.type') },
    { key: 'rent', label: t('houses.columns.rent'), render: (item: House) => `$${item.rent.toLocaleString()}` },
    { key: 'status', label: t('houses.columns.status'), render: (item: House) => <StatusPill status={item.status} /> },
    { 
      key: 'actions', 
      label: t('common.actions'), 
      render: (item: House) => (
          <div className="flex items-center justify-end space-x-2">
              <button 
                  onClick={(e) => { e.stopPropagation(); handleViewDetails(item); }}
                  className="text-gray-500 hover:text-blue-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                  aria-label={`${t('common.viewDetailsFor')} ${item.address}`}
              >
                  <EyeIcon className="h-5 w-5" />
              </button>
              <button 
                  onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
                  className="text-gray-500 hover:text-green-600 p-1 rounded-full transition-colors dark:text-gray-400 dark:hover:text-green-400"
                  aria-label={`${t('common.edit')} ${item.address}`}
              >
                  <PencilIcon className="h-5 w-5" />
              </button>
          </div>
      )
  }
  ], [t]);

  const handleAddClick = () => {
    setSelectedHouse(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (house: House) => {
    if (selectedHouse) {
      onUpdateHouse(house);
    } else {
      onAddHouse(house);
    }
    setIsFormOpen(false);
    setSelectedHouse(null);
  };

  const handleDelete = (id: string) => {
    onDeleteHouse(id);
    setIsFormOpen(false);
    setSelectedHouse(null);
  };

  return (
    <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-lg inline-flex">
                <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    <span className="flex items-center">
                        <ClipboardDocumentListIcon className="h-4 w-4 mr-2" />
                        {t('bookings.listView')}
                    </span>
                </button>
                <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    <span className="flex items-center">
                        <div className="h-4 w-4 mr-2 grid grid-cols-2 gap-0.5">
                            <div className="bg-current rounded-[1px]"></div><div className="bg-current rounded-[1px]"></div>
                            <div className="bg-current rounded-[1px]"></div><div className="bg-current rounded-[1px]"></div>
                        </div>
                        Grid
                    </span>
                </button>
            </div>

            <button 
                onClick={handleAddClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t('houses.addProperty')}
            </button>
        </div>
        
        {viewMode === 'list' ? (
            <DataTable 
                title={t('houses.tableTitle')}
                columns={houseColumns}
                data={houses}
                initialSearchTerm={initialSearchTerm}
                emptyState={
                    <EmptyState 
                        icon={<BuildingIcon className="h-8 w-8"/>} 
                        title={t('houses.empty.title')}
                        message={t('houses.empty.message')}
                    />
                }
            />
        ) : (
            <>
                {houses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {houses.map(house => (
                            <HouseCard 
                                key={house.id} 
                                house={house} 
                                onViewDetails={handleViewDetails} 
                                onEdit={handleEdit} 
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        icon={<BuildingIcon className="h-8 w-8"/>} 
                        title={t('houses.empty.title')}
                        message={t('houses.empty.message')}
                    />
                )}
            </>
        )}

        {/* Create/Edit Modal */}
        <Modal
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            title={selectedHouse ? t('houses.editTitle') : t('houses.addTitle')}
        >
            <HouseForm 
                initialData={selectedHouse}
                onSubmit={handleSubmit} 
                onCancel={() => { setIsFormOpen(false); setSelectedHouse(null); }}
                onDelete={selectedHouse ? () => handleDelete(selectedHouse.id) : undefined}
            />
        </Modal>

        {/* Detail Modal */}
        <Modal
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={t('houses.detailsTitle')}
        >
            {selectedHouse && (
                <HouseDetail 
                    house={selectedHouse} 
                    maintenanceRequests={maintenanceRequests} 
                />
            )}
        </Modal>
    </div>
  );
};

export default HousesView;