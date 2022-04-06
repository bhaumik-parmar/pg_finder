import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { paramCase } from 'change-case';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  Button,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

ProductMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  productName: PropTypes.string
};

export default function ProductMoreMenu({ onDelete, productName }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* onClick={onDelete} */}
        <MenuItem onClick={() => setOpenConfirm(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">Are you sure you want to logout?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onDelete} autoFocus color="error" variant="contained">
                Delete
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

        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(productName)}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
