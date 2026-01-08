'use client';

import React from 'react';
import { CodeSnippet } from '@/types';

interface CodeSnippetSelectorProps {
  snippets: CodeSnippet[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const CodeSnippetSelector: React.FC<CodeSnippetSelectorProps> = ({
  snippets,
  selectedId,
  onSelect,
}) => {
  const languages = Array.from(new Set(snippets.map(s => s.language)));

  return (
    <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <label htmlFor="snippet-select" className="block text-sm font-medium mb-2">
          Choose a Code Snippet:
        </label>
        <select
          id="snippet-select"
          value={selectedId}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {languages.map((language) => (
            <optgroup key={language} label={language.toUpperCase()}>
              {snippets
                .filter((s) => s.language === language)
                .map((snippet) => (
                  <option key={snippet.id} value={snippet.id}>
                    {snippet.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        
        {snippets.find(s => s.id === selectedId)?.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {snippets.find(s => s.id === selectedId)?.description}
          </p>
        )}
      </div>
    </div>
  );
};
