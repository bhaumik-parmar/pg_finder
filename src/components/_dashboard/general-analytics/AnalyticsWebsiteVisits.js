import { merge } from 'lodash';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
import firebase from 'firebase/compat/app';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

// const CHART_DATA = [
//   {
//     name: 'Team A',
//     type: 'column',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//   },
//   {
//     name: 'Team B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//   },
//   {
//     name: 'Team C',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//   }
// ];

// export default function AnalyticsWebsiteVisits() {
//   const chartOptions = merge(BaseOptionChart(), {
//     stroke: { width: [0, 2, 3] },
//     plotOptions: { bar: { columnWidth: '14%' } },
//     fill: { type: ['solid', 'gradient', 'solid'] },
//     labels: [
//       '01/01/2003',
//       '02/01/2003',
//       '03/01/2003',
//       '04/01/2003',
//       '05/01/2003',
//       '06/01/2003',
//       '07/01/2003',
//       '08/01/2003',
//       '09/01/2003',
//       '10/01/2003',
//       '11/01/2003'
//     ],
//     xaxis: { type: 'datetime' },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         formatter: (y) => {
//           if (typeof y !== 'undefined') {
//             return `${y.toFixed(0)} visits`;
//           }
//           return y;
//         }
//       }
//     }
//   });

//   return (
//     <Card>
//       <CardHeader title="Website Visits" subheader="(+43%) than last year" />
//       <Box sx={{ p: 3, pb: 1 }} dir="ltr">
//         <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
//       </Box>
//     </Card>
//   );
// }

export default function AnalyticsWebsiteVisits() {
  const [seriesData, setSeriesData] = useState(2022);
  const [yearlyBookingData, setYearlyBookingData] = useState([]);

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
              console.log('booking:', temp);
              setYearlyBookingData(temp);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  });
  const year = yearlyBookingData.map((item) => item.bookDate.toDate().getFullYear());
  console.log('year:>', year.length);
  const y = [...new Set(year)];
  console.log('object :>> ', y[0]);
  const month0 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 0);
  const month1 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 1);
  const month2 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 2);
  const month3 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 3);
  const month4 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 4);
  const month5 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 5);
  const month6 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 6);
  const month7 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 7);
  const month8 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 8);
  const month9 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 9);
  const month10 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 10);
  const month11 = yearlyBookingData.filter((item) => item.bookDate.toDate().getMonth() === 11);

  console.log('month :>> ', month3.length);

  const CHART_DATA = [
    {
      year: y[0],
      data: [
        {
          data: [
            month0.length,
            month1.length,
            month2.length,
            month3.length,
            month4.length,
            month5.length,
            month6.length,
            month7.length,
            month8.length,
            month9.length,
            month10.length,
            month11.length
          ]
        }
        // { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] }
      ]
    },
    {
      year: 2020,
      data: [
        {
          name: 'Total Income',
          data: [
            month0.length,
            month1.length,
            month2.length,
            month3.length,
            month4.length,
            month5.length,
            month6.length,
            month7.length,
            month8.length,
            month9.length,
            month10.length,
            month11.length
          ]
        }
        // { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] }
      ]
    }
  ];
  console.log('data :>> ', CHART_DATA[0].data);
  return (
    <Card>
      <CardHeader
        title="Yearly Booking"
        // subheader="(+43%) than last year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
