'use client';

import React, { useRef, useEffect, useState } from 'react';
import { TypingProgress } from '@/types';

interface GuidedTypingPanelProps {
  targetCode: string;
  language: string;
  onProgress: (progress: TypingProgress) => void;
  onComplete: () => void;
  onTabPress: () => void;
}

export const GuidedTypingPanel: React.FC<GuidedTypingPanelProps> = ({
  targetCode,
  language,
  onProgress,
  onComplete,
  onTabPress,
}) => {
  const [typedText, setTypedText] = useState('');
  const [errorIndices, setErrorIndices] = useState<Set<number>>(new Set());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Reset when target code changes
    setTypedText('');
    setErrorIndices(new Set());
    textareaRef.current?.focus();
  }, [targetCode]);

  useEffect(() => {
    const currentIndex = typedText.length;
    const correctChars = typedText.split('').filter((char, idx) => char === targetCode[idx]).length;
    const incorrectChars = typedText.length - correctChars;
    const isComplete = typedText === targetCode;

    onProgress({
      currentIndex,
      correctChars,
      incorrectChars,
      isComplete,
    });

    if (isComplete) {
      onComplete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedText, targetCode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key to switch to practice mode
    if (e.key === 'Tab') {
      e.preventDefault();
      onTabPress();
      return;
    }

    // Prevent navigation keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (typedText.length > 0) {
        const newText = typedText.slice(0, -1);
        setTypedText(newText);
        const newErrors = new Set(errorIndices);
        newErrors.delete(typedText.length - 1);
        setErrorIndices(newErrors);
      }
      return;
    }

    // Handle character input
    if (e.key.length === 1 || e.key === 'Enter') {
      e.preventDefault();
      const char = e.key === 'Enter' ? '\n' : e.key;
      const nextIndex = typedText.length;
      
      if (nextIndex < targetCode.length) {
        const newText = typedText + char;
        setTypedText(newText);

        // Check if character matches
        if (char !== targetCode[nextIndex]) {
          const newErrors = new Set(errorIndices);
          newErrors.add(nextIndex);
          setErrorIndices(newErrors);
        } else {
          const newErrors = new Set(errorIndices);
          newErrors.delete(nextIndex);
          setErrorIndices(newErrors);
        }
      }
    }
  };

  const renderCharacters = () => {
    return targetCode.split('').map((char, index) => {
      let className = 'inline-block';
      
      if (index < typedText.length) {
        // Character has been typed
        if (errorIndices.has(index)) {
          className += ' text-red-500 bg-red-100 dark:bg-red-900/30';
        } else {
          className += ' text-green-600 dark:text-green-400';
        }
      } else if (index === typedText.length) {
        // Current character (cursor position)
        className += ' bg-blue-200 dark:bg-blue-900/50 text-gray-400';
      } else {
        // Not yet typed
        className += ' text-gray-400 dark:text-gray-600';
      }

      // Handle special characters
      if (char === '\n') {
        return (
          <span key={index} className={className}>
            ↵<br />
          </span>
        );
      }
      if (char === ' ') {
        return (
          <span key={index} className={className}>
            ·
          </span>
        );
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-300 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-2">Guided Typing Mode</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Type each character to replace the ghost text. Press Tab to switch to Practice Mode.
        </p>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="relative">
          {/* Invisible textarea for keyboard input */}
          <textarea
            ref={textareaRef}
            value={typedText}
            onChange={() => {}} // Controlled but handled by onKeyDown
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 cursor-default"
            style={{ resize: 'none' }}
            autoFocus
            spellCheck={false}
          />
          
          {/* Visual representation */}
          <div 
            className="font-mono text-base leading-relaxed whitespace-pre-wrap cursor-text"
            onClick={() => textareaRef.current?.focus()}
          >
            {renderCharacters()}
          </div>
        </div>
      </div>
    </div>
  );
};
