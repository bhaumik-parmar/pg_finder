import { useEffect, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import firebase from 'firebase/compat/app';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function EcommerceSaleByGender() {
  const theme = useTheme();
  const [professionData, setProfessionData] = useState([]);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        const temp = [];
        if (user) {
          const docRef = firebase.firestore().collection('BookPG');
          docRef
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                temp.push(doc.data());
              });
              console.log('temp', temp);
              setProfessionData(temp);
              // console.log('temp.category:', temp[0].category);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );
  console.log('first', professionData);
  const total = professionData.map((item) => item.profession);
  console.log('total.length', total);

  // const chartOptions = merge(BaseOptionChart(), {
  // labels: ['Student', 'Working Professional'],
  // legend: { floating: true, horizontalAlign: 'center' },
  // fill: {
  //   type: 'gradient',
  //   gradient: {
  //     colorStops: [
  //       [
  //         {
  //           offset: 0,
  //           color: theme.palette.primary.light
  //         },
  //         {
  //           offset: 100,
  //           color: theme.palette.primary.main
  //         }
  //       ],
  //       [
  //         {
  //           offset: 0,
  //           color: theme.palette.warning.light
  //         },
  //         {
  //           offset: 100,
  //           color: theme.palette.warning.main
  //         }
  //       ]
  //     ]
  //   }
  // },
  // plotOptions: {
  //   radialBar: {
  //     hollow: { size: '68%' },
  //     dataLabels: {
  //       value: { offsetY: 16 },
  //       total: {
  //         formatter: () => fNumber(total)
  //       }
  //     }
  //   }
  // }
  // }
  // );

  const options = {
    chart: {
      type: 'donut'
    },
    labels: ['Student', 'Working Professonal'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const student = professionData.filter((item) => item.profession === 'Student');
  const workingProfessonal = professionData.filter((item) => item.profession === 'Working Professional');

  const series = [student.length, workingProfessonal.length];
  return (
    <Card>
      <CardHeader title="Book PG By Profession" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart options={options} series={series} type="donut" width={800} />
      </ChartWrapperStyle>
    </Card>
  );
}
