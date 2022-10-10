import { Account, Client, Databases, Teams } from "appwrite";

const useClient = () => {
  const client = new Client();

  client
    .setEndpoint("http://ts205.antares-software.ru:8090/v1")
    .setProject("633ebaf12e896af166d6");

  const account = new Account(client);

  const teams = new Teams(client);

  const databases = new Databases(client);

  return { client, account, teams, databases };
};

export default useClient;
