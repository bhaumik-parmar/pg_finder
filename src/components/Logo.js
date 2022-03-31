import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <>
      <div style={{ display: 'flex', textDecoration: 'none' }}>
        <Box component="img" src="/static/illustrations/favicon-96x96.png" sx={{ width: 40, height: 43, ...sx }} />
        <Box style={{ marginLeft: '10px' }}>
          <Typography className="text-24 font-800 logo-text" color="common.black">
            PG
          </Typography>
          <Typography className="text-16 tracking-widest -mt-8 font-700" color="textSecondary">
            Finder
          </Typography>
        </Box>
      </div>
    </>
  );
}
