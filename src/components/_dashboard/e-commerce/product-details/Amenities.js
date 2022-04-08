import { Icon } from '@iconify/react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import { useSelector } from '../../../../redux/store';
import { AmenitiesConfig } from './IconsConfig';

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
        {amenities.map((items, count) => {
          const itemObj = AmenitiesConfig.find((item) => item.name === items);
          return (
            itemObj && (
              <Stack sx={{ mx: 5 }}>
                <Icon icon={itemObj.icon} height={35} width={35} />
                <Typography>{itemObj.name}</Typography>
              </Stack>
            )
          );
        })}
      </Stack>
    </RootStyle>
  );
}
