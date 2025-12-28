import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";

import { axiosInstance } from "@/uitls/axiosInstance";
import { FilterWorkoutPayload, GetAllWorkoutsResponse } from "@/types";

export const useGetAllWorkouts = ({
  page,
  limit,
  status,
  priority,
}: FilterWorkoutPayload) => {
  return useQuery<GetAllWorkoutsResponse, AxiosError<unknown>>({
    queryKey: ["workouts", page, limit, status, priority],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetAllWorkoutsResponse>(
        `/workouts?page=${page}&limit=${limit}&status=${status}&priority=${priority}`
      );
      return data;
    },
  });
};
