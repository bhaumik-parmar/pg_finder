import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

export default function ProductDetailsSumary() {
  return (
    <RootStyle>
      <Typography variant="h5" style={{ 'text-decoration': 'underline' }}>
        Other Charges:
      </Typography>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack>
          <Stack sx={{ ml: 8 }}>
            <Icon icon="majesticons:rupee-circle-line" height={33} width={33} />
          </Stack>
          <Typography sx={{ mx: 3 }}>Deposit Amount</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            ₹26,000
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 13 }}>
            <Icon icon="ic:outline-local-laundry-service" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 12 }}>Laundry</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Available
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
