import { useState, useMemo } from "react";
import { View, Views } from "react-big-calendar";
import moment from "moment";
import { useGetAllWorkouts } from "@/hooks/api/workouts/useGetWorkouts";
import { useLogout } from "@/hooks/api/auth/useLogoutUser";
import { CalendarEvent } from "@/types";

export const useWorkoutCalendar = () => {
  const { data, isLoading } = useGetAllWorkouts({
    page: 1,
    limit: 1000,
  });

  const workouts = data?.workouts || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);

  const events = useMemo(() => {
    return workouts
      .map((workout) => {
        const start = new Date(workout.date);
        if (isNaN(start.getTime())) return null;

        const end = moment(start).add(workout.duration, "minutes").toDate();

        return {
          id: workout.id,
          title: `${workout.type} (${workout.duration}m)`,
          start,
          end,
          resource: workout,
        };
      })
      .filter((event): event is CalendarEvent => event !== null);
  }, [workouts]);

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleAddWorkout = () => {
    setIsModalOpen(false);
  };

  const { logout } = useLogout();

  return {
    workouts,
    events,
    isModalOpen,
    setIsModalOpen,
    selectedDate,
    setSelectedDate,
    view,
    setView,
    handleSelectSlot,
    handleAddWorkout,
    logout,
    isLoading,
  };
};
