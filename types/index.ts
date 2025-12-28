export * from "@/lib/validations/auth";

export interface Workout {
  _id: string;
  type: string;
  duration: number;
  date: Date;
  notes?: string;
}

export interface WorkoutFormValues {
  type: string;
  duration: number;
  date: string;
  notes?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface FilterWorkoutPayload {
  page: number;
  limit: number;
  status?: string;
  priority?: string;
}

export interface GetAllWorkoutsResponse {
  workouts: Workout[];
  total: number;
}

export interface CreateWorkoutPayload {
  type: string;
  duration: number;
  date: Date;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Workout;
}
