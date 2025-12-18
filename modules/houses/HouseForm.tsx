
import React, { useState, useEffect } from 'react';
import { House, HouseStatus } from '../../shared/types/index';
import { useTranslation } from '../../core/i18n/LanguageContext';
import { XMarkIcon } from '../../components/ui/icons/Icons';
import { useToast } from '../../core/context/ToastContext';

interface HouseFormProps {
  initialData?: House | null;
  onSubmit: (house: House) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

const HouseForm: React.FC<HouseFormProps> = ({ initialData, onSubmit, onCancel, onDelete }) => {
  const [address, setAddress] = useState('');
  const [type, setType] = useState<'Apartment' | 'House' | 'Condo'>('Apartment');
  const [rent, setRent] = useState('');
  const [status, setStatus] = useState<HouseStatus>('Available');
  const [imageUrl, setImageUrl] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState('');
  const { t } = useTranslation();
  const { showToast } = useToast();

  useEffect(() => {
      if (initialData) {
          setAddress(initialData.address);
          setType(initialData.type);
          setRent(initialData.rent.toString());
          setStatus(initialData.status);
          setImageUrl(initialData.imageUrl || '');
          setAmenities(initialData.amenities || []);
      } else {
          setAddress('');
          setType('Apartment');
          setRent('');
          setStatus('Available');
          setImageUrl('');
          setAmenities([]);
      }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!address.trim()) {
      showToast('error', 'Address is required');
      return;
    }
    const rentValue = Number(rent);
    if (isNaN(rentValue) || rentValue <= 0) {
      showToast('error', 'Rent must be a positive number');
      return;
    }

    const newHouse: House = {
      id: initialData ? initialData.id : `h-${Date.now()}`,
      address,
      type,
      rent: rentValue,
      status,
      imageUrl: imageUrl || undefined,
      amenities: amenities
    };
    onSubmit(newHouse);
    showToast('success', initialData ? 'Property updated successfully' : 'Property added successfully');
  };

  const handleDelete = () => {
    if (initialData && onDelete) {
        if (window.confirm(t('houses.form.deletePrompt', { address: initialData.address }))) {
            onDelete(initialData.id);
            showToast('info', 'Property deleted');
        }
    }
  };

  const handleAmenityKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          const val = amenityInput.trim();
          if (val) {
              if (amenities.includes(val)) {
                  showToast('error', 'Amenity already exists');
                  return;
              }
              setAmenities([...amenities, val]);
              setAmenityInput('');
          }
      }
  };

  const removeAmenity = (index: number) => {
      setAmenities(amenities.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('houses.form.address')}</label>
        <input
          type="text"
          id="address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="123 Main St"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('houses.form.propertyType')}</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>
        </div>

        <div>
          <label htmlFor="rent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('houses.form.rent')}</label>
          <input
            type="number"
            id="rent"
            required
            min="0"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="1500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amenities</label>
        <div className="mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 flex flex-wrap gap-2 min-h-[42px]">
            {amenities.map((amenity, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {amenity}
                    <button 
                        type="button" 
                        onClick={() => removeAmenity(index)}
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 dark:hover:bg-blue-800 focus:outline-none"
                    >
                        <XMarkIcon className="h-3 w-3" />
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={handleAmenityKeyDown}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 min-w-[120px]"
                placeholder="Type & press Enter..."
            />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('houses.form.status')}</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as HouseStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
         {initialData && onDelete ? (
             <button
                 type="button"
                 onClick={handleDelete}
                 className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
             >
                 {t('common.delete')}
             </button>
         ) : <div></div>}
         
        <div className="flex space-x-3">
            <button
            type="button"
            onClick={onCancel}
            className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            {t('common.cancel')}
            </button>
            <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            {initialData ? t('common.save') : t('houses.addProperty')}
            </button>
        </div>
      </div>
    </form>
  );
};

export default HouseForm;
