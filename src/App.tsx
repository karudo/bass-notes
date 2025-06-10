import React from 'react';
import type { JSX } from 'react';
import { FindScaleApp } from './FindScale';
import { TrainNotesApp } from './TrainNotes';
import {
  CssBaseline,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack
} from '@mui/material';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname.includes('find-scale') ? 'FindScaleApp' : 'TrainNotesApp';

  return (
    <React.Fragment>
      <CssBaseline />
      <Stack sx={{ p: 2 }}>
        <RadioGroup
          row
          value={current}
          onChange={(e) => {
            const value = (e.target as HTMLInputElement).value;
            navigate(value === 'TrainNotesApp' ? '/train-notes' : '/find-scale');
          }}
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
      <Routes>
        <Route path="/train-notes" element={<TrainNotesApp />} />
        <Route path="/find-scale" element={<FindScaleApp />} />
        <Route path="*" element={<Navigate to="/train-notes" replace />} />
      </Routes>
    </React.Fragment>
  );
}
