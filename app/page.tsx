"use client";

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dumbbell, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import AddWorkoutForm from "@/components/forms/AddWorkoutForm";
import EditWorkoutModal from "@/components/forms/EditWorkoutModal";
import { CalendarEvent } from "@/types";
import { useWorkoutCalendar } from "@/hooks/useWorkoutCalendar";

const localizer = momentLocalizer(moment);

export default function Home() {
  const {
    events,
    isModalOpen,
    setIsModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedDate,
    setSelectedDate,
    selectedEvent,
    view,
    setView,
    handleSelectSlot,
    handleSelectEvent,
    handleAddWorkout,
    logout,
    isLoading,
  } = useWorkoutCalendar();

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 font-bold text-xl mb-10">
          <Dumbbell className="h-6 w-6 text-emerald-400" />
          <span>FitTrack</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            disabled
            className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            Workouts
          </Button>
          <Button
            variant="ghost"
            disabled
            className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
          >
            Analytics
          </Button>
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800 gap-2"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 flex-shrink-0">
          <h1 className="text-xl font-semibold text-zinc-900">
            Workout Calendar
          </h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Log Workout
            </Button>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-zinc-200 h-full p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
              </div>
            ) : (
              <Calendar<CalendarEvent>
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
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
            )}
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Workout"
      >
        <AddWorkoutForm
          initialDate={selectedDate}
          onSuccess={handleAddWorkout}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <EditWorkoutModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
