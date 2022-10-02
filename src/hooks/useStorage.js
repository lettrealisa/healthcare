import { Storage } from "appwrite";
import useClient from "../components/auth/useClient";

const useStorage = () => {
  const { client } = useClient();

  const storage = new Storage(client);

  const promise = storage.listFiles("62ceca5e6b920b07a8de");

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};

export default useStorage;
