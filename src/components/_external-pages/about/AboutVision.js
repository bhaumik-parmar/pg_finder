// material
import { Box, Container, Typography, Grid } from '@mui/material';
//
import { varFadeInUp, varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <img src="/static/about/vision.jpg" alt="about-vision" />

        {/* <Box
          sx={{
            bottom: { xs: 24, md: 80 },
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center'
          }}
        >
          {['logo_amazon', 'logo_hbo', 'logo_ibm', 'logo_lya', 'logo_spotify', 'logo_netflix'].map((logo) => (
            <MotionInView key={logo} variants={varFadeIn}>
              <Box
                component="img"
                src={`/static/about/${logo}.svg`}
                sx={{
                  m: { xs: 1.5, md: 3 },
                  height: { xs: 24, md: 32 }
                }}
              />
            </MotionInView>
          ))}
        </Box> */}
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Our aim and motto are simple and singular. To provide the guests with a PG that feels like home best
              fitting their needs and the homeowners a guest who fits right in. To attain this we work with homeowners
              and guests to give everyone involved the best possible experience.
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
