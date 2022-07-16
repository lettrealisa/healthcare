import axios from "axios"

const useAxios = () => {

    const getConn = async () => {
        const res = await axios.get("http://ts205.antares-software.ru:8089", { headers: { "API_KEY": "7a08cd1bf24be3fb86fdc42248a5ca16f1d889c2f94cfc31607527979f256b761c1690517813c9881ec4590832176f5692b737eacdf8f4e9b3fe85878fd10df994b57bc64c10e4c4aaf8f58c518228fd38a89b1fe623856d34d3fecd77731aac3fea56d7937f932148b637459138814136015fa0f0b0adf1a2c9b2eb0a9556d8" }})
        const data = await res.data
        console.log(data)
    }

    return  { getConn }
}

export default useAxios