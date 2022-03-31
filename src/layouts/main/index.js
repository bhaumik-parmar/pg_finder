import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 3,
            // textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 3, ml: 65, cursor: 'pointer' }} />
            </ScrollLink>
            <Typography variant="caption" component="p" sx={{ textAlign: 'center' }}>
              © All rights reserved made by &nbsp;
              <Link to="/">pgfinder.com</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
