import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { useSelector } from '../../../../redux/store';
import { HouseRulesConfig } from './IconsConfig';
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
  const { houseRules } = product;
  return (
    <RootStyle>
      <Typography variant="h5" style={{ 'text-decoration': 'underline' }}>
        House Rules:
      </Typography>
      <Stack direction="row" sx={{ mt: 1 }}>
        <Stack>
          <Stack sx={{ ml: 5 }}>
            <Icon icon="simple-line-icons:calender" height={32} width={32} />
          </Stack>
          <Typography sx={{ mx: 3 }}>Notice Period</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            1 Month
          </Typography>
        </Stack>
        <Stack>
          <Stack sx={{ ml: 5 }}>
            <Icon icon="ic:outline-watch-later" height={35} width={35} />
          </Stack>
          <Typography sx={{ mx: 3 }}>Gate Closing Time</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            11:00 PM
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 0 }}>
          {houseRules.map((items, count) => {
            const itemObj = HouseRulesConfig.find((item) => item.name === items);
            return (
              itemObj && (
                <Stack sx={{ mx: 3 }}>
                  <Icon icon={itemObj.icon} height={35} width={35} />
                  <Typography>{itemObj.name}</Typography>
                  <Icon icon="charm:circle-cross" color="red" height={20} width={20} />
                </Stack>
              )
            );
          })}
        </Stack>
      </Stack>
    </RootStyle>
  );
}
