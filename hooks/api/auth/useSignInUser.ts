import { axiosInstance } from "@/uitls/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type SignInPayload = {
  email: string;
  password: string;
};

type SignInResponse = {
  token: string;
  user?: {
    id: string;
    email: string;
  };
};

type SignInError = {
  token: string;
};

export const useSignInUser = () => {
  const router = useRouter();

  return useMutation<SignInResponse, AxiosError<SignInError>, SignInPayload>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<SignInResponse>(
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

        document.cookie = `workout-tracker-token=${data.token}; path=/; max-age=86400; SameSite=Strict`;

        setTimeout(() => {
          router.push("/");
          toast.success("Sign in successful");
        }, 1500);
      }
    },

    onError: (error) => {
      const errorMessage =
        (error.response?.data as SignInError)?.token || "Sign in failed";
      toast.error(errorMessage);
    },
  });
};
