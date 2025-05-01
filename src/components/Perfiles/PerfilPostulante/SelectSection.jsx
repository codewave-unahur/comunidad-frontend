import { Card, CardHeader, Box, Typography } from '@mui/material';
import React from 'react';
import jobs from '../../../assets/jobs.svg';
import news from '../../../assets/news.svg';

export default function SelectSection() {
  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader title="Selecciona" />
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '1rem',
              gap: { xs: '1rem', sm: '2rem' },
            }}
          >

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={jobs}
                alt="jobs"
                style={{
                  width: '400px',
               
                  height: '400px',
                }}
              />
              <Typography variant="h5" align="center">
                Ofertas
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <img
                src={news}
                alt="news"
                style={{
                  width: '400px',
               
                  height: '400px',
                }}
              />
              <Typography variant="h5" align="center">
                Noticias
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}
