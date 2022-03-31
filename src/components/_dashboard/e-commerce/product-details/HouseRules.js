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
        House Rules:
      </Typography>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack>
          <Stack sx={{ ml: 8 }}>
            <Icon icon="simple-line-icons:calender" height={32} width={32} />
          </Stack>
          <Typography sx={{ mx: 4 }}>Notice Period</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            1 Month
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 14 }}>
            <Icon icon="ic:outline-watch-later" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 8 }}>Gate Closing Time</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            11:00 PM
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 8 }}>
            <Icon icon="bi:person" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 4 }}>Visitor Entry</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="mdi:check-circle-outline" color="green" height={20} width={20} />
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 16 }}>
            <Icon icon="mdi:food-turkey" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 12 }}>Non-Veg Food</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="charm:circle-cross" color="red" height={20} width={20} />
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 5 }}>
            <Icon icon="icons8:gender" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 0 }}>Opposite Gender</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="charm:circle-cross" color="red" height={20} width={20} />
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ mt: 3 }}>
        <Stack sx={{ ml: 2 }}>
          <Stack sx={{ ml: 6 }}>
            <Icon icon="cil:smoke" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 4 }}>Smoking</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="charm:circle-cross" color="red" height={20} width={20} />
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 16 }}>
            <Icon icon="mdi:glass-mug-variant" height={40} width={40} />
          </Stack>
          <Typography sx={{ mx: 15 }}>Drinking</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="charm:circle-cross" color="red" height={20} width={20} />
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 5 }}>
            <Icon icon="fluent:music-note-2-16-regular" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 2 }}>Loud music</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="mdi:check-circle-outline" color="green" height={20} width={20} />
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 19 }}>
            <Icon icon="emojione-monotone:party-popper" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 18 }}>Party</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            <Icon icon="mdi:check-circle-outline" color="green" height={20} width={20} />
          </Typography>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
