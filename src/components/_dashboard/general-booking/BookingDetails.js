import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
import { Icon } from '@iconify/react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import firebase from 'firebase/compat/app';
// material
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Menu,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useDispatch } from '../../../redux/store';
import { deleteBookPG } from '../../../redux/slices/product';
// utils
import mockData from '../../../utils/mock-data';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

// const MOCK_BOOKINGS = [...Array(5)].map((_, index) => ({
//   id: mockData.id(index),
//   name: mockData.name.fullName(index),
//   avatar: mockData.image.avatar(index),
//   checkIn: mockData.time(index),
//   checkOut: mockData.time(index),
//   phoneNumber: mockData.phoneNumber(index),
//   status: (index === 1 && 'pending') || (index === 3 && 'un_paid') || 'paid',
//   roomType: (index === 1 && 'double') || (index === 3 && 'king') || 'single'
// }));

// ----------------------------------------------------------------------

MoreMenuButton.propTypes = {
  onDelete: PropTypes.func,
  onDownload: PropTypes.func,
  onPrint: PropTypes.func,
  onShare: PropTypes.func
};

function MoreMenuButton({ onDownload, onPrint, onShare, onDelete }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </MIconButton>
      </>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* <MenuItem onClick={onDownload}>
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
            </Typography>
            </MenuItem>
            <MenuItem onClick={onPrint}>
            <Icon icon={printerFill} width={20} height={20} />
            <Typography variant="body2" sx={{ ml: 2 }}>
            Print
            </Typography>
        </MenuItem>
        <MenuItem onClick={onShare}>
        <Icon icon={shareFill} width={20} height={20} />
        <Typography variant="body2" sx={{ ml: 2 }}>
        Share
        </Typography>
        </MenuItem>
      <Divider /> */}
        {/* onClick={onDelete} */}
        <MenuItem onClick={() => setOpenConfirm(true)} sx={{ color: 'error.main' }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
          <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to cancel this booking?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onDelete} autoFocus color="error" variant="contained">
                Confirm
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  setOpenConfirm(false);
                }}
                color="info"
                variant="outlined"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function BookingDetails() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  // const handleClickDownload = () => {};
  // const handleClickPrint = () => {};
  // const handleClickShare = () => {};
  const handleClickDelete = (name, uid) => {
    dispatch(deleteBookPG(name, uid));
    navigate('/dashboard/pg-finder/home');
  };
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
                console.log('temp', temp);
                setBookData(temp);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }),
    []
  );

  return (
    <>
      <Card>
        <CardHeader title="Booking Details" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 240 }}>PG Name</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>Booking Date</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Room Type</TableCell>
                  {/* <TableCell sx={{ minWidth: 160 }}>Check Out</TableCell>
                  <TableCell sx={{ minWidth: 120 }}>Status</TableCell>
                  <TableCell sx={{ minWidth: 200 }}>Phone</TableCell> */}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {bookData.map((row) => {
                  const { uid, PGname, bookDate, roomType } = row;
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={row.name} src={row.avatar} /> */}
                          <Typography variant="subtitle2">{PGname}</Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>{bookDate.toDate().toDateString()}</TableCell>
                      {/* <TableCell>{format(new Date(row.checkOut), 'dd MMM yyyy')}</TableCell> */}

                      {/* <TableCell>
                      <Label
                        variant={isLight ? 'ghost' : 'filled'}
                        color={
                          (row.status === 'paid' && 'success') || (row.status === 'pending' && 'warning') || 'error'
                        }
                      >
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell> */}

                      {/* <TableCell>{row.phoneNumber}</TableCell> */}
                      <TableCell sx={{ textTransform: 'capitalize' }}>{roomType}</TableCell>

                      <TableCell align="right">
                        <MoreMenuButton
                          // onDownload={handleClickDownload}
                          // onPrint={handleClickPrint}
                          // onShare={handleClickShare}
                          onDelete={() => handleClickDelete(PGname, uid)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
