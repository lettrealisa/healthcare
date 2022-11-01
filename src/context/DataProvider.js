import { createContext, useContext, useState } from "react";

export const AppContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [month, setMonth] = useState(8);
  const [day, setDay] = useState(10);
  const [week, setWeek] = useState(2);
  const [year, setYear] = useState(2022);
  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useData = () => useContext(AppContext);
