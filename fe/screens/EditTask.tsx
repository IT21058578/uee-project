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


// Define the formatTime function
function formatTime(hours: number, minutes: number, seconds: number): string {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

const EditTask = ({task} : {task : Tasks}) => {

    const navigation = useNavigation();

    const handleBackNav = () => {
        navigation.goBack();
    }

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' }
    ]);

    const [isSelect, setIsSelect] = useState<boolean>(false);

    const handleCheckboxChange = () => {
      setIsSelect(!isSelect); // Toggle the state when the checkbox is clicked
    };

    //Time Picker
    const [showPicker, setShowPicker] = useState(false);
    const [alarmString, setAlarmString] = useState<
            string | null
        >(null);

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
                    <Input variant="underlined" placeholder="Enter Title" />
                </NativeBaseProvider>
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
                    autoCompleteType="off" 
                    />
                </NativeBaseProvider>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Priority</Text>
            </View>
            <View style={styles.box2}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{ backgroundColor: "white" }}
                />
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Assign Members</Text>
            </View>
            <View style={styles.box3}>
                <View style={styles.box4}>
                    <Text style={styles.typoBoddy}>Disira</Text>
                    <NativeBaseProvider>
                        <View style={styles.CheckboxSpace1}>
                            <Checkbox
                                value={String(isSelect)}
                                colorScheme="purple"
                                onChange={handleCheckboxChange}
                                aria-label="Purple Checkbox"
                                />
                        </View>
                    </NativeBaseProvider>
                </View>
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
                onConfirm={(pickedDuration) => {
                // Extract hours, minutes, and seconds from pickedDuration
                const { hours, minutes, seconds } = pickedDuration;

                // Call formatTime with numeric values
                setAlarmString(formatTime(hours, minutes, seconds));
                setShowPicker(false);
                }}
                modalTitle="Set Task Duration"
                onCancel={() => setShowPicker(false)}
                closeOnOverlayPress
                LinearGradient={LinearGradient}
                styles={{
                theme: "light",
                }}
            />
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
