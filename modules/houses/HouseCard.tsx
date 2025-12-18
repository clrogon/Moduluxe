import React from 'react';
import { House } from '../../shared/types/index';
import StatusPill from '../../components/ui/StatusPill';
import { EyeIcon, PencilIcon, BuildingIcon } from '../../components/ui/icons/Icons';
import { useTranslation } from '../../core/i18n/LanguageContext';

interface HouseCardProps {
    house: House;
    onViewDetails: (house: House) => void;
    onEdit: (house: House) => void;
}

const HouseCard: React.FC<HouseCardProps> = ({ house, onViewDetails, onEdit }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                {house.imageUrl ? (
                    <img 
                        src={house.imageUrl} 
                        alt={house.address} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <BuildingIcon className="h-16 w-16 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <StatusPill status={house.status} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-bold text-lg truncate">{house.address}</p>
                    <p className="text-white/80 text-sm">{house.type}</p>
                </div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex-1">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                        ${house.rent.toLocaleString()} <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/ month</span>
                    </p>
                    
                    {house.amenities && house.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {house.amenities.slice(0, 3).map(amenity => (
                                <span key={amenity} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                                    {amenity}
                                </span>
                            ))}
                            {house.amenities.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                                    +{house.amenities.length - 3} more
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700 mt-2">
                    <button 
                        onClick={() => onViewDetails(house)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center font-medium"
                    >
                        <EyeIcon className="h-4 w-4 mr-1.5" />
                        {t('common.viewDetailsFor')}
                    </button>
                    <button 
                        onClick={() => onEdit(house)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 flex items-center font-medium"
                    >
                        <PencilIcon className="h-4 w-4 mr-1.5" />
                        {t('common.edit')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;