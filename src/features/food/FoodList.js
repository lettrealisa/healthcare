import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ru";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Header } from "../../common/Header";
import { useGetFoodsQuery } from "../api/apiSlice";
import CreateFoodModal from "./CreateFoodModal";
import UpdateFoodModal from "./UpdateFoodModal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const FoodList = () => {
  const {
    data: foods = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFoodsQuery();

  const groupItemsByDate = (items, res) => {
    items.forEach((item) => {
      const date = item.date.split("T")[0];
      if (res[date]) res[date].push(item);
      else res[date] = [item];
    });
    return res;
  };

  const [locale, setLocale] = useState("ru");

  const [groups, setGroups] = useState({});

  const [row, setRow] = useState("");

  const handleRow = (id) => {
    if (row === id) setRow("");
    else setRow(id);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

  const groupedItems = useMemo(() => {
    const groupedItems = foods.slice();
    return groupItemsByDate(groupedItems, {});
  }, [foods]);

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    content = Object.keys(groupedItems).map((key) => (
      <>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            title={
              <Box display="flex" justifyContent="center">
                <Typography>
                  {("0" + new Date(key).getDate()).slice(-2) +
                    "." +
                    ("0" + (new Date(key).getMonth() + 1)).slice(-2) +
                    "." +
                    new Date(key).getFullYear()}
                </Typography>
              </Box>
            }
          />
          {groupedItems[key].map((item) => {
            return (
              <CardContent>
                <div onClick={() => handleRow(k.$id)}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>
                      {("0" + new Date(item.date).getHours()).slice(-2) +
                        ":" +
                        ("0" + new Date(item.date).getMinutes()).slice(-2)}
                    </Typography>
                    <ExpandMore
                      expand={row === item.$id}
                      onClick={() => handleRow(item.$id)}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </Box>
                </div>
                <Collapse in={row === item.$id} timeout="auto" unmountOnExit>
                  <CardContent>
                    <CardMedia component="img" height="194" />
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
                        limit={limit}
                        offset={offset}
                        setGroups={setGroups}
                      />
                    </CardActions>
                  </CardContent>
                </Collapse>
              </CardContent>
            );
          })}
        </Card>
      </>
    ));
  } else if (isError) {
    content = <div>{error.data}</div>;
  }

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log(content);
  }, [content]);

  const categories = [{ name: "Category" }];

  const [volumes, setVolumes] = useState([]);

  return (
    <>
      <Header />
      <Container>
        <Box display="grid" gap={{ xs: 1, md: 2 }} mt={4} mb={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1>Дневник питания</h1>
            <CreateFoodModal
              volumes={volumes}
              setGroups={setGroups}
              limit={limit}
              offset={offset}
            />
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Категория
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Категория"
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

          {content}

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Object.keys(groups).map((key) => (
                <Grid item xs={2} sm={4} md={4} key={key}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                      title={
                        <Box display="flex" justifyContent="center">
                          <Typography>
                            {("0" + new Date(key).getDate()).slice(-2) +
                              "." +
                              ("0" + (new Date(key).getMonth() + 1)).slice(-2) +
                              "." +
                              new Date(key).getFullYear()}
                          </Typography>
                        </Box>
                      }
                    />
                    {groups[key].map((k) => (
                      <CardContent>
                        <div onClick={() => handleRow(k.$id)}>
                          <Box display="flex" justifyContent="space-between">
                            <Typography>
                              {("0" + new Date(k.date).getHours()).slice(-2) +
                                ":" +
                                ("0" + new Date(k.date).getMinutes()).slice(-2)}
                            </Typography>
                            <ExpandMore
                              expand={row === k.$id}
                              onClick={() => handleRow(k.$id)}
                              aria-expanded={expanded}
                              aria-label="show more"
                            >
                              <ExpandMoreIcon />
                            </ExpandMore>
                          </Box>
                        </div>
                        <Collapse
                          in={row === k.$id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CardContent>
                            <CardMedia component="img" height="194" />
                            <CardContent>
                              <Typography>
                                <Chip label={k.type}></Chip>
                              </Typography>
                              <Typography>{k.desc}</Typography>
                              <Typography>
                                {k.value}
                                &nbsp;
                                {k.volume}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <UpdateFoodModal
                                item={k}
                                limit={limit}
                                offset={offset}
                                setGroups={setGroups}
                              />
                            </CardActions>
                          </CardContent>
                        </Collapse>
                      </CardContent>
                    ))}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Pagination
            count={groups?.total > 1 ? Math.ceil(groups?.total / limit) : 1}
            page={page}
            onChange={handlePage}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Box>
      </Container>
    </>
  );
};
