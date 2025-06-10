import './FindScale.css';
import React, { useState } from 'react';
import type { JSX } from 'react';
import { chromaticNotes, findScale } from './music';
import { StringRow } from './Fretboard';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

const scales: { name: string; scale: number[] }[] = [
  {
    name: "Chord Major",
    scale: [4, 3]
  },
  {
    name: "Chord Minor",
    scale: [3, 4]
  },
  {
    name: "Chord Dim",
    scale: [3, 3, 3]
  },
  {
    name: "Scale Major",
    scale: [2, 2, 1, 2, 2, 2, 1]
  },
  {
    name: "Scale Minor",
    scale: [2, 1, 2, 2, 1, 2, 2]
  },
  {
    name: "Penta Major",
    scale: [2, 2, 3, 2]
  },
  {
    name: "Penta Minor",
    scale: [3, 2, 2, 3]
  }
];



interface SelectScaleProps {
  note: string;
  onChangeNote: (value: string) => void;
  scale: number;
  onChangeScale: (value: number) => void;
}

function SelectScale({ note, onChangeNote, scale, onChangeScale }: SelectScaleProps): JSX.Element {
  return (
    <Stack className="selectScale">
      <FormControl size="small">
        <InputLabel id="note-label">Note</InputLabel>
        <Select
          labelId="note-label"
          label="Note"
          value={note}
          onChange={(e) => onChangeNote(e.target.value)}
        >
          <MenuItem value="">Skip</MenuItem>
          {chromaticNotes.map((n) => (
            <MenuItem value={n} key={n}>
              {n}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        {scales.map((sc) => (
          <Typography key={sc.name} variant="body2">
            {sc.name}: {note && findScale(note, sc.scale).join(', ')}
          </Typography>
        ))}
      </div>
      <FormControl size="small">
        <InputLabel id="scale-label">Scale</InputLabel>
        <Select
          labelId="scale-label"
          label="Scale"
          value={scale}
          onChange={(e) => onChangeScale(Number(e.target.value))}
        >
          {scales.map((s, index) => (
            <MenuItem value={index} key={index}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export function FindScaleApp(): JSX.Element {
  const [strings, setStrings] = useState<number>(4);
  const [curNote1, setCurNote1] = useState<string>('C');
  const [curNote2, setCurNote2] = useState<string>('');
  const [curScale1, setCurScale1] = useState<number>(0);
  const [curScale2, setCurScale2] = useState<number>(0);
  const scale1 = curNote1 ? findScale(curNote1, scales[curScale1].scale) : [];
  const scale2 = curNote2 ? findScale(curNote2, scales[curScale2].scale) : [];
  return (
    <div className="App">
      <Stack direction="row" spacing={4} sx={{ mb: 3, p: 2 }}>
        <SelectScale
          note={curNote1}
          onChangeNote={setCurNote1}
          scale={curScale1}
          onChangeScale={setCurScale1}
        />
        <SelectScale
          note={curNote2}
          onChangeNote={setCurNote2}
          scale={curScale2}
          onChangeScale={setCurScale2}
        />
      </Stack>

      <Stack sx={{ p: 2 }}>
        <StringRow note="G" scale1={scale1} scale2={scale2} />
        <StringRow note="D" scale1={scale1} scale2={scale2} />
        <StringRow note="A" scale1={scale1} scale2={scale2} />
        <StringRow note="E" scale1={scale1} scale2={scale2} />
        {strings === 5 && <StringRow note="B" scale1={scale1} scale2={scale2} />}
      </Stack>
      <Stack sx={{ p: 2 }}>
        <RadioGroup
          row
          value={strings.toString()}
          onChange={(e) => setStrings(Number((e.target as HTMLInputElement).value))}
        >
          <FormControlLabel value="4" control={<Radio />} label="4 strings" />
          <FormControlLabel value="5" control={<Radio />} label="5 strings" />
        </RadioGroup>
      </Stack>
    </div>
  );
}
