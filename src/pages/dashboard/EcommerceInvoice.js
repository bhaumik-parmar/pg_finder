import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { random, sum } from 'lodash';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer
} from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// routes
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fCurrency } from '../../utils/formatNumber';
import mockData from '../../utils/mock-data';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { InvoiceToolbar } from '../../components/_dashboard/e-commerce/invoice';

// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

export default function EcommerceInvoice() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { product } = useSelector((state) => state.product);
  console.log('product', product);
  // const { price, rooms } = product;
  const date = new Date();
  const INVOICE = {
    id: uuidv4(),
    status: 'paid',
    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    invoiceFrom: {
      name: product?.name,
      address: product?.add
    },
    invoiceTo: {
      name: user?.displayName,
      address: user?.address,
      phone: user?.phone
    },
    items: {
      title: product?.name,
      description: product?.description,
      price: fCurrency(product?.price)
    }
  };

  // const subTotal = sum(INVOICE.items.map((item) => item.price * item.qty));
  // const total = subTotal - INVOICE.discount + INVOICE.taxes;

  return (
    <Page title="PG Finder | Invoice  ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Home', href: PATH_DASHBOARD.eCommerce.root },
            {
              name: 'PG',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Invoice' }
          ]}
        />

        <InvoiceToolbar invoice={INVOICE} />

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={10} sm={3} sx={{ mb: 5 }}>
              <div style={{ display: 'flex', textDecoration: 'none' }}>
                <Box component="img" alt="logo" src="/static/illustrations/favicon-96x96.png" sx={{ height: 48 }} />
                <Box style={{ marginLeft: '10px' }}>
                  <Typography className="text-24 font-800 logo-text" color="common.black">
                    PG
                  </Typography>
                  <Typography className="text-16 tracking-widest -mt-8 font-700" color="textSecondary">
                    Finder
                  </Typography>
                </Box>
              </div>
            </Grid>

            <Grid item xs={10} sm={4} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Typography variant="h4">{INVOICE.invoiceFrom.name}</Typography>
                <Typography variant="h6">{INVOICE.invoiceFrom.address}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={14} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                {/* <Label color="success" sx={{ textTransform: 'uppercase', mb: 1 }}>
                  unpaid
                </Label> */}
                <Typography variant="h6">Invoice No.: {INVOICE.id}</Typography>
              </Box>
              <Box sx={{ textAlign: { sm: 'left' } }}>
                <Typography variant="body1">Date: {INVOICE.date}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography variant="body2">Name: {INVOICE.invoiceTo.name} </Typography>
              <Typography variant="body2">Address:{INVOICE.invoiceTo.address}</Typography>
              <Typography variant="body2">Phone: {INVOICE.invoiceTo.phone}</Typography>
            </Grid>
          </Grid>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>PG Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`
                    }}
                  >
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 1000 }}>
                        <Typography variant="subtitle2">{INVOICE.items.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{INVOICE.items.description}</TableCell>
                    <TableCell align="right">{INVOICE.items.price}</TableCell>
                  </TableRow>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="right" width={140}>
                      <Typography variant="h6">{INVOICE.items.price}</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider sx={{ mt: 5 }} />

          <Grid container>
            <Grid item xs={12} md={9} sx={{ py: 3 }}>
              <Typography variant="subtitle2">NOTES</Typography>
              <Typography variant="body2">
                We appreciate your business. Should you need us to add VAT or extra notes let us know!
              </Typography>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@minimals.cc</Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
