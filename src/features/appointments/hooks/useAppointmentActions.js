import { useState } from 'react';

const useAppointmentActions = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handleMenuOpen = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setCurrentAppointment(appointment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openRescheduleDialog = (appointment) => {
    setCurrentAppointment(appointment);
    setRescheduleOpen(true);
    handleMenuClose();
  };

  const openCompleteDialog = (appointment) => {
    setCurrentAppointment(appointment);
    setCompleteDialogOpen(true);
    handleMenuClose();
  };

  const openCancelDialog = (appointment) => {
    setCurrentAppointment(appointment);
    setCancelDialogOpen(true);
    handleMenuClose();
  };

  const closeRescheduleDialog = () => {
    setRescheduleOpen(false);
  };

  const closeCompleteDialog = () => {
    setCompleteDialogOpen(false);
  };

  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  return {
    anchorEl,
    currentAppointment,
    rescheduleOpen,
    completeDialogOpen,
    cancelDialogOpen,
    handleMenuOpen,
    handleMenuClose,
    openRescheduleDialog,
    openCompleteDialog,
    openCancelDialog,
    closeRescheduleDialog,
    closeCompleteDialog,
    closeCancelDialog
  };
};

export default useAppointmentActions;