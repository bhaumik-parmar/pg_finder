// material
import { styled } from '@mui/material/styles';
import { Divider, Stack } from '@mui/material';
// components
import MainFooter from '../layouts/main/MainFooter';
import Page from '../components/Page';
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../components/_external-pages/about';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function About() {
  return (
    <RootStyle title="PG Finder | About us">
      <AboutHero />
      <AboutWhat />
      <AboutVision />
      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />
      {/* <AboutTeam /> */}
      {/* <AboutTestimonials /> */}
      <Stack>
        <MainFooter />
      </Stack>
    </RootStyle>
  );
}
