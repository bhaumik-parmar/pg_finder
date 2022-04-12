import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import { useState } from 'react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useNavigate } from 'react-router';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { onGotoStep, onBackStep, onNextStep, applyShipping } from '../../../../redux/slices/product';
//
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import { MIconButton } from '../../../@material-extend';
// import { PaymentNewCardForm } from '../../../_external-pages/payment';
// ----------------------------------------------------------------------

// const DELIVERY_OPTIONS = [
//   {
//     value: 0,
//     title: 'Standard delivery (Free)',
//     description: 'Delivered on Monday, August 12'
//   },
//   {
//     value: 2,
//     title: 'Fast delivery ($2,00)',
//     description: 'Delivered on Monday, August 5'
//   }
// ];

const PAYMENT_OPTIONS = [
  {
    value: 'google_pay',
    title: 'Pay with Google Pay',
    description: 'You will be redirected to Google Pay website to complete your booking securely.',
    icons: ['/static/icons/google-pay-seeklogo.com.svg']
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg']
  },
  {
    value: 'cash',
    title: 'Cash',
    description: 'Pay with cash when you will come at PG.',
    icons: []
  }
];

// const CARDS_OPTIONS = [
//   { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
//   { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
//   { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' }
// ];

// ----------------------------------------------------------------------

export default function CheckoutPayment({ handleBack, handleClick }) {
  const { paymentMethod } = useAuth();
  const [state, setState] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { checkout } = useSelector((state) => state.product);
  const { total, discount, subtotal, shipping } = checkout;

  const handleNextStep = (payment) => {
    // dispatch(onNextStep());
    if (payment === 'google_pay') {
      window.open('https://pay.google.com/');
    } else if (payment === 'credit_card') {
      navigate('/dashboard/pg-finder/payment');
    } else {
      navigate('/dashboard/pg-finder/invoice');
      enqueueSnackbar('Booking successful', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('Payment is required')
  });

  const formik = useFormik({
    initialValues: {
      delivery: shipping,
      payment: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (values.payment === 'google_pay' || values.payment === 'cash') {
          await paymentMethod(values.payment);
          handleNextStep(values.payment);
        } else {
          handleNextStep(values.payment);
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* <CheckoutDelivery
              formik={formik}
              onApplyShipping={handleApplyShipping}
              deliveryOptions={DELIVERY_OPTIONS}
            /> */}
            <CheckoutPaymentMethods formik={formik} paymentOptions={PAYMENT_OPTIONS} setState={setState} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              // style={{ display: state === 'credit_card' ? 'none' : 'block' }}
            >
              PAYMENT
            </LoadingButton>
            <Button
              style={{ marginTop: 30 }}
              type="button"
              size="small"
              color="inherit"
              onClick={handleBack}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* <CheckoutBillingInfo onBackStep={handleBackStep} /> */}
            {/* <CheckoutSummary
              enableEdit
              total={total}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              onEdit={() => handleGotoStep(0)}
            /> */}
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
