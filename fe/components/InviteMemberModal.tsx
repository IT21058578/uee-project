import { Button, Input, Modal, Stack, Text } from "native-base";
import React, { useState } from "react";
import { useAssignUserToRoomMutation } from "../Redux/API/users.api.slice";

type Props = {
  isOpen: boolean;
  roomId: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const InviteMemberModal = (props: Props) => {
  const { isOpen, onCancel, onConfirm, roomId } = props;
  const [email, setEmail] = useState<string>("");
  const [assignUser, { isLoading: isAssingUserLoading }] =
    useAssignUserToRoomMutation();

  const handleInviteMemberConfirm = async () => {
    try {
      console.log(
        `Inviting user with email ${email} to room with id ${roomId}`
      );
      await assignUser({ email, roomId }).unwrap();
      console.log(
        `Successfully invited user with email ${email} to room with id ${roomId}`
      );
    } catch (error) {
      console.error(error);
    }
    onConfirm?.();
    onCancel?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <Modal.Content>
        <Modal.CloseButton onPress={onCancel} />
        <Modal.Header>Invite new member</Modal.Header>
        <Modal.Body>
          <Stack space={3}>
            <Text>
              Please enter the email of the user you want to add to this room.
            </Text>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{ height: 40, fontSize: 13 }}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" onPress={onCancel}>
              Cancel
            </Button>
            <Button onPress={handleInviteMemberConfirm}>Confirm</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default InviteMemberModal;
