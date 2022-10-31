import { Box, Container } from "@mui/system";
import Header from "../common/Header";
import GlucoseChart from "./GlucoseChart";

const Glucose = () => {
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
            <h1>Глюкоза</h1>
          </Box>
          <GlucoseChart />
        </Box>
      </Container>
    </>
  );
};

export default Glucose;
