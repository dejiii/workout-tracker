"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema, WorkoutFormValues } from "@/lib/validations/workout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useUpdateWorkout } from "@/hooks/api/workouts/useUpdateWorkout";
import { useDeleteAWorkout } from "@/hooks/api/workouts/useDeleteWorkout";
import { Workout } from "@/types";

interface EditWorkoutFormProps {
  workout: Workout;
  onSuccess: () => void;
}

const EditWorkoutForm: React.FC<EditWorkoutFormProps> = ({
  workout,
  onSuccess,
}) => {
  const { mutate: updateWorkout, isPending: isUpdating } = useUpdateWorkout();
  const { mutate: deleteWorkout, isPending: isDeleting } = useDeleteAWorkout();

  const date = new Date(workout.date);
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutFormValues, unknown, WorkoutFormValues>({
    // @ts-expect-error: Resolver type mismatch between zod and react-hook-form
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: workout.type,
      duration: workout.duration,
      date: localISOTime,
      notes: workout.notes || "",
    },
  });

  const onSubmit = (data: WorkoutFormValues) => {
    updateWorkout(
      {
        id: workout._id,
        payload: {
          ...data,
          date: new Date(data.date),
        },
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this workout?")) {
      deleteWorkout(workout._id, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<WorkoutFormValues>)}
      className="space-y-4"
    >
      <Input
        label="Workout Type"
        id="edit-type"
        placeholder="e.g., Running, Weightlifting"
        error={errors.type?.message}
        {...register("type")}
      />
      <Input
        label="Duration (minutes)"
        id="edit-duration"
        type="number"
        placeholder="e.g., 60"
        error={errors.duration?.message}
        {...register("duration", { valueAsNumber: true })}
      />
      <Input
        label="Date"
        id="edit-date"
        type="datetime-local"
        error={errors.date?.message}
        {...register("date")}
      />
      <Textarea
        label="Notes (Optional)"
        id="edit-notes"
        placeholder="Add any notes about your workout..."
        error={errors.notes?.message}
        {...register("notes")}
      />

      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? "Deleting..." : "Delete Workout"}
        </Button>
        <Button type="submit" disabled={isUpdating || isDeleting}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditWorkoutForm;
