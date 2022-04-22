// import { Icon } from '@iconify/react';
// import appleFilled from '@iconify/icons-ant-design/apple-filled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import userCircleO from '@iconify/icons-fa/user-circle-o';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import firebase from 'firebase/compat/app';
import { fShortenNumber } from '../../../utils/formatNumber';
import 'firebase/compat/firestore';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AnalyticsNewUsers() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        const temp = [];
        if (user) {
          const docRef = firebase.firestore().collection('Registration');
          docRef
            .where('role', '==', 'customer')
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                temp.push(doc.data());
              });
              console.log('temp', temp);
              setUserData(temp);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );

  const TOTAL = userData?.length;
  return (
    <RootStyle onClick={() => navigate('/dashboard/pg-finder/Admin/user/list')}>
      <IconWrapperStyle>
        <Icon icon={userCircleO} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Users
      </Typography>
    </RootStyle>
  );
}
