import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import { Box, Input, Slide, Button, InputAdornment, ClickAwayListener } from '@mui/material';
import firebase from 'firebase/compat/app';
import { useSelector } from '../../redux/store';
// components
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

function applyFilter(products, filters) {
  if (filters.city.length > 0) {
    products = products.filter((_product) => {
      let bool = false;
      for (let i = 0; i <= filters?.city?.length - 1; i += 1) {
        const boolPrev = bool;
        if (i === 0) {
          bool = _product.city?.includes(filters?.city[i]);
        } else {
          bool = _product.city?.includes(filters?.city[i]) && boolPrev;
        }
      }
      return bool;
    });
  }
}
// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const [pgCityData, setPgCityData] = useState([]);
  // const { products, filters } = useSelector((state) => state.product);
  // const filteredProducts = applyFilter(products, filters);
  console.log('pgCityData', pgCityData);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        const temp = [];
        if (user) {
          const docRef = firebase.firestore().collection('PGdetails');
          docRef
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                temp.push(doc.data());
              });
              console.log('tempCity:', temp);
              setPgCityData(temp);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );
  const cities = pgCityData.map((item) => item.city);
  console.log('city :>> ', cities);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = (e) => {
    // setCity(e.target.value);
    setOpen(false);
    console.log('e.target.value :>> ', e.target.value);
  };

  const searchCity = (e) => {
    const searchArr = pgCityData.filter((item) => item.city.toLowerCase().includes(e.target.value));
    console.log('searchArr', searchArr);
    setPgCityData(searchArr);
  };
  // const filteredProducts = applySortFilter(products, city);

  // const isProductNotFound = filteredProducts.length === 0;
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              onChange={searchCity}
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
