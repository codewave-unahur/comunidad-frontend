import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo semitransparente
        zIndex: 1300, // Asegura que esté por encima de otros elementos
      }}
    >
      <CircularProgress
        sx={{
          color: '#2e7d32', // Color verde claro
          width: '80px',
          height: '80px',
        }}
      />
    </Box>
  );
}