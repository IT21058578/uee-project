import { Button, Modal } from "native-base";
import React from "react";

type Props = {
  isOpen: boolean;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
};

const ConfirmationModal = (props: Props) => {
  const { isOpen, title, children, onCancel, onConfirm } = props;
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <Modal.Content>
        <Modal.CloseButton onPress={onCancel} />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" onPress={onCancel}>
              Cancel
            </Button>
            <Button onPress={onConfirm}>Confirm</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
