import { createContext, useContext, useState } from "react"

export const AppContext = createContext({})

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({})
    const [month, setMonth] = useState(null)
    const [day, setDay] = useState(null)
    const [week, setWeek] = useState(null)
    const [year, setYear] = useState(null)
    return (
        <AppContext.Provider value={{ data, setData, month, setMonth, day, setDay, week, setWeek, year, setYear }}>
            { children }
        </AppContext.Provider>
    );
}

export const useData = () => useContext(AppContext)