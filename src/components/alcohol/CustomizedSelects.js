import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { Grid } from '@mui/material';
import useAlcohol from '../../hooks/useAlcohol';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function CustomizedSelects() {
  const [name, setName] = React.useState('');
  const [volume, setVolume] = React.useState('');
  const [value, setValue] = React.useState(null);
  const [date, setDate] = React.useState(null);

  return (
    <div>
        <Grid container spacing={1}>
            <Grid item xs="12">
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="demo-customized-textbox">Наименование</InputLabel>
                    <BootstrapInput 
                    id="demo-customized-textbox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>  
            </Grid>
            <Grid item xs="6">
                <FormControl variant="standard" fullWidth>
                    <InputLabel htmlFor="demo-customized-textbox">Объём</InputLabel>
                    <BootstrapInput
                    id="demo-customized-textbox" 
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    />
                </FormControl>    
            </Grid>    
            <Grid item xs="6">
                <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-customized-select-label">Значение</InputLabel>
                    <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>-</em>
                        </MenuItem>
                        <MenuItem value={'ml'}>мл</MenuItem>
                        <MenuItem value={'l'}>л</MenuItem>
                    </Select>
                </FormControl>    
            </Grid>  
            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                      <InputLabel htmlFor="demo-customized-textbox">Дата</InputLabel>
                      <BootstrapInput 
                      id="demo-customized-textbox" 
                      type='date'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      />
              </FormControl>   
            </Grid>
        </Grid>
    </div>
  );
}
