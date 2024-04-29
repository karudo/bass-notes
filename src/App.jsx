import './App.css';
import React from 'react'
import { useState, useContext, createContext } from "react";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const scales = [
  {
    name: "Accord Major",
    scale: [4, 3]
  },
  {
    name: "Accord Minor",
    scale: [3, 4]
  },
  {
    name: "Accord Dim",
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

const Cont1 = createContext();
const Cont2 = createContext();

function findScale(note, scale) {
  let lastIdx = notes.findIndex((n) => n === note);
  const indexes = [lastIdx];
  for (const s of scale) {
    lastIdx += s;
    indexes.push(lastIdx % 12);
  }
  return indexes.map((i) => notes[i]);
}

function Square({ note }) {
  const thisScale1 = useContext(Cont1);
  const position1 = thisScale1.findIndex((n) => n === note);
  const thisScale2 = useContext(Cont2);
  const position2 = thisScale2.findIndex((n) => n === note);
  return (
      <div className="square">
        <div className="note">{note}</div>
        {position1 >= 0 && <div className="position1">{position1 + 1}</div>}
        {position2 >= 0 && <div className="position2">{position2 + 1}</div>}
      </div>
  );
}

function StringRow({ note }) {
  const [rowNotes] = useState(() => {
    const index = notes.findIndex((n) => n === note);
    const rowNotes = [...notes.slice(index), ...notes.slice(0, index)]
    return rowNotes;
  });
  return (
      <div className="row">
        {rowNotes.map((n, index) => (
            <Square note={n} key={index} />
        ))}
      </div>
  );
}

export default function App() {
  const [strings, setStrings] = useState(4);
  const [curNote1, setCurNote1] = useState("C");
  const [curNote2, setCurNote2] = useState("");
  const [curScale1, setCurScale1] = useState(0);
  const [curScale2, setCurScale2] = useState(0);
  return (
      <div className="App">
        <div style={{ display: 'flex', marginBottom: '24px' }}>
          <div style={{marginRight: '30px'}}>
            <select value={curNote1} onChange={(e) => setCurNote1(e.target.value)}>
              {notes.map((n) => (
                <option value={n} key={n}>
                  {n}
                </option>
              ))}
            </select>
            {scales.map((sc) => (
              <div key={sc.name}>
                {sc.name}: {findScale(curNote1, sc.scale).join(", ")}
              </div>
            ))}
            <select
              value={curScale1}
              onChange={(e) => setCurScale1(+e.target.value)}
              style={{ marginTop: '12px' }}
            >
              {scales.map((s, index) => (
                <option value={index} key={index}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select value={curNote2} onChange={(e) => setCurNote2(e.target.value)}>
              <option value="">Skip</option>
              {notes.map((n) => (
                <option value={n} key={n}>
                  {n}
                </option>
              ))}
            </select>
            {curNote2 && (
                <>
                  {scales.map((sc) => (
                    <div key={sc.name}>
                      {sc.name}: {findScale(curNote2, sc.scale).join(", ")}
                    </div>
                  ))}
                  <select
                    value={curScale2}
                    onChange={(e) => setCurScale2(+e.target.value)}
                    style={{ marginTop: '12px' }}
                  >
                    {scales.map((s, index) => (
                      <option value={index} key={index}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </>
            )}
          </div>
        </div>

        <Cont2.Provider
          value={curNote2 ? findScale(curNote2, scales[curScale2].scale) : []}
        >
          <Cont1.Provider value={findScale(curNote1, scales[curScale1].scale)}>
            <StringRow note="G" />
            <StringRow note="D" />
            <StringRow note="A" />
            <StringRow note="E" />
            {strings === 5 && <StringRow note="B" />}
          </Cont1.Provider>
        </Cont2.Provider>
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
