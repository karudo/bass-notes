import React from 'react';
import type { JSX } from 'react';
import shuffle from 'es-toolkit/compat/shuffle';
import { StringRow } from './Fretboard';
import { notesOtherNames } from './music';
import './TrainNotes.css';

export const notes: string[] = ["A", "B", "C", "D", "E", "F", "G"];
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
  const [waitSeconds, setWaitSeconds] = React.useState(5);
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
          await wait(waitSeconds);
          if (!isRunning) {
            break;
          }
          setShow('fretboard');
          await wait(waitSeconds);
        }
      }
    })();
    return () => {
      isRunning = false;
    };
  }, [waitSeconds]);
  return (
    <div>
      <div style={{ fontSize: 108, display: 'flex', justifyContent: 'center' }}>
        { altName ? notesOtherNames[note] : note }
      </div>
      <div style={{ padding: '12px 0' }}>
        <label>
          Wait period (s):
          <input
            type="number"
            min="1"
            value={waitSeconds}
            onChange={(e) => setWaitSeconds(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
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
