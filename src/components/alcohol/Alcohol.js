import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Query } from "appwrite";
import * as React from "react";
import { useEffect, useState } from "react";
import useClient from "../auth/useClient";
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

  useEffect(() => {
    const getDocuments = async () => {
      setItems(
        await databases.listDocuments("633f24764b9416fbd058", collectionId, [
          Query.orderAsc("date"),
        ])
      );
      client.subscribe(["documents", "files"], (response) => {
        console.log(response);
      });
    };
    getDocuments();
  }, []);

  const handleUpdate = async (id) => {
    await databases.updateDocument("633f24764b9416fbd058", collectionId, id);
  };

  return (
    <>
      <Container>
        <Box display="grid" gridTemplateRows="100px 1fr 100px">
          <Box sx={{ alignSelf: "center" }}>
            <h1 sx={{ margin: 0 }}>Алкоголь</h1>
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
                        ("0" + new Date(item.date).getDate()).slice(-2) +
                        "." +
                        ("0" + (new Date(item.date).getMonth() + 1)).slice(-2) +
                        "." +
                        new Date(item.date).getFullYear()
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
                      />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ alignSelf: "center" }}>
            <CreateAlcoholModal items={items} setItems={setItems} />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Alcohol;
