import { findScale } from '../FindScale';

describe('findScale', () => {
  test('C major scale', () => {
    const major = [2, 2, 1, 2, 2, 2, 1];
    expect(findScale('C', major)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']);
  });

  test('D major scale', () => {
    const major = [2, 2, 1, 2, 2, 2, 1];
    expect(findScale('D', major)).toEqual(['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D']);
  });

  test('A minor scale', () => {
    const minor = [2, 1, 2, 2, 1, 2, 2];
    expect(findScale('A', minor)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A']);
  });
});
