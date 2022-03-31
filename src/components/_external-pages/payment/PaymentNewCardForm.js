import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import infoFill from '@iconify/icons-eva/info-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { useFormik, Form, FormikProvider, ErrorMessage } from 'formik';
import { LoadingButton } from '@mui/lab';
import MaskedInput from 'react-text-mask';
// import Card from 'react-credit-cards';

// import 'react-credit-cards/es/styles-compiled.css';
// material
import { Paper, Stack, Button, Popover, TextField, Typography, InputAdornment } from '@mui/material';
//
import moment from 'moment';
import { MIconButton } from '../../@material-extend';
// import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

PaymentNewCardForm.propTypes = {
  formik: PropTypes.object,
  onCancel: PropTypes.func
};

export default function PaymentNewCardForm({ onCancel }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
    newCardExpired: Yup.string()
      .required('Expired date is required')
      .matches(/([0-9]{2})\/([0-9]{2})/, 'Not a valid expiration date.'),
    newCardCvv: Yup.string()
      .min(3, 'Invalid cvv number')
      .max(3, 'Invalid cvv number')
      .required('Cvv number is required')
  });

  const formik = useFormik({
    initialValues: {
      newCardName: '',
      newCardNumber: '',
      newCardExpired: 'MM/YY',
      newCardCvv: ''
    },
    validationSchema: NewCardSchema,

    onSubmit: () => {
      enqueueSnackbar('Payment Successful', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
  });

  // const stripeCardExpirValidation = (value) => {
  //   if (value) {
  //     if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
  //       const today = new Date();
  //       const CurrentDate = moment(
  //         new Date(
  //           `${today.getFullYear()}-${today.getMonth() + 1}-${new Date(
  //             today.getFullYear(),
  //             today.getMonth() + 1,
  //             0
  //           ).getDate()}`
  //         )
  //       );
  //       const visaValue = value.split('/');
  //       const visaDate = new Date(`20${visaValue[1]}`, visaValue[0], 0);
  //       errors.newCardExpired = CurrentDate < moment(visaDate) ? undefined : 'Please enter valid date';
  //     }
  //     errors.newCardExpired = 'Invalid date format';
  //   }
  // };

  const [isOpen, setIsOpen] = useState(null);

  const handleCancel = () => {
    // onCancel();
    resetForm({
      values: {
        // ...values,
        newCardName: '',
        newCardNumber: '',
        newCardExpired: '',
        newCardCvv: ''
      }
    });
  };

  const { touched, errors, resetForm, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <Paper
        sx={{
          p: 2.5,
          mb: 2.5,
          bgcolor: 'background.neutral'
        }}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Name on card"
                {...getFieldProps('newCardName')}
                error={Boolean(touched.newCardName && errors.newCardName)}
                helperText={touched.newCardName && errors.newCardName}
              />

              <TextField
                fullWidth
                size="small"
                type="number"
                label="Card number"
                {...getFieldProps('newCardNumber')}
                error={Boolean(touched.newCardNumber && errors.newCardNumber)}
                helperText={touched.newCardNumber && errors.newCardNumber}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {/* <TextField
                  size="small"
                  label="MM/YY"
                  {...getFieldProps('newCardExpired')}
                  error={Boolean(touched.newCardExpired && errors.newCardExpired)}
                  helperText={touched.newCardExpired && errors.newCardExpired}
                  // onChange={(e) => {
                  //   if (e.target.value.length === 2) {
                  //     setFieldValue('newCardExpired', `${e.target.value}/`);
                  //   } else {
                  //     setFieldValue('newCardExpired', e.target.value);
                  //   }
                  // }}
                  // inputProps={{ maxLength: 5 }}
                /> */}
                <Stack>
                  <MaskedInput
                    mask={[/[0-9]/, /\d/, '/', /\d/, /\d/]}
                    guide={false}
                    name="expiry"
                    required
                    placeholderChar={'\u2000'}
                    placeholder="MM/YY"
                    {...getFieldProps('newCardExpired')}
                    style={{
                      width: '200px',
                      height: '40px',
                      borderRadius: '8px',
                      backgroundColor: '#F4F6F8',
                      borderColor: touched.newCardExpired && errors.newCardExpired ? 'red' : null
                    }}
                    // onChange={handleInputData}
                    // onBlur={handleBlur}
                  />
                  <ErrorMessage name="newCardExpired" />
                </Stack>
                <TextField
                  size="small"
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

                {/* <Button id="create" type="submit" fullWidth variant="contained" onClick={isSubmitting}>
                  Payment
                </Button> */}
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Payment
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        </FormikProvider>
      </Paper>

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
