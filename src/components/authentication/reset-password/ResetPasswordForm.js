import * as Yup from 'yup';
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import db from '../../../config';

import { MIconButton } from '../../@material-extend';

// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const { resetPassword } = useAuth();
  const { user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.email)
          .then(() => {
            if (isMountedRef.current) {
              onSent();
              onGetEmail(formik.values.email);
              setSubmitting(false);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          const msg =
            "Sorry, we can't find an account with this email address. please try again or create a new account. ";
          setErrors({ afterSubmit: msg });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Email address*"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
