import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Box, Container } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/ru";
import { useState } from "react";
import { Header } from "../../common/Header";
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

  const weeks = [1, 2, 3, 4];

  const [week, setWeek] = useState(1);

  const handleWeekChange = (e) => {
    setWeek(e.target.value);
  };

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
            <h1>Глюкоза</h1>
          </Box>

          <Box
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
                <DatePicker
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControlLabel
              fullWidth
              control={
                <ColorCheckbox
                  id="byMonth"
                  value={byMonth}
                  onChange={toggleByMonth}
                />
              }
              label="Месяц"
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="select">Неделя</InputLabel>
              <Select
                labelId="select"
                id="select"
                value={week}
                onChange={handleWeekChange}
                label="Неделя"
              >
                {weeks.map((week) => (
                  <MenuItem value={week}>{week}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <GlucoseChart date={date} byMonth={byMonth} week={week}/>
        </Box>
      </Container>
    </>
  );
};

export default Glucose;
