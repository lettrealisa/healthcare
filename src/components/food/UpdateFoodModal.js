import { Delete, Edit } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Query } from "appwrite";
import { useState } from "react";
import useClient from "../auth/useClient";
import CustomButton from "../common/CustomButton";

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

const UpdateFoodModal = ({ item, items, setItems }) => {
  const collectionId = "633f248cc4c8e69b367d";

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
    name: item.name,
    volume: item.volume,
    value: item.value,
  });

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
        name: values.name,
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
          <Box sx={{ display: "flex", marginBottom: "1rem" }}>
            <Typography id="modal-modal-title">
              <h2>Алкоголь</h2>
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
                  label=""
                  onChange={handleChange("date")}
                />
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
                  value={values.name}
                  onChange={handleChange("name")}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CustomButton label="Изменить" onClick={handleUpdate} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateFoodModal;
