import { PhotoCamera } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  Switch,
} from "@mui/material";
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
import { useCallback, useEffect, useRef, useState } from "react";
import useClient from "../auth/useClient";

const ColorButton = styled(Button)(({ theme }) => ({
  /*color: theme.palette.getContrastText(purple[500]),*/
  border: `1px solid ${pink[600]}`,
  color: pink[600],
  "&:hover": {
    border: `1px solid ${pink[600]}`,
    background: pink[50],
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

const CreateFoodModal = ({ title }) => {
  const collectionId = "633f248cc4c8e69b367d";

  const [images, setImages] = useState([]);

  const { databases, storage } = useClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    date: "",
    desc: "",
    isFood: false,
    type: "",
    value: "",
    image: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = async () => {
    await databases.updateDocument(
      "633f24764b9416fbd058",
      collectionId,
      "unique()",
      {
        date: values.date,
        desc: values.desc,
        isFood: values.isFood,
        type: values.type,
        value: values.value,
        image: values.image,
      }
    );
  };
  const hiddenFileInput = useRef();

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    const getImages = async () => {
      const res = await storage.listFiles("634db50ac1ab6fd9b602");
      setImages(res.files);
    };
    getImages();
  }, []);

  const [modalHeight, setModalHeight] = useState(0);

  const ref = useCallback((node) => {
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
                  value={values.date}
                  onChange={handleChange("date")}
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
                  value={values.desc}
                  onChange={handleChange("desc")}
                />
              </FormControl>
            </Grid>

            <Grid item xs="12">
              <FormGroup>
                <FormControlLabel
                  control={
                    <GreenSwitch
                      defaultChecked
                      value={values.isFood}
                      onChange={handleChange("isFood")}
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
                  value={values.type}
                  onChange={handleChange("type")}
                >
                  <MenuItem value="">
                    <em>-</em>
                  </MenuItem>
                  <MenuItem value={"test"}>Тест</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="1rem"
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

export default CreateFoodModal;
