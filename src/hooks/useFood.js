import axios from "axios"


const useFood = () => {

    const getFood = async () => {
        const res = await axios.get("http://localhost:12012");
        const data = await res.data;
        console.log(data);
        //const r = JSON.parse(data);
        console.log(data.documents[0].$id);
        //console.log({"name":"Jeff"});
    }

    const createFood = async (name, volume, value, date) => {
        const res = await axios.post("http://localhost:12012/alcohol", { name: name, volume: volume, value: value, date: date });
        //const res = await axios.get("http://localhost:12012/alcohol");
        const data = await res.data;
        console.log(data);
    }
    return { getFood, createFood }
}

export default useFood