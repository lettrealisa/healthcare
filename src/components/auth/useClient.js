import { Account, Client, Teams } from "appwrite";

const useClient = () => {
  const client = new Client();

  client
    .setEndpoint("http://ts205.antares-software.ru:8089/v1")
    .setProject("632080ca1b895d0cb8f8");

  const account = new Account(client);

  const teams = new Teams(client);

  return { client, account, teams };
};

export default useClient;
