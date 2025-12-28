"use client";

import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dumbbell, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import AddWorkoutForm from "@/components/AddWorkoutForm";
import { Workout } from "@/types";
import { useGetAllWorkouts } from "@/hooks/api/workouts/useGetWorkouts";
import { useLogout } from "@/hooks/api/auth/useLogoutUser";
import { useWorkoutCalendar } from "@/hooks/useWorkoutCalendar";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Workout;
}

export default function Home() {
  const {
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
  } = useWorkoutCalendar();

  return (
    <div className="flex flex-col h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-black font-medium text-lg">
            <Dumbbell className="h-6 w-6" />
            <span>Workout Tracker</span>
          </div>
        </div>
        <Button onClick={() => logout()} variant="destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>

      <main className="flex-1 p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3>Total: {workouts.length} workouts</h3>

          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Workout
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="h-full bg-white rounded-lg shadow-sm border border-zinc-200 p-4">
            <Calendar<CalendarEvent>
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              selectable
              onSelectSlot={handleSelectSlot}
              views={["month", "week", "day", "agenda"]}
              view={view}
              onView={setView}
              date={selectedDate}
              onNavigate={setSelectedDate}
              eventPropGetter={(event) => ({
                className:
                  "bg-zinc-900 text-white rounded-md border-none text-xs",
              })}
            />
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Workout"
      >
        <AddWorkoutForm
          onSuccess={handleAddWorkout}
          onCancel={() => setIsModalOpen(false)}
          initialDate={selectedDate}
        />
      </Modal>
    </div>
  );
}
