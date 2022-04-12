import React from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

export const RoomInfo = ({ price, room, roomAvailable }) => (
  <Card style={{ background: '#D0D3D4', margin: '10px' }}>
    <Grid container>
      <Grid item xs={15} md={14} lg={16}>
        <Box>
          <Typography
            variant="h5"
            style={{ 'text-decoration': 'underline', marginBottom: '20px', textAlign: 'center' }}
          >
            {room}
          </Typography>

          <Stack direction="row">
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Rent:&nbsp;₹&nbsp;{price}/
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              month
            </Typography>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </Card>
);
