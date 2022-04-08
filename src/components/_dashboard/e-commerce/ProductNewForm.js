import { React, useState, useCallback } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  TextField,
  Typography,
  RadioGroup,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// hook
import useAuth from '../../../hooks/useAuth';
// import fakeRequest from '../../../utils/fakeRequest';
import { storage } from '../../../config';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';

// ----------------------------------------------------------------------

const GENDER_OPTION = ['Boys', 'Girls'];

const FOOD_OPTION = ['Food Provided', ' Non Veg Allowed', 'Self Cooking Kitchen'];

const AMENITIES_OPTION = [
  'Ac',
  'Power Backup',
  'Lift',
  'Fridge',
  'Microwave',
  'Laundry',
  'Water Cooler',
  'Warden',
  'Washing Machine',
  'Wifi',
  'Room Cleaning Service',
  'Parking'
];

const ROOM_OPTION = ['Double Sharing', 'Triple Sharing', '3+ Sharing'];

const HOUSE_RULES_OPTION = [
  'Visitor Entry',
  'Non-Veg Food',
  'Opposite Gender',
  'Smoking',
  'Drinking',
  'Loud music',
  'Party'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { newPG } = useAuth();
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('PG name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Image is required'),
    rooms: Yup.array().min(1, 'Room type is required'),
    amenities: Yup.array().min(1, 'Amenity is required'),
    owner: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Owner name is required'),
    add: Yup.string().min(15, 'Too Short!').max(100, 'Too Long!').required('Address is required'),
    food: Yup.array().min(1, 'Food amenity is required'),
    house_rules: Yup.array().min(1, 'House Rule is required'),
    price: Yup.number().required('Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.image || [],
      owner: currentProduct?.owner || '',
      add: currentProduct?.add || '',
      price: currentProduct?.price || '',
      // priceSale: pg?.priceSale || '',
      house_rules: currentProduct?.houseRules || [],
      status: currentProduct?.status || false,
      // taxes: true,
      gender: currentProduct?.gender || GENDER_OPTION[2],
      rooms: currentProduct?.rooms || [],
      food: currentProduct?.food || [],
      amenities: currentProduct?.amenities || []
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        await newPG(
          values.name,
          values.description,
          values.images,
          values.owner,
          values.add,
          values.price,
          values.house_rules,
          values.status,
          values.gender,
          values.rooms,
          values.food,
          values.amenities
        );
        resetForm();
        console.log('values.status', values.status);
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Add PG successful' : 'Update PG successful', { variant: 'success' });
        navigate(PATH_DASHBOARD.eCommerce.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const storageRef = ref(storage, `PGImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (error) => console.log(error));
        const getStore = () => {
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFieldValue(
              'images',
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: downloadURL
                })
              )
            );
          });
        };
        getStore();
      }
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="PG Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <TextField
                    fullWidth
                    label="description"
                    multiline
                    rows={4}
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </div>

                <div>
                  <LabelStyle>Add Images</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    maxSize={3145728}
                    accept="image/*"
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.rooms}
                    onChange={(event, newValue) => {
                      setFieldValue('rooms', newValue);
                    }}
                    options={ROOM_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Room Type" {...params} />}
                    error={Boolean(touched.rooms && errors.rooms)}
                  />
                  {touched.rooms && errors.rooms && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.rooms && errors.rooms}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.amenities}
                    onChange={(event, newValue) => {
                      setFieldValue('amenities', newValue);
                    }}
                    options={AMENITIES_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Amenities" {...params} />}
                    error={Boolean(touched.amenities && errors.amenities)}
                  />
                  {touched.amenities && errors.amenities && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.amenities && errors.amenities}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={<Switch {...getFieldProps('status')} checked={values.status} />}
                  label={`${values.status ? 'Available' : 'Filled'}`}
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Owner Name"
                    {...getFieldProps('owner')}
                    error={Boolean(touched.owner && errors.owner)}
                    helperText={touched.owner && errors.owner}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    {...getFieldProps('add')}
                    error={Boolean(touched.add && errors.add)}
                    helperText={touched.add && errors.add}
                  />

                  <div>
                    <LabelStyle>Category</LabelStyle>
                    <RadioGroup {...getFieldProps('gender')} row>
                      <Stack spacing={1} direction="row">
                        {GENDER_OPTION.map((gender) => (
                          <FormControlLabel key={gender} value={gender} control={<Radio />} label={gender} />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>

                  <div>
                    <div>
                      <Autocomplete
                        multiple
                        freeSolo
                        value={values.food}
                        onChange={(event, newValue) => {
                          setFieldValue('food', newValue);
                        }}
                        options={FOOD_OPTION.map((option) => option)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => <TextField label="Food" {...params} />}
                        error={Boolean(touched.food && errors.food)}
                      />
                      {touched.food && errors.food && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.food && errors.food}
                        </FormHelperText>
                      )}
                    </div>
                  </div>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.house_rules}
                    onChange={(event, newValue) => {
                      setFieldValue('house_rules', newValue);
                    }}
                    options={HOUSE_RULES_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                      ))
                    }
                    renderInput={(params) => <TextField label="House Rules" {...params} />}
                    error={Boolean(touched.house_rules && errors.house_rules)}
                  />
                  {touched.house_rules && errors.house_rules && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.house_rules && errors.house_rules}
                    </FormHelperText>
                  )}
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="000"
                    label="Price"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Stack>

                {/* <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                /> */}
              </Card>

              <LoadingButton type="submit" fullWidth variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
