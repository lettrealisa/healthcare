import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
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

const CreateAlcoholModal = ({ items, setItems }) => {
  const collectionId = "633f248cc4c8e69b367d";

  const { databases } = useClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        "634dee358db7f7944638"
      );
      setVolumes(res);
    };
    getDocuments();
  }, []);

  const [values, setValues] = useState({
    date: new Date(),
    name: "",
    volume: "",
    value: null,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCreate = async () => {
    const p = await databases.createDocument(
      "633f24764b9416fbd058",
      collectionId,
      "unique()",
      {
        date: values.date,
        name: values.name,
        volume: values.volume,
        value: values.value,
      }
    );

    const getDocuments = async () => {
      setItems(
        await databases.listDocuments("633f24764b9416fbd058", collectionId)
      );
    };
    getDocuments();
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
            <CustomButton label="Добавить" onClick={handleCreate} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateAlcoholModal;
