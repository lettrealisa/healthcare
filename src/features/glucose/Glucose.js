import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ru";
import { useState } from "react";
import GlucoseChart from "./GlucoseChart";

const ColorCheckbox = styled(Checkbox)(({ theme }) => ({
  color: pink[600],
  "&.Mui-checked": {
    color: pink[600],
  },
}));

const Glucose = () => {
  const [locale, setLocale] = useState("ru");
  const [date, setDate] = useState(new Date());
  const [byMonth, setByMonth] = useState(false);

  const toggleByMonth = () => {
    setByMonth((prev) => !prev);
  };

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

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <Box
                maxWidth={345}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControl
                  fullWidth
                  variant="standard"
                  sx={{ marginRight: "1rem" }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={locale}
                  >
                    <DateTimePicker
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControlLabel
                  control={
                    <ColorCheckbox
                      id="byMonth"
                      value={byMonth}
                      onChange={toggleByMonth}
                    />
                  }
                  label="Месяц"
                />
              </Box>
            </Grid>
          </Grid>

          <GlucoseChart date={date} byMonth={byMonth} />
        </Box>
      </Container>
    </>
  );
};

export default Glucose;
