'use client';

import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface PracticePanelProps {
  targetCode: string;
  language: string;
  onBack: () => void;
}

export const PracticePanel: React.FC<PracticePanelProps> = ({
  targetCode,
  language,
  onBack,
}) => {
  const [userCode, setUserCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    isCorrect: boolean;
    message: string;
  } | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Reset when switching to practice mode
    setUserCode('');
    setValidationResult(null);
  }, [targetCode]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const validateCode = () => {
    setIsValidating(true);
    
    // Normalize whitespace for comparison
    const normalizedUserCode = userCode.trim();
    const normalizedTargetCode = targetCode.trim();

    setTimeout(() => {
      if (normalizedUserCode === normalizedTargetCode) {
        setValidationResult({
          isCorrect: true,
          message: '🎉 Perfect! You typed the code correctly from memory!',
        });
      } else if (normalizedUserCode.replace(/\s+/g, '') === normalizedTargetCode.replace(/\s+/g, '')) {
        setValidationResult({
          isCorrect: true,
          message: '✅ Great! Minor whitespace differences, but the code is correct!',
        });
      } else {
        const similarity = calculateSimilarity(normalizedUserCode, normalizedTargetCode);
        setValidationResult({
          isCorrect: false,
          message: `❌ Not quite right. You're ${similarity.toFixed(0)}% there. Keep trying!`,
        });
      }
      setIsValidating(false);
    }, 500);
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 100.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return ((longer.length - editDistance) / longer.length) * 100;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  const resetPractice = () => {
    setUserCode('');
    setValidationResult(null);
    editorRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Practice Mode</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            ← Back to Guided Mode
          </button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Type the code from memory without any hints.
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={userCode}
          onChange={(value) => setUserCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex gap-4 items-center">
          <button
            onClick={validateCode}
            disabled={isValidating || !userCode.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium"
          >
            {isValidating ? 'Checking...' : 'Check My Code'}
          </button>
          
          <button
            onClick={resetPractice}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Reset
          </button>

          {validationResult && (
            <div
              className={`flex-1 p-3 rounded-md ${
                validationResult.isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
              }`}
            >
              {validationResult.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
