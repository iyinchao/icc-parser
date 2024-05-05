import { test, expect } from '@jest/globals';
import { parser } from '../src';

test('Basic Test', () => {
  expect(parser(3)).toBe(4)
})
