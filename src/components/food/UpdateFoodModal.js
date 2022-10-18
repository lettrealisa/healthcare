import { Delete, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { pink } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Query } from "appwrite";
import { useState } from "react";
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

const UpdateFoodModal = ({ item, items, setItems }) => {
  const collectionId = "633f248cc4c8e69b367d";

  const [locale, setLocale] = useState("ru");

  const { databases } = useClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    date:
      ("0" + new Date(item.date).getDate()).slice(-2) +
      "." +
      ("0" + (new Date(item.date).getMonth() + 1)).slice(-2) +
      "." +
      new Date(item.date).getFullYear(),
    desc: item.desc,
    volume: item.volume,
    value: item.value,
  });

  const [date, setDate] = useState(new Date(item.date));

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleUpdate = async () => {
    await databases.updateDocument(
      "633f24764b9416fbd058",
      collectionId,
      item.$id,
      {
        date: values.date,
        desc: values.desc,
        volume: values.volume,
        value: values.value,
      }
    );

    const getDocuments = async () => {
      setItems(
        await databases.listDocuments("633f24764b9416fbd058", collectionId, [
          Query.orderAsc("date"),
        ])
      );
    };
    getDocuments();
  };

  const handleDelete = async () => {
    await databases.deleteDocument(
      "633f24764b9416fbd058",
      collectionId,
      item.$id
    );

    const getDocuments = async () => {
      setItems(
        await databases.listDocuments("633f24764b9416fbd058", collectionId, [
          Query.orderAsc("date"),
        ])
      );
    };
    getDocuments();
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={handleOpen}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                  <MenuItem value={item.volume}>{item.volume}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="12">
              <FormControl variant="standard" fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Наименование"
                  variant="outlined"
                  value={values.desc}
                  onChange={handleChange("desc")}
                />
              </FormControl>
            </Grid>
            <Grid item xs="12" sx={{ marginTop: "1rem" }}>
              <FormControl fullWidth>
                <ColorButton variant="contained" onClick={handleUpdate}>
                  Изменить
                </ColorButton>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateFoodModal;
