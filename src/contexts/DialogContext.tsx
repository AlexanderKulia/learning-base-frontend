import {
  createContext,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Dialog, DialogProps } from "../components/utils/Dialog";

interface DialogContextValue {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleDialog: (props: DialogProps) => void;
  handleDialogClose: (action: () => void) => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const useDialog = (): DialogContextValue => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialog must be within DialogProvider");
  }

  return context;
};

export const DialogProvider: FunctionComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialogProps, setDialogProps] = useState<DialogProps>({
    title: "",
    content: <></>,
    acceptButton: {
      label: "Accept",
      onClick: () => {
        setIsOpen(false);
      },
    },
  });

  const handleDialog = (props: DialogProps): void => {
    setDialogProps(props);
    setIsOpen(true);
  };

  const handleDialogClose = (action: () => void): void => {
    setIsLoading(true);
    action();
    setIsLoading(false);
    setIsOpen(false);
  };

  const value: DialogContextValue = {
    setIsOpen,
    handleDialog,
    handleDialogClose,
  };

  return (
    <DialogContext.Provider value={value}>
      {isOpen && (
        <Dialog isOpen={isOpen} isLoading={isLoading} {...dialogProps} />
      )}
      {children}
    </DialogContext.Provider>
  );
};
