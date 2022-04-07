import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import twotoneLibraryBooks from '@iconify/icons-ic/twotone-library-books';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
// import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Stack, Button, Rating, Divider, Typography } from '@mui/material';
// redux
import { useSelector } from '../../../../redux/store';
// import { addCart, onGotoStep } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
//
import { MIconButton } from '../../../@material-extend';
import Label from '../../../Label';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import db from '../../../../config';
// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

export default function ProductDetailsSumary() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { product, checkout } = useSelector((state) => state.product);
  const {
    id,
    name,
    owner,
    add,
    // sizes,
    price,
    cover,
    status,
    category,
    // colors,
    // available,
    totalRating,
    totalReview
    // status
  } = product;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [roomType, setRoomType] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitData = () => {
    enqueueSnackbar('Data Submitted Successfully', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  };

  // const handleChangeR = (event) => {
  //   setRoomType(event.target.value);
  // };

  // const handleOpenR = () => {
  //   setOpen(true);
  // };
  // const alreadyProduct = checkout.cart.map((item) => item.id).includes(id);
  // const isMaxQuantity = checkout.cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  // const onAddCart = (product) => {
  //   dispatch(addCart(product));
  // };

  // const handleBuyNow = () => {
  //   dispatch(onGotoStep(0));
  // };

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   // initialValues: {
  //   //   id,
  //   //   name,
  //   //   cover,
  //   //   // available,
  //   //   price
  //   //   // color: colors[0],
  //   //   // size: sizes[4],
  //   //   // quantity: available < 1 ? 0 : 1
  //   // },
  //   onSubmit: () => {
  //     navigate(PATH_DASHBOARD.eCommerce.checkout);
  //   }
  // });

  // const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  // const handleAddCart = () => {
  //   onAddCart({
  //     ...values,
  //     subtotal: values.price * values.quantity
  //   });
  // };

  return (
    <RootStyle>
      {/* <FormikProvider value={formik}> */}
      {/* <Form autoComplete="off" noValidate> */}
      <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color={status ? 'success' : 'error'}>
        {sentenceCase(status ? 'Available' : 'Filled')}
      </Label>
      <Typography>
        <Label
          variant="filled"
          color={(category === 'Girls' && 'error') || (category === 'Both' && 'warning') || 'info'}
          sx={{
            mt: 2,
            mb: 1
          }}
        >
          {sentenceCase(category)}
        </Label>
      </Typography>

      <Typography variant="h5" paragraph>
        {name}
      </Typography>

      <Stack spacing={0.5} direction="row" alignItems="center" sx={{ mb: 2 }}>
        {/* <Rating value={totalRating} precision={0.1} readOnly /> */}
        Owner:&nbsp;
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* ({fShortenNumber(totalReview)}
              &nbsp; reviews) */}
          {owner}
        </Typography>
      </Stack>

      <Stack direction="row">
        <Typography variant="h4" sx={{ mb: 3 }}>
          ₹&nbsp;{fCurrency(price)}/
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', paddingTop: '6px' }}>
          month
        </Typography>
      </Stack>

      <Stack direction="row">
        <Typography sx={{ mb: 3 }}>Address:&nbsp;&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {add}
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 5 }}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<Icon icon={twotoneLibraryBooks} width={30} height={30} />}
          onClick={() => {
            navigate('/dashboard/pg-finder/checkout');
            localStorage.setItem('PG Name', JSON.stringify({ name }));
          }}
        >
          Book Now
        </Button>
      </Stack>

      {/* <Box sx={{ mt: 3, textAlign: 'center' }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box> */}
      {/* </Form> */}
      {/* </FormikProvider> */}
    </RootStyle>
  );
}
