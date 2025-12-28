import * as z from "zod";

export const workoutSchema = z.object({
  type: z.string().min(1, "Workout type is required"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  notes: z.string().optional(),
});

export type WorkoutFormValues = z.infer<typeof workoutSchema>;
