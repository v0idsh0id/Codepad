'use client';

import React, { useState, useEffect } from 'react';
import { codeSnippets } from '@/lib/codeSnippets';
import { PanelMode, TypingProgress } from '@/types';
import { GuidedTypingPanel } from '@/components/GuidedTypingPanel';
import { PracticePanel } from '@/components/PracticePanel';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { CodeSnippetSelector } from '@/components/CodeSnippetSelector';

export default function Home() {
  const [selectedSnippetId, setSelectedSnippetId] = useState(codeSnippets[0].id);
  const [mode, setMode] = useState<PanelMode>('guided');
  const [progress, setProgress] = useState<TypingProgress>({
    currentIndex: 0,
    correctChars: 0,
    incorrectChars: 0,
    isComplete: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const selectedSnippet = codeSnippets.find(s => s.id === selectedSnippetId) || codeSnippets[0];

  // Initialize dark mode based on system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSnippetChange = (id: string) => {
    setSelectedSnippetId(id);
    setMode('guided');
    setProgress({
      currentIndex: 0,
      correctChars: 0,
      incorrectChars: 0,
      isComplete: false,
    });
  };

  const handleSwitchToPractice = () => {
    setMode('practice');
  };

  const handleBackToGuided = () => {
    setMode('guided');
  };

  const handleProgress = (newProgress: TypingProgress) => {
    setProgress(newProgress);
  };

  const handleComplete = () => {
    // Could add celebration animation or sound here
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Codepad
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn to code through repetition and muscle memory
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Code Snippet Selector */}
      <CodeSnippetSelector
        snippets={codeSnippets}
        selectedId={selectedSnippetId}
        onSelect={handleSnippetChange}
      />

      {/* Progress Indicator (only show in guided mode) */}
      {mode === 'guided' && (
        <ProgressIndicator
          progress={progress}
          totalChars={selectedSnippet.code.length}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {mode === 'guided' ? (
          <GuidedTypingPanel
            targetCode={selectedSnippet.code}
            language={selectedSnippet.language}
            onProgress={handleProgress}
            onComplete={handleComplete}
            onTabPress={handleSwitchToPractice}
          />
        ) : (
          <PracticePanel
            targetCode={selectedSnippet.code}
            language={selectedSnippet.language}
            onBack={handleBackToGuided}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 px-6 py-3">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === 'guided' ? (
            <span>💡 Tip: Type each character carefully. Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> to practice from memory.</span>
          ) : (
            <span>💡 Tip: Type the code from memory and click "Check My Code" when done.</span>
          )}
        </div>
      </footer>
    </div>
  );
}
