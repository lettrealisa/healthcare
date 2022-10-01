import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/system";
import { useData } from "../../context/DataProvider";
import GlucoseChart from "./GlucoseChart";
import GlucoseChartSelect from "./GlucoseChartSelect";

const Glucose = () => {
  const { month, day } = useData();
  return (
    <>
      <h1>Глюкоза</h1>
      <GlucoseChartSelect></GlucoseChartSelect>
      <GlucoseChart></GlucoseChart>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddCircleIcon
          className="addCircleIcon"
          sx={{ transform: "scale(1.3)", marginTop: "0.5rem" }}
        ></AddCircleIcon>
      </Box>
    </>
  );
};

export default Glucose;
