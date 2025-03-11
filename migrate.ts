const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// MySQL connection config
const mysqlConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    port: parseInt(process.env.DB_PORT || '3306')
};

// MongoDB connection string
const mongoUri = process.env.MONGODB_URI || '';

async function migrateData() {
    // Connect to MySQL
    const mysqlConnection = await mysql.createConnection(mysqlConfig);
    console.log('Connected to MySQL');

    // Connect to MongoDB
    const mongoClient = await MongoClient.connect(mongoUri);
    const db = mongoClient.db('MongoFitness');
    console.log('Connected to MongoDB');

    try {
        // Migrate users
        try {
            const [users] = await mysqlConnection.execute('SELECT * FROM users');
            if (users.length > 0) {
                await db.collection('users').insertMany(users);
                console.log(`Migrated ${users.length} users`);
            } else {
                console.log('No users found to migrate');
            }
        } catch (error) {
            console.error('Error migrating users:', error);
        }

        // Migrate workouts
        try {
            const [workouts] = await mysqlConnection.execute('SELECT * FROM workouts');
            console.log(`Found ${workouts.length} workouts to migrate`);

            // Prepare recipes for MongoDB
            const workoutDocuments = workouts.map((workout: any) => ({ ...workout }));

            if (workouts.length > 0) {
                await db.collection('workouts').insertMany(workoutDocuments);
                console.log(`Migrated ${workoutDocuments.length} recipes`);
            } else {
                console.log('No workouts found to migrate');
            }
        } catch (error) {
            console.error('Error migrating recipes:', error);
        }

        // Migrate fitness_goals
        try {
            const [goals] = await mysqlConnection.execute('SELECT * FROM fitness_goals');
            if (goals.length > 0) {
                await db.collection('goals').insertMany(goals);
                console.log(`Migrated ${goals.length} goals`);
            } else {
                console.log('No goals found to migrate');
            }
        } catch (error) {
            console.error('Error migrating goals:', error);
        }

        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        // Close connections
        await mysqlConnection.end();
        await mongoClient.close();
        console.log('Connections closed');
    }
}

migrateData().catch(console.error);