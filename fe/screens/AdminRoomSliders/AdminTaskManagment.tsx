import * as React from "react";
import { View ,Text, ScrollView ,Pressable } from "react-native";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import Font from "../../constants/Font";
import HomeScheduleBox from "../../components/schedule/homeScheduleBox";
import { scheduleTypes } from "../../types";
import { schedulesApi } from "../../data/virtualData";
import AppTextInput from "../../components/AppTextInput";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Tasks } from "../../types";
import { useGetAlltasksQuery } from "../../Redux/API/tasks.api.slice";
import EditableScheduleBox from "../../components/schedule/EditableScheduleBox";
import { ActivityIndicator } from "react-native";
import { useState } from "react";


const AdminCreatedTasks = () => {

    const navigation = useNavigation(); // Get the navigation object

    const handleNav = () => {
      // Navigate to the previous screen
      navigation.navigate('AddTask')
    };


    const {
        isLoading,
        data: taskList,
        isSuccess,
        isError,
      } = useGetAlltasksQuery("api/tasks");
  
  
      const [searchText, setSearchText] = useState('');
  
      // Function to filter tasks based on search text
      const filteredTasks = taskList?.content.filter((task: Tasks) =>
      task.name.toLowerCase().includes(searchText.toLowerCase())
    );
  
     
    return(
        <View style={styles.flexBox}>

            <View style={styles.Box2}>
                <AppTextInput placeholder="🔍   Search tasks" onChangeText={text => setSearchText(text)}/>
            </View>
            <View style={styles.Box3}>
                <View style={styles.roomManagmentProfileSetti}>
                <TouchableWithoutFeedback onPress={handleNav} >
                    <View style={styles.rectangleParent}>
                        <View style={styles.groupChild} />
                        <Text style={styles.newTask}>New Task</Text>
                        <Image
                        style={styles.iconlycurvedhome}
                        contentFit="cover"
                        source={require("../../assets/Home.png")}
                        />
                    </View>
                </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.Box1}>
                <ScrollView
                    horizontal={false}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    contentContainerStyle={styles.frameScrollViewContent}
                >


                {isLoading || isError ? (
                    <ActivityIndicator style={styles.contentContainer} color="#0000ff" size="large"/>
                    ) : (
                    filteredTasks?.map((schedule: Tasks) => (
                        <EditableScheduleBox {...schedule} key={schedule._id}/>
                    ))
                )}

                </ScrollView>

            </View>
        </View>
    );
}

export default AdminCreatedTasks;

const styles = StyleSheet.create ({
    contentContainer: {
        paddingVertical: 100,
        paddingHorizontal:150
    },
    groupChild: {
        height: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        borderRadius: 8,
        backgroundColor: "#32338c",
        position: "absolute",
        width: "100%",
    },
    newTask: {
        top: 8,
        left: 19,
        fontSize: 12,
        lineHeight: 15,
        fontWeight: "500",
        fontFamily: Font['poppins-regular'],
        color: "#f1f7ff",
        textAlign: "center",
        width: 71,
        height: 15,
        position: "absolute",
    },
    iconlycurvedhome: {
        height: "48.39%",
        width: "16.13%",
        top: "25.81%",
        right: "79.57%",
        bottom: "25.81%",
        left: "4.3%",
        maxWidth: "100%",
        maxHeight: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    rectangleParent: {
        height: 30,
        width: 100,
        top: "1.72%",
        right: "6.4%",
        bottom: "94.46%",
        left: "68.8%",
        position: "absolute",
    },
    roomManagmentProfileSetti: {
        backgroundColor: "#feffff",
        flex: 1,
        height: 30,
        overflow: "hidden",
        width: "100%",
    },
    flexBox: {
        flex:1,
    },
    Box1: {
        width: "100%",
        height: "100%",
        padding: 25
    },
    Box2: {
        width: "100%",
        height: "auto",
        padding: 25
    },
    Box3: {
        width: "100%",
        height: 30,
        right: 10,
    },
    
    frameScrollViewContent: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
})