import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { queryClient } from "@/services/queryClient";
import { axiosInstance } from "@/uitls/axiosInstance";

export const useDeleteAWorkout = () => {
  return useMutation<void, AxiosError<unknown>, string>({
    mutationFn: async (id) => {
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
