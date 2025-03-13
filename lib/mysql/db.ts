import { Sequelize } from 'sequelize';

//intialising database
export const sequelize = new Sequelize(
  process.env.DB_NAME || '', // Database name
  process.env.DB_USER || '', // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST || '127.0.0.1', // Database host
    dialect: 'mysql', // Defining the SQL dialect as MySQL
    dialectModule: require('mysql2'),
    logging: console.log,
  }
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Error connecting to the database:', error);
}

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });