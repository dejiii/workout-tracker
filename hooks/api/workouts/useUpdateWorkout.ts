import { queryClient } from "@/services/queryClient";
import { CreateWorkoutPayload } from "@/types";
import { axiosInstance } from "@/uitls/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type UpdateError = {
  message: string;
};

export const useUpdateWorkout = () => {
  return useMutation<
    unknown,
    AxiosError<UpdateError>,
    { id: string; payload: Partial<CreateWorkoutPayload> }
  >({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axiosInstance.put<unknown>(
        `/workouts/${id}`,
        payload
      );
      return data;
    },

    onSuccess: () => {
      toast.success("Workout updated successfully");
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: (error) => {
      toast.error(
        "Workout update failed: " +
          (error.response?.data?.message || "Unknown error")
      );
    },
  });
};
