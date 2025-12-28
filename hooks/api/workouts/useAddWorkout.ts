import { queryClient } from "@/services/queryClient";
import { CreateWorkoutPayload } from "@/types";
import { axiosInstance } from "@/uitls/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export const useAddWorkout = () => {
  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    CreateWorkoutPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<unknown>("/workouts", payload);
      return data;
    },

    onSuccess: () => {
      toast.success("Workout added successfully");
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => {
      toast.error("Workout creation failed: " + error.response?.data?.message);
    },
  });
};
