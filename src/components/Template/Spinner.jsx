import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "8rem"
      }}>
        <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            zIndex: 9999,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}>
            <CircularProgress sx={{
                    color: '#00404f',
                    width: '100px',
                    height: '100px',
            }} />
        </Box>
    </Box>
  );
}