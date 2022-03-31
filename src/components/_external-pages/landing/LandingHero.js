import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import flashFill from '@iconify/icons-eva/flash-fill';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
// material
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { varFadeIn, varFadeInUp, varWrapEnter, varFadeInRight } from '../../animate';
import 'firebase/compat/firestore';
import db from '../../../config';
// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center'
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left'
  }
}));

const HeroOverlayStyle = styled(motion.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const HeroImgStyle = styled(motion.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '48vh'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const role = ['pg_owner', 'customer'];
  const navigate = useNavigate();

  function users(data) {
    // db.collection('Role').add({ role: data });
    navigate(`/auth/login/${data}`);
    localStorage.setItem('role', data);
  }
  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <HeroOverlayStyle alt="overlay" src="/static/homePagePic.jpg" variants={varFadeIn} />

        {/* <HeroImgStyle alt="hero" src="/static/home/hero.png" variants={varFadeInUp} /> */}

        <Container maxWidth="lg">
          <ContentStyle>
            <Box style={{ display: 'flex' }}>
              <Box>
                <motion.div variants={varFadeInRight}>
                  <Typography variant="h1" sx={{ color: 'common.white' }}>
                    Just a <br />
                    step away <br /> from &nbsp;finding greatness.
                  </Typography>
                </motion.div>
              </Box>
              <Box style={{ display: 'flex', marginLeft: '10vw', marginTop: '7vw' }}>
                <motion.div variants={varFadeInRight}>
                  <LoadingButton
                    variant="outlined"
                    startIcon={<ExitToAppIcon />}
                    style={{ width: '10vw', height: '3vw' }}
                    onClick={() => users(role[0])}
                  >
                    <Typography variant="h4">PG Owner</Typography>
                  </LoadingButton>
                </motion.div>
                <motion.div variants={varFadeInRight} style={{ marginLeft: '3vw' }}>
                  <LoadingButton
                    variant="outlined"
                    startIcon={<ExitToAppIcon />}
                    style={{ width: '10vw', height: '3vw' }}
                    onClick={() => users(role[1])}
                  >
                    <Typography variant="h4">Customer</Typography>
                  </LoadingButton>
                </motion.div>
              </Box>
            </Box>
            {/* <Stack
              component={motion.div}
              variants={varFadeInRight}
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <img alt="sketch icon" src="/static/home/ic_sketch_small.svg" width={20} height={20} />

              <Link
                underline="always"
                href="https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0"
                target="_blank"
                color="common.white"
                sx={{ typography: 'body2' }}
              >
                Preview in Sketch Cloud
              </Link>
            </Stack> */}

            {/* <motion.div variants={varFadeInRight}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.root}
                startIcon={<Icon icon={flashFill} width={20} height={20} />}
              >
                Live Preview
              </Button>
            </motion.div> */}

            {/* <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <motion.img variants={varFadeInRight} src="/static/home/ic_sketch.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_figma.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_material.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_react.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_js.svg" />
              <motion.img variants={varFadeInRight} src="/static/home/ic_ts.svg" />
            </Stack> */}
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
