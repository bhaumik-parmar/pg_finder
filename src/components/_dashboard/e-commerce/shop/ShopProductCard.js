import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Label from '../../../Label';

import ColorPreview from '../../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, image, add, price, status, category } = product;
  const key = name.split(' ').join('');
  // const linkTo = `${PATH_DASHBOARD.eCommerce.root}/pg/${paramCase(name)}`;
  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/pg/${key}`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {category && (
          <Label
            variant="filled"
            // eslint-disable-next-line prettier/prettier
            color={(category === 'Girls' && 'error') || (category === 'Both' && 'warning') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {/* <Label
            variant="filled"
            // eslint-disable-next-line prettier/prettier
            color={status ? 'info': 'error'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          > */}
            {category}
          </Label>
        )}
        <ProductImgStyle alt={name} src={image[0].preview} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Label
            variant="outlined"
            // eslint-disable-next-line prettier/prettier
            color={status ? 'success' : 'error'}
          >
            {status ? 'Available' : 'filled'}
          </Label>
          {/* <Label
            variant="outlined"
            // eslint-disable-next-line prettier/prettier
            color="success"
          >
            Available
          </Label> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {/* {priceSale && `₹${fCurrency(priceSale)}`} */}
            </Typography>
            &nbsp;
            {`₹${fCurrency(price)}`}
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography variant="subtitle2">
            Address:
            <Typography variant="body2" sx={{ color: 'text.secondary' }} paragraph>
              {add}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
