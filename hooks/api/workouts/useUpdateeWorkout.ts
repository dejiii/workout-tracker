import { queryClient } from "@/services/queryClient";
import { CreateWorkoutPayload } from "@/types";
import { axiosInstance } from "@/uitls/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type LoginError = {
  token: string;
};

export const useUpdateWorkout = ({ id }: { id: string }) => {
  return useMutation<
    unknown,
    AxiosError<LoginError>,
    Partial<CreateWorkoutPayload>
  >({
    mutationFn: async ({ type, duration, date, notes }) => {
      const { data } = await axiosInstance.put<unknown>(`/workouts/${id}`, {
        type,
        duration,
        date,
        notes,
      });
      return data;
    },

    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error("Task update failed: " + error.response?.data?.token);
    },
  });
};
