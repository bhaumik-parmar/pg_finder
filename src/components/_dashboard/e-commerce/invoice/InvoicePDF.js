import { sum } from 'lodash';
import PropTypes from 'prop-types';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }]
});

const styles = StyleSheet.create({
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    textTransform: 'capitalize'
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8'
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8'
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%', paddingRight: 16 },
  tableCell_3: { width: '15%' }
});

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default function InvoicePDF({ invoice }) {
  const { id, items, date, taxes, status, discount, invoiceTo, invoiceFrom } = invoice;
  // const subTotal = sum(items.map((item) => item.price * item.qty));
  // const total = subTotal - discount + taxes;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image src="/static/illustrations/favicon-96x96.png" style={{ height: 32 }} />
          <View style={styles.col4}>
            <Text className="text-24 font-800 logo-text" color="common.black">
              PG
            </Text>
            <Text className="text-16 tracking-widest -mt-8 font-700" color="textSecondary">
              Finder
            </Text>
          </View>
          <View style={styles.col6}>
            <Text style={styles.body1}>{invoiceFrom.name}</Text>
            <Text style={styles.body1}>{invoiceFrom.address}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            {/* <Text style={styles.h3}>{status}</Text> */}
            <Text>Invoice No.: {id}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={{ alignItems: 'left', flexDirection: 'column' }}>
            <Text style={styles.body1}>Date: {date}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={styles.body1}>Name: {invoiceTo.name}</Text>
            <Text style={styles.body1}>Address: {invoiceTo.address}</Text>
            <Text style={styles.body1}>Phone: {invoiceTo.phone}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>PG Name</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text>{items.title}</Text>
              </View>
              <View textAlign="left" style={styles.tableCell_2}>
                <Text>{items.description}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{items.price}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{items.price}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>We appreciate your business. Should you need us to add VAT or extra notes let us know!</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@abcapp.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
