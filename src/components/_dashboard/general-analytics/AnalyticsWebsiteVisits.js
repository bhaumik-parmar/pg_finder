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
  const [seriesData, setSeriesData] = useState('2022');
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
    console.log('event.target.value :>> ', typeof event.target.value);
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  });
  // console.log('year', year);
  const year = yearlyBookingData.map((item) => item.bookDate.toDate().getFullYear());
  const y = [...new Set(year)];
  const yearAndMonth = yearlyBookingData.map((item) => ({
    year: item.bookDate.toDate().getFullYear(),
    month: item.bookDate.toDate().getMonth()
  }));
  const Yearly = y.map((year) => {
    const yearWise = yearAndMonth.filter((item) => item?.year === year);
    return { [year]: yearWise };
  });
  const Monthly = Yearly?.map((item) => {
    const data = [];
    for (let i = 0; i <= 11; i += 1) {
      const length = Object.values(item)?.[0]?.filter((item) => item?.month === i)?.length ?? 0;
      data.push(length);
    }
    return {
      year: Object.keys(item)?.[0],
      data: [
        {
          data
        }
      ]
    };
  });

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
            {Monthly.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {Monthly.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
