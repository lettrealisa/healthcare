import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useClient from "../auth/useClient";
import CreateAlcoholModal from "./CreateAlcoholModal";

const Alcohol = () => {
  const collectionId = "633f248cc4c8e69b367d";

  const [items, setItems] = useState([]);

  const [values, setValues] = useState({
    date: Date.now(),
    name: "",
    volume: "",
    value: null,
  });

  const { databases } = useClient();

  useEffect(() => {
    const getDocuments = async () => {
      setItems(await databases.listDocuments(collectionId));
      console.log(await databases.listDocuments(collectionId));
    };
    getDocuments();
  }, [items]);

  return (
    <>
      <h1>Алкоголь</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {items?.documents?.map((item) => (
          <Grid item xs={2} sm={4} md={4}>
            {item.name}
          </Grid>
        ))}
      </Grid>
      <CreateAlcoholModal />
    </>
  );
};

export default Alcohol;
