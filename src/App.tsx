import React from 'react';
import { FindScaleApp } from './FindScale';
import { TrainNotesApp } from './TrainNotes';

export default function App(): JSX.Element {
  const [app, setApp] = React.useState("TrainNotesApp");
  return (
    <div>
      <div style={ { padding: '12px 0', fontSize: 20 }}>
        <label>
          <input
            type="radio"
            name="app"
            value="TrainNotesApp"
            checked={app === 'TrainNotesApp'}
            onChange={() => setApp('TrainNotesApp')}
          />
          TrainNotesApp
        </label>
        <label>
          <input
            type="radio"
            name="app"
            value="FindScaleApp"
            checked={app === 'FindScaleApp'}
            onChange={() => setApp('FindScaleApp')}
          />
          FindScaleApp
        </label>
      </div>
      {app === 'TrainNotesApp' && <TrainNotesApp/>}
      {app === 'FindScaleApp' && <FindScaleApp/>}
    </div>
  );
}
