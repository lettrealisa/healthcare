import { useEffect, useState } from "react";
import useClient from "../auth/useClient";

const useCategories = () => {
  const { databases } = useClient();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        "634dedc1c1782cef9a5f"
      );
      setCategories(res);
    };

    getDocuments();
  }, []);

  return { categories };
};

export default useCategories;
