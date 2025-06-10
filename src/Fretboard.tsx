import React, { useState } from 'react';
import type { JSX } from 'react';
import { chromaticNotes } from './music';
import './FindScale.css';

interface SquareProps {
  note: string;
  children?: React.ReactNode;
}

export function Square({ note, children }: SquareProps): JSX.Element {
  return (
    <div className="square">
      <div className="note">{note}</div>
      {children}
    </div>
  );
}

interface StringRowProps {
  note: string;
  scale1: string[];
  scale2: string[];
}

export function StringRow({ note, scale1, scale2 }: StringRowProps): JSX.Element {
  const [rowNotes] = useState(() => {
    const index = chromaticNotes.findIndex((n) => n === note);
    const rowNotes = [...chromaticNotes.slice(index), ...chromaticNotes.slice(0, index)];
    return [...rowNotes, ...rowNotes].slice(0, 15);
  });
  return (
    <div className="row string">
      {rowNotes.map((curNote, i) => {
        const position1 = scale1.findIndex((n) => n === curNote);
        const position2 = scale2.findIndex((n) => n === curNote);
        return (
          <Square note={curNote} key={`${curNote}-${i}`}>
            {position1 >= 0 && <div className="position1">{position1 + 1}</div>}
            {position2 >= 0 && <div className="position2">{position2 + 1}</div>}
          </Square>
        );
      })}
    </div>
  );
}
