import { describe, it, expect, afterEach, vi } from 'vitest';
import { Request } from 'node-fetch';
import * as workoutRepo from '@/lib/repository/WorkoutRepo'; // Ensure correct import path
import { GET as getAllWorkouts } from '../../app/api/workouts/route'; // Adjust the path as necessary
import {
  GET as getWorkoutsByUser,
  PATCH as updateWorkout,
  DELETE as deleteWorkout,
  POST as createWorkout,
} from '../../app/api/workouts/work/route'; // Adjust the path as necessary

// Mock the workoutRepo
vi.mock('@/lib/repository/WorkoutRepo', () => ({
  getAllWorkouts: vi.fn(),
  getWorkoutsByUser: vi.fn(),
  createWorkout: vi.fn(),
  findWorkout: vi.fn(),
  updateWorkout: vi.fn(),
  deleteWorkout: vi.fn(),
  getWorkoutById: vi.fn(),
  updateWorkoutById: vi.fn(),
  deleteWorkoutById: vi.fn(),
}));

describe('API /workouts Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/workouts', () => {
    it('should return 200 and a list of workouts', async () => {
      const mockWorkouts = [
        {
          email: '2025@gmail.com',
          name: 'Paras Singh Bhatia',
          exercise_type: 'legs',
          duration: 12,
          calories_burned: 2,
          workout_id: 17,
        },
        {
          email: '2025@gmail.com',
          name: 'Paras Singh Bhatia',
          exercise_type: 'chest',
          duration: 10,
          calories_burned: 40,
          workout_id: 20,
        },
      ];

      vi.spyOn(workoutRepo, 'getAllWorkouts').mockResolvedValue(mockWorkouts);

      const req = new Request('http://localhost:3000/api/workouts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await getAllWorkouts();
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual(mockWorkouts);
    });

    it('should return 404 if no workouts are found', async () => {
      vi.spyOn(workoutRepo, 'getAllWorkouts').mockResolvedValue([]);

      const req = new Request('http://localhost:3000/api/workouts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await getAllWorkouts();
      const responseJson = await res.json();

      expect(res.status).toBe(404);
      expect(responseJson).toEqual({ error: 'No Data To Show in Workouts' });
    });
  });

  describe('GET /api/workouts/work', () => {
    it('should return 200 and workouts for a specific user', async () => {
      const mockWorkouts = [
        {
          workout_id: 20,
          user_id: 8,
          exercise_type: 'chest',
          duration: 10,
          calories_burned: 40,
          workout_date: '2025-02-13T00:00:00.000Z',
        },
      ];

      vi.spyOn(workoutRepo, 'getWorkoutsByUser').mockResolvedValue(
        mockWorkouts
      );

      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', id: '8' },
      });

      const res = await getWorkoutsByUser(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual(mockWorkouts);
    });

    it('should return 404 if no workouts are found for the user', async () => {
      vi.spyOn(workoutRepo, 'getWorkoutsByUser').mockResolvedValue([]);

      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', id: '999' },
      });

      const res = await getWorkoutsByUser(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(404);
      expect(responseJson).toEqual({
        error: 'No Data To Show in Workouts By User',
      });
    });
  });

  describe('POST /api/workouts/work', () => {
    it('should return 201 and create a new workout', async () => {
      const newWorkout = {
        exercise_type: 'legs',
        duration: 12,
        calories_burned: 2,
        workout_date: '2025-02-28T00:00:00.000Z',
      };

      vi.spyOn(workoutRepo, 'findWorkout').mockResolvedValue([]);
      vi.spyOn(workoutRepo, 'createWorkout').mockResolvedValue();

      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify(newWorkout),
      });

      const res = await createWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(201);
      expect(responseJson).toEqual({ message: 'Workout Added Successfully' });
    });

    it('should return 400 if fields are missing', async () => {
      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify({ exercise_type: 'legs' }), // missing other fields
      });

      const res = await createWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: 'Enter All The Fields' });
    });

    it('should return 409 if workout already exists', async () => {
      vi.spyOn(workoutRepo, 'findWorkout').mockResolvedValue([
        { workout_id: 17 },
      ]);

      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify({
          exercise_type: 'legs',
          duration: 12,
          calories_burned: 2,
          workout_date: '2025-02-28T00:00:00.000Z',
        }),
      });

      const res = await createWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(409);
      expect(responseJson).toEqual({
        error: 'You have already added this exercise today',
      });
    });
  });

  describe('PATCH /api/workouts/work', () => {
    it('should return 200 and update a workout', async () => {
      const updatedWorkout = {
        workout_id: 17,
        exercise_type: 'lats',
        duration: 120,
        calories_burned: 122,
        workout_date: '2025-02-06T00:00:00.000Z',
      };

      vi.spyOn(workoutRepo, 'updateWorkout').mockResolvedValue();

      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify(updatedWorkout),
      });

      const res = await updateWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual({ message: 'Workout Updated Successfully' });
    });

    it('should return 400 if fields are missing', async () => {
      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify({ workout_id: 17 }), // missing other fields
      });

      const res = await updateWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: 'Enter All The Fields' });
    });
  });

  describe('DELETE /api/workouts/work', () => {
    it('should return 200 and delete a workout', async () => {
      vi.spyOn(workoutRepo, 'deleteWorkout').mockResolvedValue();

      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify({ workout_id: 17 }),
      });

      const res = await deleteWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual({ message: 'Workout Deleted Successfully' });
    });

    it('should return 400 if workout_id is missing', async () => {
      const req = new Request('http://localhost:3000/api/workouts/work', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify({}), // missing workout_id
      });

      const res = await deleteWorkout(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: 'Workout ID is required' });
    });
  });
});
