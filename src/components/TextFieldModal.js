import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function TextFieldModal(props) {
  return (
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label={props.label} variant="standard" />
      </Box>
  );
}
