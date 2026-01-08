import { CodeSnippet } from '@/types';

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'js-hello-world',
    title: 'JavaScript - Hello World',
    language: 'javascript',
    description: 'A simple console.log statement',
    code: `console.log("Hello, World!");`,
  },
  {
    id: 'js-function',
    title: 'JavaScript - Function',
    language: 'javascript',
    description: 'Basic function with parameters',
    code: `function greet(name) {
  return "Hello, " + name + "!";
}

const message = greet("World");
console.log(message);`,
  },
  {
    id: 'js-arrow-function',
    title: 'JavaScript - Arrow Function',
    language: 'javascript',
    description: 'Modern arrow function syntax',
    code: `const add = (a, b) => a + b;
const multiply = (a, b) => {
  return a * b;
};

console.log(add(5, 3));
console.log(multiply(4, 7));`,
  },
  {
    id: 'python-hello',
    title: 'Python - Hello World',
    language: 'python',
    description: 'Simple print statement',
    code: `print("Hello, World!")`,
  },
  {
    id: 'python-function',
    title: 'Python - Function',
    language: 'python',
    description: 'Basic function definition',
    code: `def greet(name):
    return f"Hello, {name}!"

message = greet("World")
print(message)`,
  },
  {
    id: 'python-list-comp',
    title: 'Python - List Comprehension',
    language: 'python',
    description: 'List comprehension example',
    code: `numbers = [1, 2, 3, 4, 5]
squares = [x ** 2 for x in numbers]
print(squares)`,
  },
  {
    id: 'ts-interface',
    title: 'TypeScript - Interface',
    language: 'typescript',
    description: 'Defining a TypeScript interface',
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};`,
  },
  {
    id: 'react-component',
    title: 'React - Functional Component',
    language: 'typescript',
    description: 'Simple React functional component',
    code: `import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;`,
  },
];

export const getSnippetById = (id: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => snippet.id === id);
};

export const getSnippetsByLanguage = (language: string): CodeSnippet[] => {
  return codeSnippets.filter(snippet => snippet.language === language);
};
