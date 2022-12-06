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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Query } from "appwrite";
import "dayjs/locale/ru";
import { useCallback, useEffect, useRef, useState } from "react";
import useClient from "../auth/useClient";

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

const ColorButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${pink[600]}`,
  background: pink[600],
  color: "#fff",
  "&:hover": {
    border: `1px solid ${pink[600]}`,
    background: "#fff",
    color: pink[600],
  },
  "&:disabled": {
    border: `1px solid ${pink[300]}`,
    background: pink[300],
    color: pink[50],
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

const CreateFoodModal = ({ volumes, setGroups, limit, offset }) => {
  const collectionId = "634db3dbd47db0cad25b";

  const [locale, setLocale] = useState("ru");

  const [images, setImages] = useState([]);

  const { databases, storage } = useClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loaded, isLoaded] = useState(false);

  const [categories, setCategories] = useState([]);

  const groupItemsByDate = (items, res) => {
    items.forEach((item) => {
      const date = item.date.split("T")[0];
      if (res[date]) res[date].push(item);
      else res[date] = [item];
    });

    return res;
  };

  useEffect(() => {
    const getDocuments = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        "634dedc1c1782cef9a5f"
      );
      setCategories(res);
    };

    getDocuments();
  }, []);

  useEffect(() => {
    const getImages = async () => {
      const res = await storage.listFiles("634db50ac1ab6fd9b602");
      setImages(res.files);
    };
    getImages();
  }, [images]);

  const [date, setDate] = useState(new Date());
  const [isFood, setIsFood] = useState(true);

  const [values, setValues] = useState({
    date: new Date(),
    desc: "",
    isFood: true,
    type: "",
    value: "",
    volume: "",
    image: images?.slice(-1)[0]?.$id,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = async () => {
    await databases.createDocument(
      "633f24764b9416fbd058",
      collectionId,
      "unique()",
      {
        date: date,
        desc: values.desc,
        isFood: isFood,
        type: values.type,
        value: values.value,
        volume: values.volume,
        image: images?.slice(-1)[0]?.$id,
      }
    );

    isLoaded(false);

    const getDocuments = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        collectionId,
        [Query.orderAsc("date"), Query.limit(limit), Query.offset(offset)]
      );

      setGroups(groupItemsByDate(res.documents, {}));
    };

    getDocuments();
  };
  const hiddenFileInput = useRef();

  const handleClick = () => {
    storage.createFile(
      "634db50ac1ab6fd9b602",
      "unique()",
      document.getElementById("input").files[0]
    );
    isLoaded(true);
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
        <Box ref={ref} sx={style}>
          <Grid container spacing={1}>
            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={locale}
                >
                  <DateTimePicker
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
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
                  {categories?.documents?.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Значение"
                  variant="outlined"
                  value={values.value}
                  onChange={handleChange("value")}
                />
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Объём
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Объём"
                  value={values.volume}
                  onChange={handleChange("volume")}
                >
                  <MenuItem value="">
                    <em>-</em>
                  </MenuItem>
                  {volumes?.documents?.map((volume) => (
                    <MenuItem value={volume.name}>{volume.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="1rem"
              >
                <ColorButton component="label" variant="outlined">
                  Выбрать фото
                  <Input
                    id="input"
                    type="file"
                    sx={{ display: "none" }}
                    ref={hiddenFileInput}
                    onChange={handleClick}
                  />
                  <PhotoCamera sx={{ marginLeft: "0.3rem" }} />
                </ColorButton>
                <ColorButton
                  variant="contained"
                  onClick={handleCreate}
                  disabled={loaded === false ? true : false}
                >
                  Добавить
                </ColorButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateFoodModal;
