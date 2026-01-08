'use client';

import React from 'react';
import { TypingProgress } from '@/types';

interface ProgressIndicatorProps {
  progress: TypingProgress;
  totalChars: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  totalChars,
}) => {
  const percentage = totalChars > 0 ? (progress.currentIndex / totalChars) * 100 : 0;
  const accuracy = progress.currentIndex > 0 
    ? (progress.correctChars / progress.currentIndex) * 100 
    : 100;

  return (
    <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-2">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-medium">{progress.currentIndex} / {totalChars}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
            <div className={`text-lg font-bold ${
              accuracy >= 95 ? 'text-green-600' : 
              accuracy >= 80 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {accuracy.toFixed(0)}%
            </div>
          </div>
        </div>

        {progress.isComplete && (
          <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md text-center font-medium">
            🎉 Excellent! Press Tab to practice from memory.
          </div>
        )}
      </div>
    </div>
  );
};
