import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { divide, filter, includes, orderBy } from 'lodash';
// material
import { Backdrop, Container, Typography, CircularProgress, Stack, Divider } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts, filterProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import fakeRequest from '../../utils/fakeRequest';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar
} from '../../components/_dashboard/e-commerce/shop';
import CartWidget from '../../components/_dashboard/e-commerce/CartWidget';
import MainFooter from '../../layouts/main/MainFooter';

// ----------------------------------------------------------------------

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = filter(products, (_product) => includes(filters.gender, _product.gender));
  }
  if (filters.rooms.length > 0) {
    products = filter(products, (_product) => _product.rooms === filters.rooms);
  }
  if (filters.food.length > 0) {
    products = filter(products, (_product) => _product.food === filters.food);
  }
  if (filters.amenities.length > 0) {
    products = filter(products, (_product) => _product.amenities === filters.amenities);
  }
  if (filters.colors.length > 0) {
    products = filter(products, (_product) => _product.colors.some((color) => filters.colors.includes(color)));
  }
  if (filters.priceRange) {
    products = filter(products, (_product) => {
      if (filters.priceRange === 'below') {
        return _product.price < 7000;
      }
      if (filters.priceRange === 'between') {
        return _product.price >= 7000 && _product.price <= 9000;
      }
      return _product.price > 9000;
    });
  }
  if (filters.rating) {
    products = filter(products, (_product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return _product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}

export default function EcommerceShop() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const { products, sortBy, filters } = useSelector((state) => state.product);
  const filteredProducts = applyFilter(products, sortBy, filters);

  const formik = useFormik({
    initialValues: {
      gender: filters.gender,
      rooms: filters.rooms,
      food: filters.food,
      amenities: filters.amenities,
      colors: filters.colors,
      priceRange: filters.priceRange,
      rating: filters.rating
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } = formik;

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.rooms.length === 0 &&
    values.food.length === 0 &&
    values.amenities.length === 0;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="PG Finder | Home">
      {values && (
        <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      )}

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="PG"
          links={[
            // { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Home',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'PG' }
          ]}
        />

        {!isDefault && (
          <Typography gutterBottom>
            <Typography component="span" variant="subtitle1">
              {filteredProducts.length}
            </Typography>
            &nbsp;Products found
          </Typography>
        )}

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <ShopTagFiltered
            filters={filters}
            formik={formik}
            isShowReset={openFilter}
            onResetFilter={handleResetFilter}
            isDefault={isDefault}
          />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ShopFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ShopProductSort />
          </Stack>
        </Stack>

        <ShopProductList products={filteredProducts} isLoad={!filteredProducts && !initialValues} />
        {/* <CartWidget /> */}
        <Stack sx={{ mt: 3 }}>
          <MainFooter />
        </Stack>
      </Container>
    </Page>
  );
}
