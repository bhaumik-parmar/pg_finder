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
        Food and Kitchen:
      </Typography>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack>
          <Stack sx={{ ml: 8 }}>
            <Icon icon="dashicons:food" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 4 }}>Food Available</Typography>
          <Typography variant="body2" sx={{ mx: 1, color: 'text.secondary', textAlign: 'center' }}>
            Breakfast,Lunch,Dinner, <br /> Meals provided
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 13 }}>
            <Icon icon="emojione-monotone:pot-of-food" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 8 }}>Meals provided</Typography>
          <Typography variant="body2" sx={{ mx: 11, color: 'text.secondary' }}>
            Veg Only
          </Typography>
        </Stack>
        <Stack sx={{ mx: 9 }}>
          <Stack sx={{ ml: 1 }}>
            <Icon icon="cil:fridge" height={32} width={32} />
          </Stack>
          <Typography>Fridge</Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 12 }}>
            <Icon icon="mdi:food-fork-drink" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 8 }}>Food Charges</Typography>
          <Typography variant="body2" sx={{ mx: 8, color: 'text.secondary' }}>
            Included in Rent
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
