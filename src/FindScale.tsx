import './FindScale.css';
import React from 'react';
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
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const strings = Number(searchParams.get('strings') || '4');
  const curNote1 = searchParams.get('note1') ?? 'C';
  const curNote2 = searchParams.get('note2') ?? '';
  const curScale1 = Number(searchParams.get('scale1') || '0');
  const curScale2 = Number(searchParams.get('scale2') || '0');

  const updateParam = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);
    if (value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    setSearchParams(params);
  };

  const scale1 = curNote1 ? findScale(curNote1, scales[curScale1].scale) : [];
  const scale2 = curNote2 ? findScale(curNote2, scales[curScale2].scale) : [];
  return (
    <div className="App">
      <Stack direction="row" spacing={4} sx={{ mb: 3, p: 2 }}>
        <SelectScale
          note={curNote1}
          onChangeNote={(v) => updateParam('note1', v)}
          scale={curScale1}
          onChangeScale={(v) => updateParam('scale1', v)}
        />
        <SelectScale
          note={curNote2}
          onChangeNote={(v) => updateParam('note2', v)}
          scale={curScale2}
          onChangeScale={(v) => updateParam('scale2', v)}
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
          onChange={(e) =>
            updateParam('strings', Number((e.target as HTMLInputElement).value))
          }
        >
          <FormControlLabel value="4" control={<Radio />} label="4 strings" />
          <FormControlLabel value="5" control={<Radio />} label="5 strings" />
        </RadioGroup>
      </Stack>
    </div>
  );
}
