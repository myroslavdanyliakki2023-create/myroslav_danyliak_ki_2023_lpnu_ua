#!/usr/bin/env node
import { add } from './math.js';

export function greet(name = 'World'): string {
  return `Hello, ${name}!`;
}

console.log(greet());
console.log(`2 + 3 = ${add(2, 3)}`);
