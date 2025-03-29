// src/components/payouts/PayoutCalculator.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setRates, calculatePayouts } from '@/lib/features/payoutSlice';

export default function PayoutCalculator() {
  const dispatch = useDispatch<AppDispatch>();
  const { rates, articlesCount, blogsCount, totalPayout } = useSelector((state: RootState) => state.payouts);
  
  const [localRates, setLocalRates] = useState({
    article: rates.article,
    blog: rates.blog,
  });

  useEffect(() => {
    // Sync local rates with Redux
    setLocalRates({
      article: rates.article,
      blog: rates.blog,
    });
  }, [rates]);

  const handleRateChange = (type: 'article' | 'blog', value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalRates(prev => ({
      ...prev,
      [type]: numValue,
    }));
  };

  const saveRates = () => {
    dispatch(setRates(localRates));
    dispatch(calculatePayouts());
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Payout Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="articleRate" className="block text-sm font-medium text-gray-700 mb-1">
            Article Rate ($)
          </label>
          <input
            type="number"
            id="articleRate"
            value={localRates.article}
            onChange={(e) => handleRateChange('article', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            min="0"
            step="0.01"
          />
        </div>
        
        <div>
          <label htmlFor="blogRate" className="block text-sm font-medium text-gray-700 mb-1">
            Blog Rate ($)
          </label>
          <input
            type="number"
            id="blogRate"
            value={localRates.blog}
            onChange={(e) => handleRateChange('blog', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm font-medium text-gray-500">Articles Count</p>
          <p className="text-xl font-semibold text-gray-900">{articlesCount}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm font-medium text-gray-500">Blogs Count</p>
          <p className="text-xl font-semibold text-gray-900">{blogsCount}</p>
        </div>
      </div>
      
      <button
        onClick={saveRates}
        className="w-full md:w-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Calculate Payouts
      </button>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Total Payout</h3>
        <p className="text-3xl font-bold text-primary">${totalPayout.toFixed(2)}</p>
      </div>
    </div>
  );
}