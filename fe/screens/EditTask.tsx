import React, { useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView, Pressable } from "react-native";
import { NativeBaseProvider, Input ,TextArea } from "native-base";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { Checkbox, Button } from "native-base";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Tasks } from "../types";
import { useUpdatetaskMutation } from "../Redux/API/tasks.api.slice";
import { useGetAllUsersQuery } from "../Redux/API/users.api.slice";
import { useRoute } from '@react-navigation/native';
import { useGettaskQuery } from "../Redux/API/tasks.api.slice";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Calendar from "../components/Calendar/calender";
import moment, { Moment } from 'moment';
import  Toast from 'react-native-toast-message';
dayjs.extend(duration)

const EditTask = ({ route }:{ route: any }) => {

    const taskId = route?.params?.taskId;

    const { data: task } = useGettaskQuery(taskId);
    const [updateTask , updateResult] = useUpdatetaskMutation();
    const { data: userData, isLoading, isError } = useGetAllUsersQuery('api/users');

    const navigation = useNavigation();

    const handleBackNav = () => {
        navigation.goBack();
    }

    const [selectedDate, setSelectedDate] = useState<Moment | null>();

    const handleDateSelect = (date: Moment) => {
      setSelectedDate(date);
    };

    // Track the selected user IDs
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>(task?.assignedUserIds || []);

    const [name , setTitle] = useState(task?.name || '');
    const [description,setDescription] = useState(task?.description || '');
    const [priority,setPriority] = useState(task?.priority || '');

    // Function to handle checkbox change
    const handleCheckboxChange = (userId: string) => {
        if (selectedUserIds?.includes(userId)) {
        setSelectedUserIds(selectedUserIds?.filter((id) => id !== userId));
        } else {
        setSelectedUserIds([...selectedUserIds, userId]);
        }
    };

    console.log('value',task)

    const [showPicker, setShowPicker] = useState(false);
    const [alarmString, setAlarmString] = useState<string | null>(task?.duration || '');
  
    const handleDurationSelection = (pickedDuration:any) => {
      const { hours, minutes, seconds } = pickedDuration;
  
      // Create a dayjs duration object
      const duration = dayjs.duration({
        hours,
        minutes,
        seconds
      });
  
      // Format the duration as a string (e.g., "HH:mm:ss")
      const formattedDuration = duration.format("HH:mm:ss");
  
      // Set the formatted duration as the alarmString state
      setAlarmString(formattedDuration);

      // Call the api to add task
      handleCreateTask();
      
      // Close the picker
      setShowPicker(false);
    };


    const handleCreateTask = async () => {

        const formData = {
            name: name, 
            description: description, 
            duration: alarmString,
            date: selectedDate,
            priority: priority,
            assignedUserIds: selectedUserIds,
        }

        console.log(alarmString)
        const response = await updateTask({taskId,formData}).unwrap()
        if(response){
            Toast.show({
                type: 'success',
                text1: 'Task edited successful.',
              });
    
            navigation.navigate("Home");
        }else {
            Toast.show({
                type: 'error',
                text1: 'Task edit is unsuccessful.',
              });
            console.log("error")
        }

    }


    return (
       <View>
        <View style={styles.container0}>
            <View style={styles.box0}>
                <Pressable style={styles.rectangle} onPress={handleBackNav}>
                    <Image style={styles.backImg} source={require('../assets/Arrow.png')} />
                </Pressable>
                <Text style={styles.typo1}>Edit Task</Text>
            </View>
        </View>
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Title</Text>
            </View>
            <View style={styles.box1}>
                <NativeBaseProvider>
                    <Input variant="underlined" placeholder="Enter Title" onChangeText={setTitle} value={name}/>
                </NativeBaseProvider>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Date</Text>
            </View>
            <View style={styles.box2}>
                <Calendar onSelectDate={handleDateSelect} selected={selectedDate} />
            </View>
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
                <NativeBaseProvider>
                    <Input variant="underlined" placeholder="Enter Priority" onChangeText={setPriority}  value={priority}/>
                </NativeBaseProvider>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Assign Members</Text>
            </View>
            <View style={styles.box3}>
                {userData?.content.map((user:any) => (
                    <View style={styles.box4} key={user._id}>
                        <Text style={styles.typoBoddy}>{user.firstName}</Text>
                        <NativeBaseProvider>
                        <View style={styles.CheckboxSpace1}>
                            <Checkbox
                            value={selectedUserIds?.includes(user._id).toString()}
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
                <Button size="lg" 
                    backgroundColor={Colors.ppButtons} 
                    borderRadius={10} 
                    onPress={() => setShowPicker(true)}> Schedule 
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
                theme: "light"
                }}
            />
                    <Toast/>
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        paddingBottom:150,
    },
    container0: {
        flexGrow: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    box0: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    box1: {
        marginBottom: 20,
    },
    box2: {
        marginBottom: 20,
    },
    box3: {
        backgroundColor: Colors.colorGhostwhite,
        borderRadius:10,
        shadowColor: Colors.darkText,
        shadowOffset: {
            width: 0,
            height: 2,
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        padding:10,
        marginBottom:50,
    },
    typo1: {
        marginLeft:80,
        marginTop:4,
        color: Colors.darkblue,
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.large,
    },
    typoBoddy: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.medium,
    },
    rectangle:{
        width:40,
        height:40,
        backgroundColor: Colors.colorWhite,
        borderRadius:10,
        shadowColor: Colors.darkText,
        shadowOffset: {
            width: 0,
            height: 2,
          },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        alignItems: "center",
        verticalAlign: "middle"
    },
    backImg: {
        marginTop: 8,
    },
    CheckboxSpace1:{
        ustifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    box4: {
        flex:1,
        flexDirection:'row',
        padding:10,
    },
});

export default EditTask;
