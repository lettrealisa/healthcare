import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Query } from "appwrite";
import "dayjs/locale/ru";
import * as React from "react";
import { useEffect, useState } from "react";
import useClient from "../auth/useClient";
import ConfirmationDialog from "../common/ConfirmationDialog";
import ResponsiveAppBar from "../common/ResponsiveAppBar";
import useCategories from "../common/useCategories";
import CreateFoodModal from "./CreateFoodModal";
import UpdateFoodModal from "./UpdateFoodModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${grey[300]}`,
  background: grey[300],
  color: grey[700],
  textTransform: "none",
  font: "inherit",
  padding: "0.5rem",
  maxHeight: "50px",
  "&:hover": {},
  "&:disabled": {},
}));

const Food = () => {
  const [locale, setLocale] = useState("ru");
  const [date, setDate] = useState(new Date());

  const [category, setCategory] = useState(null);

  const collectionId = "634db3dbd47db0cad25b";

  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  const { client, databases, storage } = useClient();

  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    setPage(value);
  };

  const [values, setValues] = useState({
    type: "",
    filters: [
      { key: "Категория", value: "drink" },
      { key: "Название", value: "juice" },
    ],
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const { categories } = useCategories();

  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        collectionId,
        [Query.orderAsc("date"), Query.limit(limit), Query.offset(offset)]
      );
      setItems(res);
    };
    getDocuments();
    const getImages = async () => {
      const res = await storage.listFiles("634db50ac1ab6fd9b602");
      setImages(res.files);
    };
    getImages();

    const getVolumes = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        "634dee358db7f7944638"
      );
      setVolumes(res);
    };
    getVolumes();
  }, [limit, offset, values.type]);

  const addFilter = (filter) => {
    handleChange("type");
    values.filters.push(filter);
  };

  useEffect(() => {
    client.subscribe(["documents", "files"], (response) => {
      console.log(response);
    });
  }, [client]);

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Box display="grid" gap={{ xs: 1, md: 2 }} mt={4} mb={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1>Дневник питания</h1>
            <CreateFoodModal
              items={items}
              setItems={setItems}
              imageList={images}
              volumes={volumes}
            />
          </Box>

          <Box sx={{ display: "none" }}>
            {values.filters.map((filter) => (
              <CustomButton endIcon={<Close />} sx={{ marginRight: "2rem" }}>
                {filter.key}:&nbsp;{filter.value}
              </CustomButton>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <Box
                  maxWidth={345}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FormControl fullWidth className="">
                    <InputLabel id="demo-simple-select-helper-label">
                      Категория
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Категория"
                      value={values.type}
                      onChange={handleChange("type")}
                    >
                      <MenuItem value="">
                        <em>-</em>
                      </MenuItem>
                      {categories?.documents?.map((category) => (
                        <MenuItem value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Box maxWidth={345}>
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
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {items?.documents?.map((item) => (
                <Grid item xs={2} sm={4} md={4} key={item.$id}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                      title={
                        <Box display="flex" justifyContent="space-between">
                          <Typography>
                            {("0" + new Date(item.date).getDate()).slice(-2) +
                              "." +
                              (
                                "0" +
                                (new Date(item.date).getMonth() + 1)
                              ).slice(-2) +
                              "." +
                              new Date(item.date).getFullYear()}
                          </Typography>
                          <Typography>
                            {new Date(item.date).getHours() +
                              ":" +
                              new Date(item.date).getMinutes()}
                          </Typography>
                        </Box>
                      }
                    ></CardHeader>
                    <CardMedia
                      component="img"
                      height="194"
                      image={storage.getFilePreview(
                        "634db50ac1ab6fd9b602",
                        item.image
                      )}
                    />
                    <CardContent>
                      <Typography>
                        <Chip label={item.type}></Chip>
                      </Typography>
                      <Typography>{item.desc}</Typography>
                      <Typography>
                        {item.value}
                        &nbsp;
                        {item.volume}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <UpdateFoodModal
                        item={item}
                        items={items}
                        setItems={setItems}
                        limit={limit}
                        offset={offset}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Pagination
            count={items?.total > 1 ? Math.ceil(items?.total / limit) : 1}
            page={page}
            onChange={handlePage}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />

          <ConfirmationDialog />
        </Box>
      </Container>
    </>
  );
};
export default Food;
