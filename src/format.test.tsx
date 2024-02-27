import { parseNumber } from '@/src/format';
import { describe, expect, it } from '@jest/globals';

describe('parseNumber', () => {
  it('converts a simple number', () => {
    expect(parseNumber('42')).toBe(42);
  });
  it('converts a fractional number', () => {
    expect(parseNumber('42.5')).toBe(42.5);
  });
  it('converts a fractional number when using a comma', () => {
    expect(parseNumber('42,5')).toBe(42.5);
  });
  it('ignores other characters', () => {
    expect(parseNumber('42,5x')).toBe(42.5);
  });
  it('supports 0', () => {
    expect(parseNumber('0')).toBe(0);
  });
  it('defaults to NULL', () => {
    expect(parseNumber('abcd')).toBeNull();
  });
});
