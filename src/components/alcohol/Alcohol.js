import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useClient from "../auth/useClient";
import CreateAlcoholModal from "./CreateAlcoholModal";

const Alcohol = () => {
  const [items, setItems] = useState([
    { name: "aaaaaaaaa" },
    { name: "baaaaaaaaaaaaa" },
    { name: "caaaaaaaaaaaa" },
    { name: "daaaaaaaaaa" },
    { name: "eaaaaaa" },
  ]);
  const { databases, account } = useClient();

  useEffect(() => {
    const getDocuments = async () => {
      //setItems(await databases.listDocuments("633f248cc4c8e69b367d"));
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
        {items?.map((item) => (
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
