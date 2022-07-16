import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import TextFieldModal from './TextFieldModal';
import PasswordTextField from './PasswordTextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px'
};

export default function SignUpModal({ fun, title, message, messageButton }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>  
        <Button onClick={fun}>Апчива</Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>  
            <Typography id="modal-modal-title" variant="h6" component="h2">
                { title }
            </Typography>
          </Box>
          <TextFieldModal label="Email"/>
          <PasswordTextField label="Пароль"/>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mt: 2 }}>{ title }</Button>
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }}/>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>
                { message }
            </Typography>
            <Button>{ messageButton }</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
