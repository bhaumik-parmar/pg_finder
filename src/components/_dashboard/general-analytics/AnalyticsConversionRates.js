import { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
import firebase from 'firebase/compat/app';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function AnalyticsConversionRates() {
  const [pgCityData, setPgCityData] = useState([]);
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        const temp = [];
        if (user) {
          const docRef = firebase.firestore().collection('PGdetails');
          docRef
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                temp.push(doc.data());
              });
              console.log('tempCity:', temp);
              setPgCityData(temp);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );
  const Cities = [...new Set(pgCityData.map((item) => item.city))];
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: Cities
      // categories: [
      //   'Italy',
      //   'Japan',
      //   'China',
      //   'Canada',
      //   'France',
      //   'Germany',
      //   'South Korea',
      //   'Netherlands',
      //   'United States',
      //   'United Kingdom'
      // ]
    }
  });
  const citiCounts = Cities.map((city) => {
    const count = pgCityData.filter((item) => item.city === city);
    return count.length;
  });
  const gandhidham = pgCityData.filter((item) => item.city === 'Gandhidham');
  const surat = pgCityData.filter((item) => item.city === 'Surat');
  console.log('surat', surat);
  const CHART_DATA = [{ data: citiCounts }];
  console.log('CHART_DATA:::', CHART_DATA);
  return (
    <Card>
      <CardHeader title="City wise PG" subheader="" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
