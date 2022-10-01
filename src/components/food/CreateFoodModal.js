import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  LinearProgress,
  Switch,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { alpha, styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import LoadFoodPicModal from "./LoadFoodPicModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

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

const ProgressBar = styled(LinearProgress)(() => ({
  "& .MuiLinearProgress-colorPrimary": {
    backgroundColor: pink[600],
  },
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: pink[600],
  },
  "& .MuiLinearProgress-root": {
    backgroundColor: pink[600],
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  /*color: theme.palette.getContrastText(purple[500]),*/
  border: `1px solid ${pink[600]}`,
  color: pink[600],
  "&:hover": {
    border: `1px solid ${pink[600]}`,
    background: pink[50],
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

  const hiddenFileInput = React.useRef();

  const [modalHeight, setModalHeight] = React.useState(0);
  const [modalWidth, setModalWidth] = React.useState(0);

  const modalRef = React.useRef(null);

  /*React.useEffect(() => {
    if (modalRef.current) setModalHeight(modalRef.current.clientHeight);
  }, []);*/

  const ref = React.useCallback((node) => {
    setModalHeight(node?.clientHeight);
  }, []);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

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
