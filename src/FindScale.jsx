import './FindScale.css';
import React from 'react'
import { useState } from "react";

export const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const notesOtherNames = {
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
  "B": "Си"
}

const scales = [
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

function findScale(note, scale) {
  let lastIdx = notes.findIndex((n) => n === note);
  const indexes = [lastIdx];
  for (const s of scale) {
    lastIdx += s;
    indexes.push(lastIdx % 12);
  }
  return indexes.map((i) => notes[i]);
}

function Square({ note, children }) {
  return (
    <div className="square">
      <div className="note">{note}</div>
      {children}
    </div>
  );
}

export function StringRow({ note, scale1, scale2 }) {
  const [rowNotes] = useState(() => {
    const index = notes.findIndex((n) => n === note);
    const rowNotes = [...notes.slice(index), ...notes.slice(0, index)]
    return [...rowNotes, ...rowNotes].slice(0, 15)
  });
  return (
    <div className="row string">
      {rowNotes.map((curNote) => {
        const position1 = scale1.findIndex((n) => n === curNote);
        const position2 = scale2.findIndex((n) => n === curNote);
        return (
          <Square note={curNote} key={curNote}>
            {position1 >= 0 && <div className="position1">{position1 + 1}</div>}
            {position2 >= 0 && <div className="position2">{position2 + 1}</div>}
          </Square>
        );
      })}
    </div>
  );
}

function SelectScale({ note, onChangeNote, scale, onChangeScale }) {
  return (
    <div className="selectScale">
      <div>
        <select value={ note } onChange={ (e) => onChangeNote(e.target.value) }>
          <option value="">Skip</option>
          { notes.map((n) => (
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

export function FindScaleApp() {
  const [strings, setStrings] = useState(4);
  const [curNote1, setCurNote1] = useState("C");
  const [curNote2, setCurNote2] = useState("");
  const [curScale1, setCurScale1] = useState(0);
  const [curScale2, setCurScale2] = useState(0);
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
