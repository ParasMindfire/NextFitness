import { sequelize } from '../db';

// Retrieves all fitness goals for a given user
export const getAllFitnessGoals = async (userId: number): Promise<any> => {
  const [fitnessGoals]: any = await sequelize.query(
    'SELECT * FROM fitness_goals WHERE user_id = ?',
    { replacements: [userId] }
  );
  return fitnessGoals;
};

// Retrieves a single fitness goal based on its goal_id
export const getSingleFitnessGoal = async (goalId: number|string): Promise<any> => {
  const [goal]: any = await sequelize.query(
    'SELECT * FROM fitness_goals WHERE goal_id = ?',
    { replacements: [goalId] }
  );
  return goal;
};

// Creates a new fitness goal for a user
export const createFitnessGoal = async (
  userId: number,
  goalType: string,
  targetValue: number,
  currentProgress: number,
  startDate: string,
  endDate: string,
  status:string
): Promise<void> => {
  await sequelize.query(
    'INSERT INTO fitness_goals (user_id, goal_type, target_value, current_progress, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
    {
      replacements: [
        userId,
        goalType,
        targetValue,
        currentProgress,
        startDate,
        endDate,
      ],
    }
  );
};

// Updates an existing fitness goal based on goal_id
export const updateFitnessGoal = async (
  goalId: number|string,
  targetValue: number,
  currentProgress: number,
  status: string
): Promise<void> => {
  await sequelize.query(
    'UPDATE fitness_goals SET target_value=?, current_progress=?, status=? WHERE goal_id=?',
    { replacements: [targetValue, currentProgress, status, goalId] }
  );
};

// Deletes a fitness goal based on its goal_id
export const deleteFitnessGoal = async (goalId: number|string): Promise<void> => {
  await sequelize.query('DELETE FROM fitness_goals WHERE goal_id=?', {
    replacements: [goalId],
  });
};

export const getAllFitnesswithUsername = async (): Promise<void> => {
  const [goals]: any = await sequelize.query(
    'select * from fitness_goals inner join users on fitness_goals.user_id=users.user_id'
  );

  return goals;
};