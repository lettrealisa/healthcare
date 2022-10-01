import { ArrowBack, PhotoCamera } from "@mui/icons-material";
import { Grid, Input, LinearProgress, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey, pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import Modal from "@mui/material/Modal";
import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

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

const LoadFoodPicModal = ({ modalHeight }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [date, setDate] = React.useState(null);
  const [desc, setDesc] = React.useState(null);
  const [isFood, setIsFood] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const [progress, setProgress] = React.useState(0);

  const hiddenFileInput = React.useRef();

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 700);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ mt: 2, width: "100%" }}
          className="bg-primary"
          onClick={handleOpen}
        >
          Далее
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ height: modalHeight, display: "flex", alignItems: "center" }}
          className="modal"
        >
          <Grid container spacing={1}>
            <Grid item xs="12">
              <Box
                sx={{
                  height: modalHeight / 2,
                  width: "100%",
                  borderRadius: "5px",
                }}
                component="img"
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              ></Box>
            </Grid>
            <Grid item xs="12" sx={{ display: "none" }}>
              <FormControl variant="standard" fullWidth>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ width: "100%" }}>
                    <ProgressBar
                      variant="determinate"
                      value={progress}
                      sx={{ backgroundColor: grey[300] }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${progress}%`}</Typography>
                  </Box>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <FormControl
                variant="standard"
                fullWidth
                sx={{ marginBottom: "2rem" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ColorButton
                    onClick={handleClick}
                    component="label"
                    variant="outlined"
                  >
                    Выбрать фото
                    <Input
                      id="input"
                      type="file"
                      sx={{ display: "none" }}
                      ref={hiddenFileInput}
                    />
                    <PhotoCamera sx={{ marginLeft: "0.3rem" }} />
                  </ColorButton>
                  <Button sx={{ color: "var(--soft)" }}>Загрузить</Button>
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => setOpen(!open)}
                  sx={{ color: "var(--soft)" }}
                >
                  <ArrowBack />
                  Назад
                </Button>
                <Button variant="contained" className="bg-primary">
                  Добавить
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default LoadFoodPicModal;
