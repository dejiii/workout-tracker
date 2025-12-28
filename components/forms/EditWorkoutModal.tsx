import React from "react";
import { Modal } from "@/components/ui/Modal";
import { CalendarEvent } from "@/types";
import EditWorkoutForm from "./EditWorkoutForm";

type EditWorkoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
};

const EditWorkoutModal = ({
  isOpen,
  onClose,
  event,
}: EditWorkoutModalProps) => {
  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Workout">
      <EditWorkoutForm workout={event.resource} onSuccess={onClose} />
    </Modal>
  );
};

export default EditWorkoutModal;
