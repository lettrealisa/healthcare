import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useData } from "../../context/DataProvider";

const GlucoseChartSelect = () => {
  const {
    data,
    setData,
    month,
    setMonth,
    day,
    setDay,
    week,
    setWeek,
    year,
    setYear,
  } = useData();

  const handleMonth = (month) => {
    setMonth(month);
  };

  const handleDay = (day) => {
    setDay(day);
  };

  const handleWeek = (week) => {
    setWeek(week);
  };

  const handleYear = (year) => {
    setYear(parseInt(year));
  };

  const months = {
    Январь: 31,
  };

  return (
    <>
      <FormControl sx={{ minWidth: 120, marginRight: "1rem" }}>
        <InputLabel id="demo-select-small">Месяц</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={month}
          label="Месяц"
          onChange={(e) => handleMonth(e.target.value)}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          <MenuItem value={1}>Январь</MenuItem>
          <MenuItem value={2}>Февраль</MenuItem>
          <MenuItem value={3}>Март</MenuItem>
          <MenuItem value={8}>Август</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, marginRight: "1rem" }}>
        <InputLabel id="demo-select-small">Число</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={day}
          label="Число"
          onChange={(e) => handleDay(e.target.value)}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          <MenuItem value={31}>31</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={29}>29</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120, marginRight: "1rem" }}>
        <InputLabel id="demo-select-small">Неделя</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={week}
          label="Неделя"
          onChange={(e) => handleWeek(e.target.value)}
        >
          <MenuItem value="">
            <em>Не выбрано</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <TextField
          id="outlined-number"
          label="Год"
          type="number"
          value={year}
          onChange={(e) => handleYear(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
    </>
  );
};

export default GlucoseChartSelect;
