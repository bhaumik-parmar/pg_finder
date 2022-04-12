import { Grid } from '@mui/material';
import product from '../../../../redux/slices/product';
import { RoomInfo } from './RoomInfo';
import { useSelector } from '../../../../redux/store';
import { fCurrency } from '../../../../utils/formatNumber';
// ----------------------------------------------------------------------

export default function RoomType() {
  const { product } = useSelector((state) => state.product);
  const { price, rooms } = product;
  const roomInfoArray = [
    {
      RoomName: rooms[2],
      Price: price + 1000
    },
    {
      RoomName: rooms[1],
      Price: price + 500
    },
    {
      RoomName: rooms[0],
      Price: price
    }
  ];
  return (
    <Grid container direction="row" spacing={1} justifyContent="space-around">
      {roomInfoArray.map(
        ({ RoomName, Price }, count) =>
          RoomName && (
            <Grid item key={count} lg={2}>
              <RoomInfo room={RoomName} price={Price} key={count} />
            </Grid>
          )
      )}
    </Grid>
  );
}
