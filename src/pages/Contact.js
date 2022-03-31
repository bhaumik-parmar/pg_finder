// material
import { styled } from '@mui/material/styles';
import { Grid, Container, Stack } from '@mui/material';
// components
import MainFooter from '../layouts/main/MainFooter';
import Page from '../components/Page';
import { ContactHero, ContactForm, ContactMap } from '../components/_external-pages/contact';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <RootStyle title="PG Finder | Contact us">
      <ContactHero />
      <Container sx={{ my: 10 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <ContactForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <img alt="contact" src="/static/illustrations/contactUsPic.jpg" height={700} width={650} />
          </Grid>
        </Grid>
      </Container>
      <Stack sx={{ mt: 3 }}>
        <MainFooter />
      </Stack>
    </RootStyle>
  );
}
