import React from 'react';
import { InformationCircleIcon } from './icons/Icons';

interface WIPBannerProps {
  title: string;
  message: string;
}

const WIPBanner: React.FC<WIPBannerProps> = ({ title, message }) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-800">{title}</p>
          <p className="mt-1 text-sm text-yellow-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default WIPBanner;