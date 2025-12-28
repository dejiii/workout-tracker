import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("workout-tracker-token");

    document.cookie = "workout-tracker-token=; path=/; max-age=0";

    toast.success("Logged out successfully");
    router.push("/signin");
  };

  return { logout };
};
