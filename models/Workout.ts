import { DataTypes } from 'sequelize';
import { sequelize } from '../lib/db';
import User from './User';

//Workout Logging Model
const Workout = sequelize.define(
  'Workout',
  {
    workout_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
      allowNull: false,
    },
    exercise_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calories_burned: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    workout_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'workouts',
    timestamps: false,
  }
);

export default Workout;
