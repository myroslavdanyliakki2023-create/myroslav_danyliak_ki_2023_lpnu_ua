import { describe, test, expect } from 'vitest';
import { add } from '../src/math';
import { greet } from '../src/hello';

describe('math', () => {
  test('BasicAddition', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('NegativeNumbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });
});

describe('hello', () => {
  test('Greeting', () => {
    expect(greet()).toBe('Hello, World!');
  });
});
