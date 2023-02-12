import { useState } from "react";

const useDialogModal = (onConfirm?: () => void) => {
  const [dialogActive, setDialogActive] = useState(false);

  const openDialog = () => setDialogActive(true);
  const closeDialog = () => setDialogActive(false);

  const confirmDialog = () => {
    if (onConfirm) onConfirm();
    closeDialog();
  };

  return {
    dialogActive,

    openDialog,
    closeDialog,

    confirmDialog,
  };
};

export default useDialogModal;
