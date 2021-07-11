import { createContext, useState, useContext, FunctionComponent } from "react";
import { Dialog } from "../components/utils/Dialog";

const DialogContext = createContext<any>(null);

export const useDialog = () => {
  return useContext(DialogContext);
};

export const DialogProvider: FunctionComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cancelButton, setCancelButton] = useState("");
  const [acceptButton, setAcceptButton] = useState("");

  const handleModal = (props: any) => {
    setIsOpen(!isOpen);
    if (props) {
      setTitle(props.title);
      setContent(props.content);
      setCancelButton(props.cancelButton);
      setAcceptButton(props.acceptButton);
    }
  };

  const value = { setIsOpen, handleModal };

  return (
    <DialogContext.Provider value={value}>
      <Dialog
        open={isOpen}
        title={title}
        content={content}
        cancelButton={cancelButton}
        acceptButton={acceptButton}
        cancelButtonAction={() => {
          console.log("cancel button action");
        }}
        acceptButtonAction={() => {
          console.log("accept button action");
        }}
      />
      {children}
    </DialogContext.Provider>
  );
};
