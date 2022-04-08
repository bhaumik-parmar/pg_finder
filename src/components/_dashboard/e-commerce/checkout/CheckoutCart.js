import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';

// material
import {
  Grid,
  Card,
  Button,
  CardHeader,
  Typography,
  Stack,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  InputAdornment
} from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import useAuth from '../../../../hooks/useAuth';
import useAuth from '../../../../hooks/useAuth';
import { fCurrency } from '../../../../utils/formatNumber';
// import { db } from '../../../../config';
// import { useNavigate } from 'react-router';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import Scrollbar from '../../../Scrollbar';
import EmptyContent from '../../../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

export default function CheckoutCart({ handleClick }) {
  const { bookPG } = useAuth();
  const [roomType, setRoomType] = useState('3+ Sharing');
  const [profession, setProfession] = useState('Student');
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const CustomerDetailSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('First name required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Last name required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string()
      .min(9, 'Invalid phone number')
      .max(11, 'Invalid phone number')
      .required('Phone number is required')
      .matches(/^[6-9]\d{9}$/gi, 'Invalid phone number')
  });
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    validationSchema: CustomerDetailSchema,
    // enableReinitialize: true,
    // initialValues: { products: cart },
    // onSubmit: async (values, { setErrors, setSubmitting }) => {
    //   try {
    //     setSubmitting(true);
    //     handleNextStep();
    //   } catch (error) {
    //     console.error(error);
    //     setErrors(error.message);
    //   }
    // }
    onSubmit: async (values) => {
      values.profession = profession;
      values.roomType = roomType;
      await bookPG(values.firstName, values.lastName, values.email, values.phone, values.profession, values.roomType);
      handleClick();
    }
  });

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const docRef = firebase.firestore().collection('Registration').doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                console.log('data', data);
                formik.setFieldValue('firstName', data?.firstName);
                formik.setFieldValue('lastName', data?.lastName);
                formik.setFieldValue('phone', data?.phone);
                formik.setFieldValue('email', data?.email);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );
  // console.log('data ', data);

  const handleChangeDropdownBox = (event) => {
    setRoomType(event.target.value);
  };

  const handleChangeRadio = (e) => {
    const { value } = e.target;

    setProfession(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const { values, handleSubmit } = formik;
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardHeader title={<Typography variant="h6">Customer Details:</Typography>} sx={{ mb: 3 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mb: 2 }} spacing={2}>
              <TextField
                fullWidth
                label="First name*"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              <TextField
                fullWidth
                label="Last name*"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </Stack>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              // autoComplete="username"
              type="email"
              label="Email address*"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              // autoComplete=""
              type="number"
              label="Phone number*"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <Stack direction="row">
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: '15px' }}>
                I am a
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="Student"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Student" onChange={handleChangeRadio} control={<Radio />} label="Student" />
                <FormControlLabel
                  value="Working Professional"
                  onChange={handleChangeRadio}
                  control={<Radio />}
                  label="Working Professional"
                />
              </RadioGroup>
            </Stack>
            <Stack direction="row">
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel id="demo-controlled-open-select-label">Room Type:</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  label="Room Type"
                  defaultValue="3+ Sharing"
                  onChange={handleChangeDropdownBox}
                >
                  <MenuItem value="3+ Sharing">3+ Sharing </MenuItem>
                  <MenuItem value="Triple Sharing">Triple Sharing</MenuItem>
                  <MenuItem value="Double Sharing">Double Sharing</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Confirm
            </LoadingButton>
          </Card>
          <Button
            color="inherit"
            component={RouterLink}
            to={PATH_DASHBOARD.eCommerce.root}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Back
          </Button>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
