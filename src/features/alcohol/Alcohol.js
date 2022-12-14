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
import { Query } from "appwrite";
import * as React from "react";
import { useEffect, useState } from "react";
import { Header } from "../../common/Header";
import CreateAlcoholModal from "./CreateAlcoholModal";
import UpdateAlcoholModal from "./UpdateAlcoholModal";

const Alcohol = () => {
  const collectionId = "633f248cc4c8e69b367d";

  const [page, setPage] = useState(1);
  const handlePage = (e, value) => {
    setPage(value);
  };

  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [page]);

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
