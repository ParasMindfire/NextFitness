import { DataTypes } from 'sequelize';
import {sequelize} from '../lib/db';
import User from './User';


//Fitness Goal Model
const FitnessGoal = sequelize.define('FitnessGoal', {
  goal_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    },
    allowNull: false,
  },
  goal_type: {
    type: DataTypes.ENUM("weight_loss","workout_per_week"),
    allowNull: false,
  },
  target_value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  current_progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending","complete","incomplete"),
    allowNull: false,
    defaultValue:"pending"
  },
}, {
  tableName: 'fitness_goals',
  timestamps: false
});

export default FitnessGoal;