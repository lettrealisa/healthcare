import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import LoadFoodPicModal from "./LoadFoodPicModal";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const CreateFoodModal = ({ title }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [isFood, setIsFood] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const [modalHeight, setModalHeight] = React.useState(0);

  const ref = React.useCallback((node) => {
    setModalHeight(node?.clientHeight);
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddCircleIcon
          className="addCircleIcon"
          sx={{ transform: "scale(1.3)", marginTop: "0.5rem" }}
          onClick={handleOpen}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box ref={ref} className="modal">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Box>

          <Grid container spacing={1}>
            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                <TextField
                  id="demo-customized-textbox"
                  variant="outlined"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                <TextField
                  id="outlined-multiline-static"
                  label="Описание"
                  multiline
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
            </Grid>

            <Grid item xs="12">
              <FormGroup>
                <FormControlLabel
                  control={
                    <GreenSwitch
                      defaultChecked
                      value={isFood}
                      onChange={(e) => setIsFood(e.target.value)}
                    />
                  }
                  label="Блюдо"
                />
              </FormGroup>
            </Grid>

            <Grid item xs="12">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Тип
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Тип"
                  fullWidth
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>-</em>
                  </MenuItem>
                  <MenuItem value={"test"}>Тест</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Значение"
                  variant="outlined"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <LoadFoodPicModal modalHeight={modalHeight} />
          </Box>
          <Box sx={{ display: "none", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ mt: 2, width: "100%" }}
              className="bg-primary"
            >
              Добавить
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateFoodModal;
