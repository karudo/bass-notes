import React from 'react';
import type { JSX } from 'react';
import { FindScaleApp } from './FindScale';
import { TrainNotesApp } from './TrainNotes';
import {
  CssBaseline,
  Tabs,
  Tab,
  Stack
} from '@mui/material';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Link as RouterLink
} from 'react-router-dom';

export default function App(): JSX.Element {
  const location = useLocation();
  const current = location.pathname.includes('find-scale') ? '/find-scale' : '/train-notes';

  return (
    <React.Fragment>
      <CssBaseline />
      <Stack sx={{ p: 2 }}>
        <Tabs value={current} textColor="primary" indicatorColor="primary">
          <Tab label="TrainNotesApp" value="/train-notes" component={RouterLink} to="/train-notes" />
          <Tab label="FindScaleApp" value="/find-scale" component={RouterLink} to="/find-scale" />
        </Tabs>
      </Stack>
      <Routes>
        <Route path="/train-notes" element={<TrainNotesApp />} />
        <Route path="/find-scale" element={<FindScaleApp />} />
        <Route path="*" element={<Navigate to="/train-notes" replace />} />
      </Routes>
    </React.Fragment>
  );
}
