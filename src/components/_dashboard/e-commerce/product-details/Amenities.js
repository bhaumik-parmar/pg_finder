import { Icon } from '@iconify/react';

// material
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

export default function ProductDetailsSumary() {
  const { product } = useSelector((state) => state.product);
  const { amenities } = product;
  return (
    <RootStyle>
      <Typography variant="h5" style={{ 'text-decoration': 'underline' }}>
        Amenities:
      </Typography>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack sx={{ mx: 8 }}>
          <Icon icon="eva:wifi-outline" height={30} width={30} />
          <Typography>Wifi</Typography>
        </Stack>
        <Stack sx={{ mx: 10 }}>
          <Stack sx={{ ml: 5 }}>
            <Icon icon="eva:charging-outline" height={33} width={33} />
          </Stack>
          <Typography>Power Backup</Typography>
        </Stack>
        <Stack sx={{ mx: 10 }}>
          <Icon icon="ic:outline-elevator" height={33} width={33} />
          <Typography>Lift</Typography>
        </Stack>
        <Stack sx={{ mx: 10 }}>
          <Stack sx={{ ml: 1 }}>
            <Icon icon="cil:fridge" height={30} width={30} />
          </Stack>
          <Typography>Fridge</Typography>
        </Stack>
        <Stack sx={{ ml: 8 }}>
          <Stack sx={{ ml: 2 }}>
            <Icon icon="mdi:microwave" height={33} width={33} />
          </Stack>
          <Typography>Microwave</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack>
          <Stack sx={{ ml: 8 }}>
            <Icon icon="healthicons:cleaning-outline" height={40} width={40} />
          </Stack>
          <Typography>Room Cleaning Service</Typography>
        </Stack>
        <Stack sx={{ mx: 11 }}>
          <Stack sx={{ ml: 2 }}>
            <Icon icon="ic:outline-local-laundry-service" height={33} width={33} />
          </Stack>
          <Typography>Laundry</Typography>
        </Stack>
        <Stack sx={{ mx: 8 }}>
          <Stack sx={{ ml: 4 }}>
            <Icon icon="healthicons:treated-water-outline" height={40} width={40} />
          </Stack>
          <Typography>Water Cooler</Typography>
          <Typography variant="body2" sx={{ mx: 5, color: 'text.secondary' }}>
            RO
          </Typography>
        </Stack>
        <Stack sx={{ mx: 7 }}>
          <Stack sx={{ ml: 1 }}>
            <Icon icon="fontisto:person" height={30} width={30} />
          </Stack>
          <Typography>Warden</Typography>
        </Stack>
        <Stack sx={{ ml: 12 }}>
          <Stack sx={{ ml: 1 }}>
            <Icon icon="maki:parking-garage" height={30} width={30} />
          </Stack>
          <Typography>Parking</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack sx={{ ml: 9 }}>
          <Icon icon="icon-park-outline:tv-one" height={33} width={33} />
          <Typography>TV</Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
