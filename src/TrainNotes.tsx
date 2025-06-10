import React from 'react';
import type { JSX } from 'react';
import shuffle from 'es-toolkit/compat/shuffle';
import { StringRow } from './FindScale';
import './TrainNotes.css';

export const notes: string[] = ["A", "B", "C", "D", "E", "F", "G"];

export const notesOtherNames: Record<string, string> = {
  "A": "Ля",
  "A#": "Ля#",
  "B": "Си",
  "C": "До",
  "C#": "До#",
  "D": "Ре",
  "D#": "Ре#",
  "E": "Ми",
  "F": "Фа",
  "F#": "Фа#",
  "G": "Соль",
  "G#": "Соль#",
};

function randomNote(): string {
  const n = Math.floor(Math.random() * notes.length);
  return notes[n];
}

function wait(s: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function TrainNotesApp(): JSX.Element {
  const [note, setNote] = React.useState(randomNote());
  const [altName, setAltName] = React.useState(false);
  const [show, setShow] = React.useState('note');
  React.useEffect(() => {
    let isRunning = true;
    (async () => {
      while (isRunning) {
        const shuffleNotes = shuffle(notes);
        for (const note of shuffleNotes) {
          if (!isRunning) {
            break;
          }
          setNote(note);
          setAltName(Math.random() < 0.1);
          setShow('note');
          await wait(5);
          if (!isRunning) {
            break;
          }
          setShow('fretboard');
          await wait(5);
        }
      }
    })();
    return () => {
      isRunning = false;
    };
  }, []);
  return (
    <div>
      <div style={{ fontSize: 108, display: 'flex', justifyContent: 'center' }}>
        { altName ? notesOtherNames[note] : note }
      </div>
      <div>
        { show === 'fretboard' && (
          <div>
            <div className="row">
              {Array(15).fill(0).map((_, i) => (
                <div key={i} className="headSquare">
                  {i}
                </div>
              ))}
            </div>
            <StringRow note="G" scale1={ [note] } scale2={ [] }/>
            <StringRow note="D" scale1={ [note] } scale2={ [] }/>
            <StringRow note="A" scale1={ [note] } scale2={ [] }/>
            <StringRow note="E" scale1={ [note] } scale2={ [] }/>
          </div>
        ) }
      </div>
    </div>
  );
}

export default TrainNotesApp;
