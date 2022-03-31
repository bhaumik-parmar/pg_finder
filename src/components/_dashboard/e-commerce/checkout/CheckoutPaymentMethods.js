import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { Navigate } from 'react-router';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Button,
  Stack,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
//
import PaymentNewCardForm from '../../../_external-pages/payment/PaymentNewCardForm';
import { MHidden } from '../../../@material-extend';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
  formik: PropTypes.object,
  paymentOptions: PropTypes.array,
  cardOptions: PropTypes.array
};

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, formik, setState }) {
  const { errors, touched, values, getFieldProps, handleChange } = formik;
  const [show, setShow] = useState(false);

  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };
  const PGname = JSON.parse(localStorage.getItem('PG Name'));

  return (
    <Card sx={{ my: 3 }}>
      <Stack direction="row">
        <CardHeader title="Payment options" />
        <Typography sx={{ ml: 45, mt: 4 }}>Pay To:</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1, mt: 4 }}>
          {PGname.name}
        </Typography>
      </Stack>
      <CardContent>
        <RadioGroup row {...getFieldProps('payment')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { value, title, icons, description } = method;
              const hasChildren = value === 'credit_card';

              return (
                <Grid key={title} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.payment === value && {
                        boxShadow: (theme) => theme.customShadows.z8
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' })
                    }}
                  >
                    <FormControlLabel
                      value={value}
                      onChange={(e) => {
                        handleChange(e);
                        setState(e.target.value);
                      }}
                      control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ flexGrow: 1, py: 3 }}
                    />
                    <MHidden width="smDown">
                      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {icons.map((icon, index) => (
                          <Box
                            key={icon}
                            component="img"
                            alt="logo card"
                            src={icon}
                            sx={{
                              ...(index === 0 && { mr: 1 })
                            }}
                          />
                        ))}
                      </Box>
                    </MHidden>

                    {hasChildren && (
                      <Collapse in={values.payment === 'credit_card'} sx={{ width: '100%' }}>
                        {/* <TextField
                          select
                          fullWidth
                          label="Card"
                          {...getFieldProps('card')}
                          SelectProps={{ native: true }}
                        >
                          {cardOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>

                        <Button
                          id="add-card"
                          type="button"
                          size="small"
                          startIcon={<Icon icon={plusFill} width={20} height={20} />}
                          onClick={handleCollapseIn}
                          sx={{ my: 3 }}
                        >
                          Add new card
                        </Button> */}
                        {/* <PaymentNewCardForm formik={formik} onCancel={handleCollapseOut} /> */}
                        {/* <Collapse in={show}>
                          <PaymentNewCardForm formik={formik} onCancel={handleCollapseOut} />
                        </Collapse> */}
                      </Collapse>
                    )}
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {errors.payment && (
          <FormHelperText error>
            <Box component="span" sx={{ px: 2 }}>
              {touched.payment && errors.payment}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
