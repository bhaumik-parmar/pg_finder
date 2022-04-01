import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import infoFill from '@iconify/icons-eva/info-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import InputMask from 'react-input-mask';
// material
import {
  Paper,
  Stack,
  Button,
  Popover,
  TextField,
  Typography,
  InputAdornment,
  Card,
  CardHeader,
  Grid
} from '@mui/material';
//
import useAuth from '../hooks/useAuth';
import { MIconButton } from '../components/@material-extend';
// import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

PaymentNewCardForm.propTypes = {
  formik: PropTypes.object,
  onCancel: PropTypes.func
};

export default function PaymentNewCardForm({ onCancel }) {
  const { payment } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // const isMountedRef = useIsMountedRef();
  const MASTERCARD = /^5[1-5][0-9]{14}$/;
  const VISA = /^4[0-9]{12}(?:[0-9]{3})?$/;

  const NewCardSchema = Yup.object().shape({
    newCardName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Account holder name required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
    newCardNumber: Yup.string()
      .required('Card number is required')
      .matches(VISA || MASTERCARD, 'Invalid card number!'),
    newCardExpiredMonth: Yup.string()
      .required('Expire date is required')
      .matches(/([0-9]{2})/, 'Expire date is required'),
    newCardExpiredYear: Yup.string()
      .required('Expire date is required')
      .matches(/([0-9]{2})/, 'Expire date is required'),
    // .matches(/([0-9]{2})\/([0-9]{2})/, 'Expire date is required'),
    newCardCvv: Yup.string()
      .min(3, 'Invalid cvv number')
      .max(3, 'Invalid cvv number')
      .required('Cvv number is required')
  });

  const formik = useFormik({
    initialValues: {
      newCardName: '',
      newCardNumber: '',
      newCardExpiredMonth: 'MM',
      newCardExpiredYear: 'YY',
      newCardCvv: ''
    },
    validationSchema: NewCardSchema,

    onSubmit: async (values, { setSubmitting }) => {
      const fullyear = new Date().getFullYear().toString().slice(-2);
      const year = Number(fullyear);
      if (values.newCardExpiredMonth <= 0 || values.newCardExpiredMonth > 12) {
        enqueueSnackbar('Invalid expire date', { variant: 'error' });
      } else if (values.newCardExpiredYear <= year) {
        enqueueSnackbar('Invalid expire date', { variant: 'error' });
      } else {
        await payment(
          values.newCardName,
          values.newCardNumber,
          values.newCardExpiredMonth,
          values.newCardExpiredYear,
          values.newCardCvv
        );
        enqueueSnackbar('Payment Successful', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        navigate('/dashboard/pg-finder/home');
      }
      setSubmitting(false);
    }
  });

  const [isOpen, setIsOpen] = useState(null);

  const handleCancel = () => {
    // onCancel();
    resetForm({
      values: {
        // ...values,
        newCardName: '',
        newCardNumber: '',
        newCardExpiredMonth: 'MM',
        newCardExpiredYear: 'YY',
        newCardCvv: ''
      }
    });
  };

  const {
    touched,
    errors,
    resetForm,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    handleChange,
    setFieldValue,
    setFieldTouched
  } = formik;

  const PGname = JSON.parse(localStorage.getItem('PG Name'));

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid item xs={14} md={10}>
            <Card sx={{ mb: 3, ml: 25 }}>
              <Stack direction="row">
                <CardHeader title={<Typography variant="h6">Payment Details:</Typography>} sx={{ mb: 3 }} />
                <Typography sx={{ ml: 75, mt: 4 }}>Pay To:</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1, mt: 4 }}>
                  {PGname.name}
                </Typography>
              </Stack>
              <Stack sx={{ mb: 2 }} spacing={2}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="medium"
                    label="Name on card"
                    {...getFieldProps('newCardName')}
                    error={Boolean(touched.newCardName && errors.newCardName)}
                    helperText={touched.newCardName && errors.newCardName}
                  />

                  <TextField
                    fullWidth
                    size="medium"
                    type="number"
                    label="Card number"
                    {...getFieldProps('newCardNumber')}
                    error={Boolean(touched.newCardNumber && errors.newCardNumber)}
                    helperText={touched.newCardNumber && errors.newCardNumber}
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={5}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                      <InputMask
                        mask="99"
                        {...getFieldProps('newCardExpiredMonth')}
                        onChange={(e, newCardExpiredMonth) => {
                          setFieldValue('newCardExpiredMonth', e.target.value);
                          setFieldTouched(newCardExpiredMonth, true, false);
                        }}
                      >
                        {() => (
                          <TextField
                            style={{ width: 75 }}
                            size="medium"
                            label="MM"
                            // {...getFieldProps('newCardExpiredMonth')}
                            error={Boolean(touched.newCardExpiredMonth && errors.newCardExpiredMonth)}
                            helperText={touched.newCardExpiredMonth && errors.newCardExpiredMonth}
                          />
                        )}
                      </InputMask>

                      <Typography style={{ fontSize: '40px' }}>/</Typography>
                      <InputMask
                        mask="99"
                        {...getFieldProps('newCardExpiredYear')}
                        onChange={(e, newCardExpiredYear) => {
                          setFieldValue('newCardExpiredYear', e.target.value);
                          setFieldTouched(newCardExpiredYear, true, false);
                        }}
                      >
                        {() => (
                          <TextField
                            style={{ width: 75 }}
                            size="medium"
                            label="YY"
                            // {...getFieldProps('newCardExpiredYear')}
                            error={Boolean(touched.newCardExpiredYear && errors.newCardExpiredYear)}
                            helperText={touched.newCardExpiredYear && errors.newCardExpiredYear}
                          />
                        )}
                      </InputMask>
                    </Stack>
                    {/* <InputMask
                      mask="99/99"
                      {...getFieldProps('newCardExpired')}
                      onChange={(e, newCardExpired) => {
                        setFieldValue('newCardExpired', e.target.value);
                        setFieldTouched(newCardExpired, true, false);
                      }}
                    >
                      {() => (
                        <TextField
                          fullWidth
                          size="medium"
                          label="MM/YY"
                          name="newCardExpired"
                          error={Boolean(touched.newCardExpired && errors.newCardExpired)}
                          helperText={touched.newCardExpired && errors.newCardExpired}
                        />
                      )}
                    </InputMask> */}
                    <TextField
                      fullWidth
                      size="medium"
                      type="password"
                      label="CVV"
                      {...getFieldProps('newCardCvv')}
                      error={Boolean(touched.newCardCvv && errors.newCardCvv)}
                      helperText={touched.newCardCvv && errors.newCardCvv}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <MIconButton size="small" edge="end" onClick={(e) => setIsOpen(e.currentTarget)}>
                              <Icon icon={infoFill} />
                            </MIconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Button id="cancel" type="button" fullWidth onClick={handleCancel}>
                      Cancel
                    </Button>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                      Payment
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Form>
      </FormikProvider>

      <Popover
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 200
          }
        }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your card
        </Typography>
      </Popover>
    </>
  );
}
