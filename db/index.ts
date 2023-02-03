import "reflect-metadata";
import { User, New_user, Text, TextLIST, Usersay } from "./entities/index";
import { createConnection, Connection, getConnection } from "typeorm";
let connections: Promise<Connection> | null = null;
export const parn = async () => {
  if (!connections) {
    connections = (async () => {
      try {
        const setConnetion = getConnection();
        console.log("关闭");
        await setConnetion.close();
      } catch (e) {}
      console.log("开启");
      const setConnetion = await createConnection({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        entities: [User, New_user, Text, TextLIST, Usersay],
      });
      return setConnetion;
    })();
  }
  return await connections;
};
