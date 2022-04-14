import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';
import edit2Fill from '@iconify/icons-eva/edit-2-fill';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// material
import { styled } from '@mui/material/styles';
import { Grid, Rating, Button, Typography, LinearProgress, Stack } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number
};

function ProgressItem({ star }) {
  // const { name, starCount, reviewCount } = star;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{`${star?.i} Star`}</Typography>
      <LinearProgress
        variant="determinate"
        value={star?.percan}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider'
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}>
        {fShortenNumber(star?.star)}
      </Typography>
    </Stack>
  );
}

ProductDetailsReviewOverview.propTypes = {
  product: PropTypes.object,
  onOpen: PropTypes.func
};

export default function ProductDetailsReviewOverview({ product, onOpen }) {
  // const { totalRating, totalReview, ratings } = product;
  console.log(
    'product',
    product?.review?.reduce((prev, current) => current?.rating + prev, 0),
    product?.review?.length
  );
  const rat = product?.review?.reduce((prev, current) => current?.rating + prev, 0);
  const ratLength = product?.review?.length;
  const ratingArr = product?.review?.map((item) => item?.rating);
  const Arr = [];
  const numro = 6;
  for (let i = 1; i < numro; i += 1) {
    const star = ratingArr?.filter((item) => item === i).length;
    const percan = (star / ratingArr?.length) * 100;
    Arr.push({ i, star, percan });
  }
  // console.log('Arr :>> ', rat / ratLength.toFixed(2));
  // const rating = product?.review?.reduce((prev, current) => current + prev) / product?.review?.length;
  // const total = sumBy(ratings, (star) => star.starCount);

  return (
    <Grid container>
      <GridStyle item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {(rat / ratLength)?.toFixed(1)}/5
        </Typography>
        <RatingStyle readOnly value={ratLength} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(ratLength)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {Arr?.map((item, count) => (
            <ProgressItem key={count} star={item} />
          ))}
        </Stack>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <ScrollLink to="move_add_review" spy smooth offset={-200}>
          <Button size="large" onClick={onOpen} variant="outlined" startIcon={<Icon icon={edit2Fill} />}>
            Write your review
          </Button>
        </ScrollLink>
      </GridStyle>
    </Grid>
  );
}
