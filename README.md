# Codepad

A coding tutorial application for learning through repetition and muscle memory.

## Features

### 🎯 Guided Typing Mode
- Display code snippets as ghost text (greyed-out placeholders)
- Character-by-character typing validation with visual feedback
- Progress tracking with accuracy metrics
- Prevents skipping ahead - sequential typing only
- Real-time error highlighting

### 🧠 Memory Practice Mode
- Blank Monaco Editor for typing code from memory
- Full syntax highlighting and code editing features
- Code validation with similarity scoring
- Success/error feedback

### ✨ Additional Features
- 🌓 Dark mode support with system preference detection
- 📱 Fully responsive design for desktop and tablet
- ⌨️ Keyboard shortcuts (Tab to switch modes)
- 🎨 Clean, distraction-free interface
- 📝 8 sample code snippets (JavaScript, Python, TypeScript, React)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/v0idsh0id/Codepad.git
cd Codepad
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Editor:** Monaco Editor (VS Code's editor component)
- **State Management:** React Hooks

## Project Structure

```
Codepad/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── GuidedTypingPanel.tsx
│   ├── PracticePanel.tsx
│   ├── ProgressIndicator.tsx
│   └── CodeSnippetSelector.tsx
├── lib/                   # Utility libraries
│   └── codeSnippets.ts   # Sample code snippets
├── types/                 # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets

```

## Usage

1. **Select a code snippet** from the dropdown menu
2. **Guided Mode:** Type each character to replace the ghost text
   - Green text indicates correct characters
   - Red text indicates errors
   - Track your progress and accuracy
3. **Press Tab** to switch to Practice Mode
4. **Practice Mode:** Type the code from memory
   - Use the Monaco Editor with full editing features
   - Click "Check My Code" to validate
   - Get feedback on accuracy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC