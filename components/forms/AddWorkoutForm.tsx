"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workoutSchema, WorkoutFormValues } from "@/lib/validations/workout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useAddWorkout } from "@/hooks/api/workouts/useAddWorkout";

interface AddWorkoutFormProps {
  onSuccess: (data: WorkoutFormValues) => void;
  onCancel: () => void;
  initialDate?: Date;
}

const AddWorkoutForm: React.FC<AddWorkoutFormProps> = ({
  onSuccess,
  onCancel,
  initialDate,
}) => {
  const { mutate: addWorkout, isPending } = useAddWorkout();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: "",
      duration: 0,
      date: initialDate
        ? initialDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  const onSubmit = (data: WorkoutFormValues) => {
    addWorkout(
      {
        ...data,
        date: new Date(data.date),
      },
      {
        onSuccess: () => {
          onSuccess(data);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Workout Type"
        id="type"
        placeholder="e.g. Running, Weightlifting, Yoga"
        error={errors.type?.message}
        {...register("type")}
      />

      <Input
        label="Duration (minutes)"
        id="duration"
        type="number"
        placeholder="e.g. 45"
        error={errors.duration?.message}
        {...register("duration")}
      />

      <Input
        label="Date"
        id="date"
        type="date"
        error={errors.date?.message}
        {...register("date")}
      />

      <Textarea
        label="Notes"
        id="notes"
        placeholder="How did it go?"
        error={errors.notes?.message}
        {...register("notes")}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Workout"}
        </Button>
      </div>
    </form>
  );
};

export default AddWorkoutForm;
