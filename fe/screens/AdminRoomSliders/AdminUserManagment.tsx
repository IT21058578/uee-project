import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { NativeBaseProvider, Button, Row, Column, Modal } from "native-base";
import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  useGetAllUsersInRoomQuery,
  useUnassignUserFromRoomMutation,
} from "../../Redux/API/users.api.slice";
import { useAppSelector } from "../../hooks/redux-hooks";
import InviteMemberModal from "../../components/InviteMemberModal";
import LoadingIndictator from "../../components/LoadingIndictator";
import { useAssignRoomAdminMutation } from "../../Redux/API/rooms.api.slice";

const AdminUserManage = () => {
  const roomId = useAppSelector((state) => state.user.roomId);
  const adminIds = useAppSelector((state) => state.room?.adminIds);
  const userId = useAppSelector((state) => state.user._id);
  const [isUnassignUserModalOpen, setIsUnassignUserModalOpen] = useState(false);
  const [isMakeAdminModalOpen, setIsMakeAdminModalOpen] = useState(false);
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);
  const [isUnassignAdminModalOpen, setIsUnassignAdminModalOpen] =
    useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const {
    data: { content: usersList } = {},
    refetch: refetchUsersList,
    isFetching: isUsersListFetching,
  } = useGetAllUsersInRoomQuery(roomId);
  const [unassignUser] = useUnassignUserFromRoomMutation();
  const [unassignAdmin] = useAssignRoomAdminMutation();
  const [assignAdmin] = useAssignRoomAdminMutation();

  const handleUnassignUserModalConfirm = async () => {
    try {
      console.log(selectedUserId);
      await unassignUser(selectedUserId).unwrap();
      setIsUnassignUserModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeAdminModalConfirm = async () => {
    try {
      console.log(selectedUserId);
      await assignAdmin({ userId: selectedUserId, roomId }).unwrap();
      setIsMakeAdminModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnassignAdminModalConfirm = async () => {
    try {
      console.log(selectedUserId);
      await unassignAdmin({ userId: selectedUserId, roomId }).unwrap();
      setIsUnassignAdminModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Button onPress={() => setIsInviteUserModalOpen(true)}>
            Add Member +
          </Button>
          <View style={styles.box3}>
            {isUsersListFetching ? (
              <LoadingIndictator />
            ) : (
              usersList?.map((user: any) => (
                <Row
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  marginX={2}
                  height={10}
                >
                  <Column>
                    <Text>{`${user.firstName}`}</Text>
                  </Column>
                  {userId !== user._id && (
                    <Column>
                      <Row space={2}>
                        {adminIds?.includes(user._id) ? (
                          <Button
                            onPress={() => {
                              setSelectedUserId(user._id);
                              setIsUnassignAdminModalOpen(true);
                            }}
                          >
                            Remove Admin
                          </Button>
                        ) : (
                          <Button
                            onPress={() => {
                              setSelectedUserId(user._id);
                              setIsMakeAdminModalOpen(true);
                            }}
                          >
                            Make Admin
                          </Button>
                        )}

                        <Button
                          onPress={() => {
                            setSelectedUserId(user._id);
                            setIsUnassignUserModalOpen(true);
                          }}
                        >
                          Remove
                        </Button>
                      </Row>
                    </Column>
                  )}
                </Row>
              ))
            )}
          </View>
        </ScrollView>
      </View>
      <ConfirmationModal
        isOpen={isUnassignUserModalOpen}
        title={"Are you sure?"}
        onCancel={() => setIsUnassignUserModalOpen(false)}
        onConfirm={handleUnassignUserModalConfirm}
      >
        Are you sure you want to remove this user? They will no longer be able
        to access this room or its tasks.
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={isMakeAdminModalOpen}
        title={"Are you sure?"}
        onCancel={() => setIsMakeAdminModalOpen(false)}
        onConfirm={handleMakeAdminModalConfirm}
      >
        Are you sure you want to make this user an admin? They will gain the
        ability to add or edit tasks and users.
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={isUnassignAdminModalOpen}
        title={"Are you sure?"}
        onCancel={() => setIsUnassignAdminModalOpen}
        onConfirm={handleUnassignAdminModalConfirm}
      >
        Are you sure you want remove this user as an admin? The changes already
        made by them will persist, but they will no loner be able to add or
        modify users and tasks
      </ConfirmationModal>
      <InviteMemberModal
        roomId={roomId}
        isOpen={isInviteUserModalOpen}
        onCancel={() => setIsInviteUserModalOpen(false)}
        onConfirm={refetchUsersList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 150,
    gap: 15,
  },
  container0: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  tabButton: {
    backgroundColor: Colors.colorLavender,
    borderRadius: 20,
    padding: 8,
    marginRight: 5,
  },
  button: {
    marginLeft: 150,
  },
  box0: {
    paddingTop: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  box1: {
    marginBottom: 20,
  },
  box11: {
    borderRadius: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    paddingVertical: 20,
    marginBottom: 20,
  },
  box12: {
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  box2: {
    flexDirection: "row",
    marginBottom: 0,
  },
  rectangle1: {},
  box3: {
    backgroundColor: Colors.colorGhostwhite,
    borderRadius: 10,
    shadowColor: Colors.darkText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: 10,
    marginBottom: 50,
  },
  typo1: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
  },
  typoBoddy: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
  },
  tabtypoBoddy: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
  },
  typoTitle: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-bold"],
    fontSize: FontSize.medium,
  },
  typoTitle1: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
  },
  rectangle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.colorWhite,
    borderRadius: 10,
    shadowColor: Colors.darkText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    verticalAlign: "middle",
  },
  backImg: {
    marginTop: 8,
  },
  box4: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  CheckboxSpace1: {
    flex: 1,
    alignItems: "center", // Align text to the center both vertically and horizontally
    backgroundColor: "#4CD97B",
    borderRadius: 10,
    marginLeft: 5,
    paddingVertical: 10,
  },
  text: {
    color: Colors.colorWhite,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },

  // Model Styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-between",
  },

  simpleModalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  // Styles for the cancel button
  cancelButton: {
    marginHorizontal: 10,
    flex: 1, // Adjust flex value as needed
  },
});

export default AdminUserManage;
