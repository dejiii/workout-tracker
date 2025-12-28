import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { queryClient } from "@/services/queryClient";
import { axiosInstance } from "@/uitls/axiosInstance";

export const useDeleteAWorkout = (id: string) => {
  return useMutation<void, AxiosError<unknown>, string>({
    mutationFn: async () => {
      await axiosInstance.delete(`/workouts/${id}`);
    },
    onSuccess: () => {
      toast.success("Workout deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onError: () => {
      toast.error("Workout deletion failed");
    },
  });
};
