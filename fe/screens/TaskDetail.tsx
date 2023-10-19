import * as React from "react";
import { View, Pressable , Image ,Text, StyleSheet , ScrollView} from "react-native";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TaskType } from "../types";
import { useGettaskQuery } from "../Redux/API/tasks.api.slice";

const TaskDetail = (props:{route:any}) => {

    const {route} = props
    const taskId = route?.params?.taskId;

    console.log('task id in detail',props)

    const navigate = useNavigation();

    const { data: task } = useGettaskQuery(taskId);

    const handleBackNav = () => {
        navigate.goBack();
    }

    const date = task?.date.split('T')[0];

    return(
        <View>
        <View style={styles.container0}>
            <View style={styles.box0}>
                <Pressable style={styles.rectangle} onPress={handleBackNav}>
                    <Image style={styles.backImg} source={require('../assets/Arrow.png')} />
                </Pressable>
                <Text style={styles.typo1}>Task Detail</Text>
            </View>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.typoTitle}>Task : {task?.name}</Text>
            </View>
            <View style={styles.box2}>
                <LinearGradient
                    style={styles.box11}
                    locations={[0, 1]}
                    colors={["#fe9d9d", "#e77d7d"]}
                >
                    <Text style={[styles.typoBoddy,{color:Colors.colorGray_100,fontFamily:Font['poppins-bold']}]}>Est. Date</Text>
                    <Text style={[styles.typoBoddy,{color:"#FFFFFF"}]}>{date}</Text>
                </LinearGradient>
                <LinearGradient
                    style={styles.box11}
                    locations={[0, 1]}
                    colors={["#fe9d9d", "#e77d7d"]}
                >
                    <Text style={[styles.typoBoddy,{color:Colors.colorGray_100,fontFamily:Font['poppins-bold']}]}>Est. Time</Text>
                    <Text style={[styles.typoBoddy,{color:"#FFFFFF"}]}>{task?.duration}</Text>
                </LinearGradient>
            </View>
            <View style={styles.box1}>
                <LinearGradient
                    style={styles.box12}
                    locations={[0, 1]}
                    colors={["#fe9d9d", "#e77d7d"]}
                >
                    <Text style={[styles.typoBoddy,{color:Colors.colorGray_100,fontFamily:Font['poppins-bold']}]}>Description</Text>
                    <Text style={[styles.typoBoddy,{color:"#FFFFFF"}]}>{task?.description}</Text>
                </LinearGradient>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Room</Text>
            </View>
            <View style={styles.box1}>
                <Text style={[styles.typoBoddy,{color:Colors.darkblue,fontFamily:Font['poppins-bold']}]}>{task?.roomId}</Text>
            </View>
            <View style={styles.box1}>
                <Image source={require('../assets/Line_19.png')} />
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Assign Members</Text>
            </View>
            <View style={styles.box3}>
                <View style={styles.box1}>
                    <View style={styles.box4}>
                        <Text style={styles.typoBoddy1}>Disira</Text>
                        <View style={styles.CheckboxSpace1}>
                            <Text style={styles.text}>✅</Text>
                        </View>
                    </View>
                    <Image source={require('../assets/Line_19.png')} />
                </View>
                <View style={styles.box1}>
                    <View style={styles.box4}>
                        <Text style={styles.typoBoddy1}>Sansika</Text>
                        <View style={styles.CheckboxSpace1}>
                            <Text style={styles.text}>✅</Text>
                        </View>
                    </View>
                    <Image source={require('../assets/Line_19.png')} />
                </View>
                <View style={styles.box1}>
                    <View style={styles.box4}>
                        <Text style={styles.typoBoddy1}>Tharindu</Text>
                        <View style={styles.CheckboxSpace1}>
                            <Text style={styles.text}>✅</Text>
                        </View>
                    </View>
                    <Image source={require('../assets/Line_19.png')} />
                </View>
            </View>
        </ScrollView>
        </View>
    )
}

export default TaskDetail;

const styles = StyleSheet.create ({
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
    tabButton:{
        backgroundColor:Colors.colorLavender,
        borderRadius:20,
        padding:8,
        marginRight:5,
    },
    box0: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    box1: {
        marginBottom: 20,
    },
    box11: {
        borderRadius:10,
        paddingHorizontal:45,
        marginRight:12,
        paddingVertical:20,
        marginBottom: 20,
    },
    box12: {
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:20,
        marginBottom: 20,
    },
    box2: {
        flexDirection:'row',
        marginBottom: 0,
    },
    rectangle1:{

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
    tabtypoBoddy: {
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.medium,
    },
    typoTitle: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-bold'],
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
    box4: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
      },
    typoBoddy1: {
        flex: 1, // Make this text flex to push the other text to the right
    },
    CheckboxSpace1: {
        flex: 1, // Make this container flex to expand and push text to the right
        alignItems: 'flex-end', // Align text to the right within the container
    },
    text: {
        textAlign: 'right',
    },
})