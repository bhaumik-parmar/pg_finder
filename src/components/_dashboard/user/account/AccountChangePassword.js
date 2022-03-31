import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { useNavigate } from 'react-router';
import useAuth from '../../../../hooks/useAuth';
// import fakeRequest from '../../../../utils/fakeRequest';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { user, changePassword } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      )
      .required('Password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (values.oldPassword !== user.password) {
        enqueueSnackbar('Your password is incorect', { variant: 'error' });
      } else if (values.oldPassword === values.newPassword) {
        enqueueSnackbar('Your new password cannot be the same as your old password', { variant: 'error' });
      } else {
        await changePassword(values.newPassword);
        enqueueSnackbar('Password changed', { variant: 'success' });
        navigate('/dashboard/pg-finder/home');
      }
      setSubmitting(false);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Old Password"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
