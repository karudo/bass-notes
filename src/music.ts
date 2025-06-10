export const chromaticNotes: string[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export const notesOtherNames: Record<string, string> = {
  "C": "До",
  "C#": "До#",
  "D": "Ре",
  "D#": "Ре#",
  "E": "Ми",
  "F": "Фа",
  "F#": "Фа#",
  "G": "Соль",
  "G#": "Соль#",
  "A": "Ля",
  "A#": "Ля#",
  "B": "Си",
};

export function findScale(note: string, scale: number[]): string[] {
  let lastIdx = chromaticNotes.findIndex((n) => n === note);
  const indexes = [lastIdx];
  for (const s of scale) {
    lastIdx += s;
    indexes.push(lastIdx % 12);
  }
  return indexes.map((i) => chromaticNotes[i]);
}
