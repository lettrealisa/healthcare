import { Box, Container } from "@mui/system";
import ResponsiveAppBar from "../common/ResponsiveAppBar";
import GlucoseChart from "./GlucoseChart";

const Glucose = () => {
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
            <h1>Глюкоза</h1>
          </Box>
          <GlucoseChart />
        </Box>
      </Container>
    </>
  );
};

export default Glucose;
