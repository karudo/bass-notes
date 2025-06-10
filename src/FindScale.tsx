import './FindScale.css';
import React, { useState } from 'react';
import type { JSX } from 'react';
import { chromaticNotes, findScale } from './music';
import { StringRow } from './Fretboard';

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
    <div className="selectScale">
      <div>
        <select value={ note } onChange={ (e) => onChangeNote(e.target.value) }>
          <option value="">Skip</option>
          { chromaticNotes.map((n) => (
            <option value={ n } key={ n }>
              { n }
            </option>
          )) }
        </select>
      </div>
      <div>
      {scales.map((sc) => (
          <div key={ sc.name }>
            {sc.name}: {note && findScale(note, sc.scale).join(", ")}
          </div>
        ))}
      </div>
      <div>
        <select
          value={scale}
          onChange={(e) => onChangeScale(+e.target.value)}
        >
          {scales.map((s, index) => (
            <option value={index} key={index}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
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
      <div style={{ display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', gap: 32, marginBottom: '24px' }}>
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
      </div>

      <div>
        <StringRow note="G" scale1={scale1} scale2={scale2} />
        <StringRow note="D" scale1={scale1} scale2={scale2} />
        <StringRow note="A" scale1={scale1} scale2={scale2} />
        <StringRow note="E" scale1={scale1} scale2={scale2} />
        {strings === 5 && <StringRow note="B" scale1={scale1} scale2={scale2} />}
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="strings"
            value="4"
            checked={strings === 4}
            onChange={() => setStrings(4)}
          />
          4 strings
        </label>
        <label>
          <input
            type="radio"
            name="strings"
            value="5"
            checked={strings === 5}
            onChange={() => setStrings(5)}
          />
          5 strings
        </label>
      </div>
    </div>
  );
}
