"use client";

import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import AddWorkoutForm from "@/components/AddWorkoutForm";
import { Workout, WorkoutFormValues } from "@/types";
import { v4 as uuidv4 } from "uuid";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Workout;
}

const INITIAL_WORKOUTS: Workout[] = [
  {
    id: "1",
    type: "Running",
    duration: 30,
    date: new Date(),
    notes: "Easy morning run",
  },
];

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>(INITIAL_WORKOUTS);
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

  const handleAddWorkout = (data: WorkoutFormValues) => {
    const newWorkout: Workout = {
      id: uuidv4(),
      type: data.type,
      duration: data.duration,
      date: new Date(data.date),
      notes: data.notes,
    };

    setWorkouts((prev) => [...prev, newWorkout]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          {/* Add logo or title here if needed */}
          <h1 className="text-xl font-bold text-zinc-900">Workout Tracker</h1>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Workout
        </Button>
      </header>

      <main className="flex-1 p-6 overflow-hidden">
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
