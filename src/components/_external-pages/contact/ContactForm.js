import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';

import closeFill from '@iconify/icons-eva/close-fill';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { LoadingButton } from '@mui/lab';
// material
import { Button, Typography, TextField, Stack } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { varFadeInUp, MotionInView } from '../../animate';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function ContactForm() {
  const navigate = useNavigate();
  const { user, contactUs } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name required')
      .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    sub: Yup.string().required('Subject required'),
    msg: Yup.string().required('Message required')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.displayName,
      email: user?.email,
      sub: '',
      msg: ''
    },
    validationSchema: ContactSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await contactUs(values.name, values.email, values.sub, values.msg);
        enqueueSnackbar('Contact message Submitted', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });

        if (isMountedRef.current) {
          setSubmitting(false);
          navigate('/dashboard/pg-finder/home');
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3">
              Feel free to contact us. <br />
              We'll be glad to hear from you, buddy.
            </Typography>
          </MotionInView>

          <Stack spacing={3}>
            <MotionInView variants={varFadeInUp}>
              <TextField
                fullWidth
                label="Name*"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <TextField
                fullWidth
                // autoComplete="username"
                type="email"
                label="Email*"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <TextField
                fullWidth
                label="Subject*"
                {...getFieldProps('sub')}
                error={Boolean(touched.sub && errors.sub)}
                helperText={touched.sub && errors.sub}
              />
            </MotionInView>

            <MotionInView variants={varFadeInUp}>
              <TextField
                fullWidth
                label="Enter your message here.*"
                multiline
                rows={4}
                {...getFieldProps('msg')}
                error={Boolean(touched.msg && errors.msg)}
                helperText={touched.msg && errors.msg}
              />
            </MotionInView>
          </Stack>

          <MotionInView variants={varFadeInUp}>
            <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
              Submit Now
            </LoadingButton>
          </MotionInView>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
