import { Grid } from '@mui/material';
import product from '../../../../redux/slices/product';
import { RoomInfo } from './RoomInfo';
import { useSelector } from '../../../../redux/store';
import { fCurrency } from '../../../../utils/formatNumber';
// ----------------------------------------------------------------------

export default function RoomType() {
  const { product } = useSelector((state) => state.product);
  const { price } = product;
  const roomInfoArray = [
    {
      RoomName: 'Double Sharing',
      Price: fCurrency(price + 1000),
      RoomAvailable: '7'
    },
    {
      RoomName: 'Triple Sharing',
      Price: fCurrency(price + 500),
      RoomAvailable: '4'
    },
    {
      RoomName: '3+ Sharing',
      Price: fCurrency(price),
      RoomAvailable: '5'
    }
  ];
  return (
    <Grid container direction="row" spacing={1} justifyContent="space-around">
      {roomInfoArray.map(({ RoomName, Price, RoomAvailable }, count) => (
        <Grid item key={count} lg={2}>
          <RoomInfo room={RoomName} price={Price} roomAvailable={RoomAvailable} key={count} />
        </Grid>
      ))}
    </Grid>
  );
}
