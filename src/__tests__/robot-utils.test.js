import { describe, it, expect } from 'vitest';

import { executeCommands, validateCommands } from '../utils/robot-utils';

describe('Robot Utils', () => {
  const squareRoom = { shape: 'square', size: 5 };
  const circularRoom = { shape: 'circle', size: 5 };

  it('should move forward in a square room', () => {
    const start = { x: 2, y: 2, direction: 'N' };
    const { end } = executeCommands('F', 'english', start, squareRoom);
    expect(end).toEqual({ x: 2, y: 1, direction: 'N' });
  });

  it('should rotate left and right correctly', () => {
    const start = { x: 2, y: 2, direction: 'N' };
    let result = executeCommands('L', 'english', start, squareRoom);
    expect(result.end.direction).toBe('W');
    result = executeCommands('R', 'english', start, squareRoom);
    expect(result.end.direction).toBe('E');
  });

  it('should not move outside square room boundaries', () => {
    const start = { x: 0, y: 0, direction: 'N' };
    const { end } = executeCommands('F', 'english', start, squareRoom);
    expect(end).toEqual(start);
  });

  it('should follow multiple commands correctly', () => {
    const start = { x: 1, y: 1, direction: 'N' };
    const { end } = executeCommands('FRFF', 'english', start, squareRoom);
    expect(end).toEqual({ x: 3, y: 0, direction: 'E' });
  });

  it('should not move outside circular room boundaries', () => {
    const start = { x: 4, y: 3, direction: 'E' };
    const { end } = executeCommands('F', 'english', start, circularRoom);
    expect(end).toEqual(start);
  });

  it('should validate commands correctly', () => {
    expect(validateCommands('FLRF', 'english')).toBe(true);
    expect(validateCommands('XYZ', 'english')).toBe(false);
  });

  it('should work with Swedish commands', () => {
    const start = { x: 2, y: 2, direction: 'N' };
    const { end } = executeCommands('GHGVG', 'swedish', start, squareRoom);
    expect(end).toEqual({ x: 3, y: 0, direction: 'N' });
  });

  it('should work with French commands', () => {
    const start = { x: 2, y: 2, direction: 'N' };
    const { end } = executeCommands('GADAG', 'french', start, squareRoom);
    expect(end).toEqual({ x: 1, y: 1, direction: 'W' });
  });
});
