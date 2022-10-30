import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Query } from "appwrite";
import * as React from "react";
import { useEffect, useState } from "react";
import useClient from "../auth/useClient";
import Header from "../common/Header";
import CreateAlcoholModal from "./CreateAlcoholModal";
import UpdateAlcoholModal from "./UpdateAlcoholModal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Alcohol = () => {
  const collectionId = "633f248cc4c8e69b367d";

  const [items, setItems] = useState([]);

  const { client, databases } = useClient();

  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    setPage(value);
  };

  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

  useEffect(() => {
    client.subscribe(["documents", "files"], (response) => {
      console.log(response);
    });
    const getDocuments = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        collectionId,
        [Query.orderAsc("date"), Query.limit(limit), Query.offset(offset)]
      );
      setItems(res);
    };
    getDocuments();
  }, [limit, offset]);

  const handleUpdate = async (id) => {
    await databases.updateDocument("633f24764b9416fbd058", collectionId, id);
  };

  return (
    <>
      <Header label="Healthcare" />
      <Container>
        <Box display="grid" gap={{ xs: 1, md: 2 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <h1>Алкоголь</h1>
            <CreateAlcoholModal items={items} setItems={setItems} />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {items?.documents?.map((item) => (
                <Grid item xs={2} sm={4} md={4} key={item.$id}>
                  <Card>
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
                              ("0" + new Date(item.date).getMinutes()).slice(
                                -2
                              )}
                          </Typography>
                        </Box>
                      }
                    ></CardHeader>
                    <CardContent>
                      <Typography>{item.name}</Typography>
                      <Typography>
                        {item.value}
                        &nbsp;
                        {item.volume}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <UpdateAlcoholModal
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
            sx={{ display: "flex", justifyContent: "center" }}
          />
        </Box>
      </Container>
    </>
  );
};
export default Alcohol;
