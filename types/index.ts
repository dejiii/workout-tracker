export * from "@/lib/validations/auth";

export interface Workout {
  id: string;
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
