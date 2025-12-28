import { axiosInstance } from "@/uitls/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type SignUpPayload = {
  email: string;
  password: string;
};

type SignUpResponse = {
  token: string;
  name: string;
  id: string;
  email: string;
};

type SignUpError = {
  token: string;
};

export const useSignUpUser = () => {
  const router = useRouter();

  return useMutation<SignUpResponse, AxiosError<SignUpError>, SignUpPayload>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<SignUpResponse>(
        "/auth/signup/",
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
          toast.success("Sign up successful");
        }, 1500);
      }
    },

    onError: (error) => {
      const errorMessage =
        (error.response?.data as SignUpError)?.token || "Sign up failed";
      toast.error(errorMessage);
    },
  });
};
