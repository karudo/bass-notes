import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import shuffle from 'es-toolkit/compat/shuffle';
import { StringRow } from './Fretboard';
import { notesOtherNames } from './music';
import './TrainNotes.css';
import { TextField, Typography, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export const notes: string[] = ["A", "B", "C", "D", "E", "F", "G"];
function randomNote(): string {
  const n = Math.floor(Math.random() * notes.length);
  return notes[n];
}

function wait(s: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export function TrainNotesApp(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const altChance = Number(searchParams.get('altChance') || '10');
  const waitSeconds = Number(searchParams.get('wait') || '5');

  const updateParam = (key: string, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(value));
    setSearchParams(params);
  };

  const [note, setNote] = useState(randomNote());
  const [altName, setAltName] = useState(false);
  const [show, setShow] = useState('note');
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
          setAltName(Math.random() < altChance / 100);
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
  }, [waitSeconds, altChance]);
  return (
    <Stack>
      <Typography
        align="center"
        sx={{ fontSize: 108, display: 'flex', justifyContent: 'center' }}
      >
        {altName ? notesOtherNames[note] : note}
      </Typography>
      <Stack direction="row">
        <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
          <Typography sx={{ mr: 1 }}>Wait period (s):</Typography>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 1 }}
            value={waitSeconds}
            onChange={(e) => updateParam('wait', Number(e.target.value))}
            sx={{ width: 80 }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
          <Typography sx={{ mr: 1 }}>Alt name chance (%):</Typography>
          <TextField
            type="number"
            size="small"
            inputProps={{ min: 1, max: 100 }}
            value={altChance}
            onChange={(e) =>
              updateParam('altChance',
                Math.max(1, Math.min(100, Number(e.target.value)))
              )
            }
            sx={{ width: 80 }}
          />
        </Stack>
      </Stack>
      <Stack sx={{ p: 2 }}>
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
      </Stack>
    </Stack>
  );
}

export default TrainNotesApp;
