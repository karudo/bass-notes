import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import shuffle from 'es-toolkit/compat/shuffle';
import { StringRow } from './Fretboard';
import { notesOtherNames } from './music';
import './TrainNotes.css';
import { TextField, Typography, Stack } from '@mui/material';

export const notes: string[] = ["A", "B", "C", "D", "E", "F", "G"];
function randomNote(): string {
  const n = Math.floor(Math.random() * notes.length);
  return notes[n];
}

function wait(s: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function TrainNotesApp(): JSX.Element {
  const [note, setNote] = useState(randomNote());
  const [altName, setAltName] = useState(false);
  const [show, setShow] = useState('note');
  const [waitSeconds, setWaitSeconds] = useState(5);
  useEffect(() => {
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
      <Typography
        align="center"
        sx={{ fontSize: 108, display: 'flex', justifyContent: 'center' }}
      >
        {altName ? notesOtherNames[note] : note}
      </Typography>
      <Stack direction="row" alignItems="center" sx={{ p: 1 }}>
        <Typography sx={{ mr: 1 }}>Wait period (s):</Typography>
        <TextField
          type="number"
          size="small"
          inputProps={{ min: 1 }}
          value={waitSeconds}
          onChange={(e) => setWaitSeconds(Number(e.target.value))}
          sx={{ width: 80 }}
        />
      </Stack>
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
