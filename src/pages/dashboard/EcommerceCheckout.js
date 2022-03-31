import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import { useNavigate } from 'react-router';
// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@mui/material';
import { PaymentNewCardForm } from '../../components/_external-pages/payment';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCart, createBilling } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress
} from '../../components/_dashboard/e-commerce/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Book PG', 'Payment'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main
    }
  }
}));

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled'
      }}
    >
      {completed ? (
        <Box component={Icon} icon={checkmarkFill} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isMountedRef = useIsMountedRef();
  const [step, setStep] = useState(0);
  // const { checkout } = useSelector((state) => state.product);
  // const { cart, billing, activeStep } = checkout;
  // const isComplete = activeStep === STEPS.length;

  // useEffect(() => {
  //   if (isMountedRef.current) {
  //     dispatch(getCart(cart));
  //   }
  // }, [dispatch, isMountedRef, cart]);

  // useEffect(() => {
  //   if (activeStep === 1) {
  //     dispatch(createBilling(null));
  //   }
  // }, [dispatch, activeStep]);

  return (
    <Page title="Ecommerce: Checkout | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Checkout"
          links={[{ name: 'Home', href: PATH_DASHBOARD.eCommerce.root }, { name: 'Checkout' }]}
        />

        <Grid container justifyContent="flex-start">
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
        {step === 0 && <CheckoutCart handleClick={() => setStep(1)} />}
        {step === 1 && (
          <CheckoutPayment handleBack={() => setStep(0)} handleClick={() => navigate('/dashboard/pg-finder/home')} />
        )}
        {/* <CheckoutOrderComplete open={isComplete} /> */}
      </Container>
    </Page>
  );
}
