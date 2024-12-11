import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { LandingPage } from './landingpage';
import { OperationalScenariosWorkshop } from './components/workshops/OperationalScenariosWorkshop';
// ... autres imports

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workshops/operational-scenarios" element={<OperationalScenariosWorkshop />} />
          {/* ... autres routes */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}; 