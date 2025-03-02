import { describe, it, expect, afterEach, vi } from 'vitest';
import { Request } from 'node-fetch';
import * as fitnessGoalsRepo from '@/lib/repository/FitnessRepo'; // Ensure correct import path
import { GET as getAllFitnessGoals, POST as createFitnessGoal } from '../../app/api/goals/fitness/route'; // Adjust the path as necessary

// Mock the fitnessGoalsRepo
vi.mock('@/lib/repository/FitnessRepo', () => ({
  getAllFitnessGoals: vi.fn(),
  createFitnessGoal: vi.fn(),
}));

describe('API /goals/fitness Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/goals/fitness', () => {
    it('should return 200 and a list of fitness goals', async () => {
      const mockGoals = [
        {
          goal_id: 10,
          user_id: 8,
          goal_type: "workout_per_week",
          target_value: 18,
          current_progress: 13,
          start_date: "2025-02-04T00:00:00.000Z",
          end_date: "2025-02-20T00:00:00.000Z",
          status: "pending"
        },
        {
          goal_id: 13,
          user_id: 8,
          goal_type: "workout_per_week",
          target_value: 20,
          current_progress: 10,
          start_date: "2025-02-13T00:00:00.000Z",
          end_date: "2025-02-11T00:00:00.000Z",
          status: "pending"
        },
        {
          goal_id: 14,
          user_id: 8,
          goal_type: "workout_per_week",
          target_value: 12,
          current_progress: 6,
          start_date: "2025-02-11T00:00:00.000Z",
          end_date: "2025-02-28T00:00:00.000Z",
          status: "pending"
        },
        {
          goal_id: 15,
          user_id: 8,
          goal_type: "weight_loss",
          target_value: 81.6,
          current_progress: 83.9,
          start_date: "2025-02-13T00:00:00.000Z",
          end_date: "2025-02-25T00:00:00.000Z",
          status: "pending"
        }
      ];

      vi.spyOn(fitnessGoalsRepo, 'getAllFitnessGoals').mockResolvedValue(mockGoals);

      const req = new Request('http://localhost:3000/api/goals/fitness', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', id: '8' },
      });

      const res = await getAllFitnessGoals(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual(mockGoals);
    });

    it('should return 404 if no fitness goals are found', async () => {
      vi.spyOn(fitnessGoalsRepo, 'getAllFitnessGoals').mockResolvedValue([]);

      const req = new Request('http://localhost:3000/api/goals/fitness', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', id: '8' },
      });

      const res = await getAllFitnessGoals(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(404);
      expect(responseJson).toEqual({ error: 'No fitness goals found' });
    });

    it('should return 401 if unauthorized', async () => {
      const req = new Request('http://localhost:3000/api/goals/fitness', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }, // Missing id header
      });

      const res = await getAllFitnessGoals(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(401);
      expect(responseJson).toEqual({ error: 'Unauthorized' });
    });
  });

  describe('POST /api/goals/fitness', () => {
    it('should return 201 and create a new fitness goal', async () => {
      const newGoal = {
        goal_type: "weight_loss",
        target_value: 81.6,
        current_progress: 83.9,
        start_date: "2025-02-13",
        end_date: "2025-02-25"
      };

      vi.spyOn(fitnessGoalsRepo, 'createFitnessGoal').mockResolvedValue();

      const req = new Request('http://localhost:3000/api/goals/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify(newGoal)
      });

      const res = await createFitnessGoal(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(201);
      expect(responseJson).toEqual({ message: "Fitness goal created successfully" });
    });

    it('should return 400 if fields are missing', async () => {
      const req = new Request('http://localhost:3000/api/goals/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', id: '8' },
        body: JSON.stringify({ goal_type: "weight_loss" }) // missing other fields
      });

      const res = await createFitnessGoal(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: "All fields are required" });
    });

    it('should return 401 if unauthorized', async () => {
      const req = new Request('http://localhost:3000/api/goals/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Missing id header
        body: JSON.stringify({
          goal_type: "weight_loss",
          target_value: 81.6,
          current_progress: 83.9,
          start_date: "2025-02-13",
          end_date: "2025-02-25"
        })
      });

      const res = await createFitnessGoal(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(401);
      expect(responseJson).toEqual({ error: "Unauthorized" });
    });
  });
});
