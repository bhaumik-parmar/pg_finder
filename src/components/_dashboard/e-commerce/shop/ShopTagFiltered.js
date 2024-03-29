import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';
// utils
import getColorName from '../../../../utils/getColorName';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`
}));

const LabelStyle = styled((props) => <Typography component="span" variant="subtitle2" {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`
}));

// ----------------------------------------------------------------------

function labelPriceRange(range) {
  if (range === 'below') {
    return 'Below ₹7000';
  }
  if (range === 'between') {
    return 'Between ₹7000 - ₹9000';
  }
  return 'Above ₹9000';
}

ShopTagFiltered.propTypes = {
  formik: PropTypes.object,
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func
};

export default function ShopTagFiltered({ formik, filters, isShowReset, isDefault, onResetFilter }) {
  const theme = useTheme();
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  // const { category, rooms, colors, food, amenities, priceRange, rating } = filters;
  const { category, rooms, food, amenities, priceRange } = filters;
  const isShow = values !== initialValues && !isShowReset;

  const handleRemoveCategory = (value) => {
    const newValue = filter(category, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('category', newValue);
  };

  const handleRemoveRooms = (value) => {
    const newValue = filter(rooms, (_item) => _item !== value);
    console.log('newValue', newValue);
    handleSubmit();
    setFieldValue('rooms', newValue);
  };

  const handleRemoveFood = (value) => {
    const newValue = filter(food, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('food', newValue);
  };

  const handleRemoveAmenities = (value) => {
    const newValue = filter(amenities, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('amenities', newValue);
  };

  // const handleRemoveColor = (value) => {
  //   const newValue = filter(colors, (_item) => _item !== value);
  //   handleSubmit();
  //   setFieldValue('colors', newValue);
  // };

  const handleRemovePrice = () => {
    handleSubmit();
    setFieldValue('priceRange', '');
  };

  // const handleRemoveRating = () => {
  //   handleSubmit();
  //   setFieldValue('rating', '');
  // };

  return (
    <RootStyle>
      {category.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Category:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {category.map((_category) => (
              <Chip
                key={_category}
                label={_category}
                size="small"
                onDelete={() => handleRemoveCategory(_category)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {rooms.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Room Type:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {rooms.map((_rooms) => (
              <Chip
                key={_rooms}
                label={_rooms}
                size="small"
                onDelete={() => handleRemoveRooms(_rooms)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {food.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Food:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {food.map((_food) => (
              <Chip key={_food} label={_food} size="small" onDelete={() => handleRemoveFood(_food)} sx={{ m: 0.5 }} />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {amenities.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Amenities:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {amenities.map((_amenities) => (
              <Chip
                key={_amenities}
                label={_amenities}
                size="small"
                onDelete={() => handleRemoveAmenities(_amenities)}
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )}

      {/* {colors.length > 0 && (
        <WrapperStyle>
          <LabelStyle>Colors:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            {colors.map((color) => (
              <Chip
                key={color}
                label={getColorName(color)}
                size="small"
                onDelete={() => handleRemoveColor(color)}
                sx={{
                  m: 0.5,
                  bgcolor: color,
                  color: theme.palette.getContrastText(color),
                  ...((color === '#FFFFFF' || color === '#000000') && {
                    border: `solid 1px ${theme.palette.grey[500_32]}`,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.disabled'
                    }
                  })
                }}
              />
            ))}
          </Stack>
        </WrapperStyle>
      )} */}

      {priceRange && (
        <WrapperStyle>
          <LabelStyle>Price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={labelPriceRange(priceRange)} onDelete={handleRemovePrice} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {/* {rating && (
        <WrapperStyle>
          <LabelStyle>Rating:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={sentenceCase(rating)} onDelete={handleRemoveRating} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )} */}

      {isShow && !isDefault && (
        <Button
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
