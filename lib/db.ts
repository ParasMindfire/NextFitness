import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "", // Database name
  process.env.MYSQL_NAME || "", // Database username
  process.env.MYSQL_PASSWORD,
  {
    // Database password
    host: process.env.MYSQL_HOST || "127.0.0.1", // Database host
    dialect: "mysql", // Defining the SQL dialect as MySQL
    dialectModule: require("mysql2"),
    logging: console.log,
  },
);

try {
  sequelize.authenticate();
  console.log("Conncection has been established successfully.");
} catch (error) {
  console.log("Error connecting databse:", error);
}

sequelize
  .sync()
  .then((data) => {
    console.log("databse synced successfully.");
  })
  .catch((error) => {
    console.log("Error syncing databse:", error);
  });











  
