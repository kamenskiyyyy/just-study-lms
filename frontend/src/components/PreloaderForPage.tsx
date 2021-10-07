import { Box, CircularProgress, Container } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export function PreloaderForPage() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CircularProgress sx={{ m: 10 }} />
      </Container>
    </Box>
  );
}
