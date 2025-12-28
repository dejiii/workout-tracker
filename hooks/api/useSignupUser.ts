import { axiosInstance } from "@/uitls/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  name: string;
  id: string;
  email: string;
};

type LoginError = {
  token: string;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError<LoginError>, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<LoginResponse>(
        "/auth/signin/",
        payload
      );
      return data;
    },

    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem(
          "workout-tracker-token",
          JSON.stringify(data.token)
        );

        // document.cookie = `workout-tracker-token=${data.token}; path=/; max-age=86400; SameSite=Strict`;

        setTimeout(() => {
          router.push("/");
          toast.success("Login successful");
        }, 1500);
      }
    },

    onError: (error) => {
      const errorMessage =
        (error.response?.data as LoginError)?.token || "Login failed";
      toast.error(errorMessage);
    },
  });
};
