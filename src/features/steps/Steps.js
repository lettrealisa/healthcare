import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/system";
import StepsChart from "./StepsChart";

const Steps = () => {
  return (
    <>
      <h1>Шаги глюкозы</h1>
      <StepsChart />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AddCircleIcon
          className="addCircleIcon"
          sx={{ transform: "scale(1.3)", marginTop: "0.5rem" }}
        ></AddCircleIcon>
      </Box>
    </>
  );
};

export default Steps;
