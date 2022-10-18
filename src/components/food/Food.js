import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled, useTheme } from "@mui/material/styles";
import { Query } from "appwrite";
import * as React from "react";
import { useEffect, useState } from "react";
import useClient from "../auth/useClient";
import CreateFoodModal from "./CreateFoodModal";
import UpdateFoodModal from "./UpdateFoodModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Food = () => {
  const collectionId = "634db3dbd47db0cad25b";

  const theme = useTheme();
  //const colorMode = useContext(ColorModeContext);

  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  const { client, databases, storage } = useClient();

  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    setPage(value);
  };

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

      client.subscribe(["documents", "files"], (response) => {
        console.log(response);
      });
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
  }, [limit, offset]);

  return (
    <>
      <Container>
        <Box display="grid" gridTemplateRows="100px 1fr 100px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1>Дневник питания</h1>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
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
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Pagination
            count={Math.ceil(items?.total / limit)}
            page={page}
            onChange={handlePage}
            size="large"
            sx={{ display: "flex", justifyContent: "center" }}
          />
          <Box sx={{ alignSelf: "center" }}>
            <CreateFoodModal
              items={items}
              setItems={setItems}
              imageList={images}
              volumes={volumes}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Food;
