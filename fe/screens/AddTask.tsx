import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import {
  NativeBaseProvider,
  Input,
  TextArea,
  useNativeBase,
  useToast,
} from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { Checkbox, Button } from "native-base";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  useCreatetaskMutation,
  useGettaskQuery,
  useUpdatetaskMutation,
} from "../Redux/API/tasks.api.slice";
import { Tasks } from "../types";
import Calendar from "../components/Calendar/calender";
import moment, { Moment } from "moment";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  useGetAllUsersInRoomQuery,
  useGetAllUsersQuery,
} from "../Redux/API/users.api.slice";
import Toast from "react-native-toast-message";
import { useAppSelector } from "../hooks/redux-hooks";
import LoadingIndictator from "../components/LoadingIndictator";
import PrioritySelector from "../components/PrioritySelector";
import ToastAlert from "../components/ToastAlert";

const AddTask = ({ route }: any) => {
  const roomId = route?.params?.roomId;
  const navigation = useNavigation();
  const toast = useToast();
  const { data: userData } = useGetAllUsersInRoomQuery(roomId ?? "", {
    refetchOnMountOrArgChange: true,
  });
  const [createTask, { isLoading: isCreateTaskLoading }] =
    useCreatetaskMutation();
  const [selectedDate, setSelectedDate] = useState<Moment | null>(moment());
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleBackNav = () => {
    navigation.goBack();
  };

  const handleDateSelect = (date: Moment) => {
    setSelectedDate(date);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (userId: string) => {
    if (selectedUserIds?.includes(userId)) {
      setSelectedUserIds(selectedUserIds?.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleDurationSelection = (pickedDuration: any) => {
    const { hours, minutes, seconds } = pickedDuration;
    const duration = dayjs.duration({
      hours,
      minutes,
      seconds,
    });
    setShowPicker(false);
    handleCreateTask(duration.asMilliseconds());
  };

  const handleCreateTask = async (durationInMs: number) => {
    try {
      const formData = {
        name: name,
        description: description,
        duration: durationInMs,
        date: selectedDate,
        priority: priority,
        assignedUserIds: selectedUserIds,
        roomId: roomId,
      };

      console.log("Submitted task create data : ", formData);
      await createTask(formData).unwrap();
      console.log("Task created successfully");
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Successfully Created Task"
            description="All schedules for affected users have been readjusted"
          />
        ),
      });
      navigation.navigate("TASKS" as any);
    } catch (error) {
      console.error(error);
      toast.show({
        placement: "bottom",
        render: () => (
          <ToastAlert
            title="Something went wrong"
            description="An error occurred, please try again later"
            type="error"
          />
        ),
      });
    }
  };

  return (
    <View>
      <View style={styles.container0}>
        <View style={styles.box0}>
          <Pressable style={styles.rectangle} onPress={handleBackNav}>
            <Image
              style={styles.backImg}
              source={require("../assets/Arrow.png")}
            />
          </Pressable>
          <Text style={styles.typo1}>Add Task</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Title</Text>
        </View>
        <View style={styles.box1}>
          <NativeBaseProvider>
            <Input
              variant="underlined"
              placeholder="Enter Title"
              onChangeText={setTitle}
              value={name}
            />
          </NativeBaseProvider>
        </View>
        <View>
          <Text style={styles.typoBoddy}>Date</Text>
        </View>
        <Calendar onSelectDate={handleDateSelect} selected={selectedDate} />
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Description</Text>
        </View>
        <View style={styles.box1}>
          <NativeBaseProvider>
            <TextArea
              h={20}
              placeholder="Enter Description"
              w="100%"
              backgroundColor={Colors.colorGhostwhite}
              maxW={400}
              value={description}
              onChangeText={setDescription}
              autoCompleteType="off"
            />
          </NativeBaseProvider>
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Priority</Text>
        </View>
        <View style={styles.box2}>
          <PrioritySelector
            value={priority}
            onChange={(val) => setPriority(val ?? "")}
          />
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Assign Members</Text>
        </View>
        <View style={styles.box3}>
          {userData?.content.map((user: any) => (
            <View style={styles.box4} key={user._id}>
              <Text style={styles.typoBoddy}>{user.firstName}</Text>
              <NativeBaseProvider>
                <View style={styles.CheckboxSpace1}>
                  <Checkbox
                    value={user._id}
                    colorScheme="purple"
                    onChange={() => handleCheckboxChange(user._id)}
                    aria-label="Purple Checkbox"
                  />
                </View>
              </NativeBaseProvider>
            </View>
          ))}
        </View>
        <View style={styles.box1}>
          <NativeBaseProvider>
            <Button
              isLoading={isCreateTaskLoading}
              size="lg"
              backgroundColor={Colors.ppButtons}
              borderRadius={10}
              onPress={() => setShowPicker(true)}
            >
              Schedule
            </Button>
          </NativeBaseProvider>
        </View>
        <TimerPickerModal
          visible={showPicker}
          setIsVisible={setShowPicker}
          onConfirm={handleDurationSelection}
          modalTitle="Set Task Duration"
          onCancel={() => setShowPicker(false)}
          closeOnOverlayPress
          LinearGradient={LinearGradient}
          styles={{
            theme: "light",
          }}
        />
        <Toast />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  container0: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  box0: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  box1: {
    marginBottom: 20,
  },
  box2: {
    marginBottom: 20,
    paddingRight: 0,
  },
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
    marginLeft: 80,
    marginTop: 4,
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.large,
  },
  typoBoddy: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
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
  CheckboxSpace1: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  box4: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});

export default AddTask;
