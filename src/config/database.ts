import { Db, MongoClient } from "mongodb";

type ConnectType = {
  database: Db;
  client: MongoClient;
  error?: unknown;
};

const client = new MongoClient(String(process.env.MONGODB_URI));
const database = client.db(String(process.env.MONGODB_DATABASE));

export const dbConnect = async (): Promise<ConnectType> => {
  try {
    await client.connect();
    return {
      database,
      client,
    };
  } catch (error) {
    console.log(error);
    return { client, database };
  }
};
export const CloseDb = async () => {
    await client.close();
}

export const UsersColletion = database.collection("users");
export const VehiclesColletion = database.collection("vehicles");
export const FinesColletion = database.collection("fines");
export const ServicesColletion = database.collection("services");
export const FuelColletion = database.collection("fuel");