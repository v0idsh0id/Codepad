export interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

export interface TypingProgress {
  currentIndex: number;
  correctChars: number;
  incorrectChars: number;
  isComplete: boolean;
}

export type PanelMode = 'guided' | 'practice';

export interface EditorState {
  mode: PanelMode;
  typedText: string;
  targetCode: string;
  progress: TypingProgress;
  errors: number[];
}
