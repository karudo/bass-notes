import React, { useState } from 'react';
import type { JSX } from 'react';
import { FindScaleApp } from './FindScale';
import { TrainNotesApp } from './TrainNotes';
import { CssBaseline, RadioGroup, FormControlLabel, Radio, Stack } from '@mui/material';

export default function App(): JSX.Element {
  const [app, setApp] = useState("TrainNotesApp");
  return (
    <React.Fragment>
      <CssBaseline />
      <Stack sx={{ p: 2 }}>
        <RadioGroup
          row
          value={app}
          onChange={(e) => setApp((e.target as HTMLInputElement).value)}
        >
          <FormControlLabel
            value="TrainNotesApp"
            control={<Radio />}
            label="TrainNotesApp"
          />
          <FormControlLabel
            value="FindScaleApp"
            control={<Radio />}
            label="FindScaleApp"
          />
        </RadioGroup>
      </Stack>
      {app === 'TrainNotesApp' && <TrainNotesApp/>}
      {app === 'FindScaleApp' && <FindScaleApp/>}
    </React.Fragment>
  );
}
