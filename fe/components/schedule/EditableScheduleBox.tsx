import React from "react";
import { Text, StyleSheet, View , TouchableWithoutFeedback , TouchableOpacity ,Modal ,Alert } from "react-native";
import Font from "../../constants/Font";
import { scheduleTypes } from "../../types";
import { Color,FontSize, Padding, Border } from "../../Styles/GlobalStyles";
import { Entypo } from "@expo/vector-icons";
import Popover from 'react-native-popover-view';
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider, Button } from 'native-base';
import Colors from "../../constants/Colors";
import { Tasks } from "../../types";
import { useDeletetaskMutation } from "../../Redux/API/tasks.api.slice";
import { useGettaskQuery } from "../../Redux/API/tasks.api.slice";


const EditableScheduleBox = (props : Tasks) => {

    const [isPopoverVisible, setPopoverVisible] = useState(false);

    const navigation = useNavigation<any>();

    const [modalVisible2, setModalVisible2] = useState(false);

    const [deleteTask, deletedResult] = useDeletetaskMutation();

    const taskId = props?._id;
  
    const handleEdit = () => {
      navigation.navigate("EditTask" , {
        taskId: taskId,
      });
      setPopoverVisible(false); // Close the popover
    };
  
    const handleDelete = () => {
      setModalVisible2(true);
    };

    const handleDeletePermission = (taskId: string) => {
      setModalVisible2(true);
      deleteTask(taskId);
    };

    const handleCancle = () => {
        setModalVisible2(!modalVisible2)
        setPopoverVisible(false); // Close the popover
    }

    
    return(
        <View style={[styles.frameContainer, styles.frameLayout]}>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <View style={styles.frameChild} />
          <View style={styles.projectProgressMeetingParent}>
            <Text style={styles.projectProgressMeeting}>
              {props.name}
            </Text>
            <Text style={styles.text4}>{props.duration}</Text>
          </View>
        </View>
        
        <Popover
        isVisible={isPopoverVisible} // Pass the state variable as a prop to control visibility
        onRequestClose={() => setPopoverVisible(false)} // Close the Popover when backdrop is pressed
            from={(
                  <TouchableWithoutFeedback  onPress={() => setPopoverVisible(!isPopoverVisible)}>
                    <View style={styles.doted}>
                        <Entypo name="dots-three-vertical" size={10} color="black" />
                    </View>
                  </TouchableWithoutFeedback>
            )}>
                 {/* Model to change the Language */}
                 <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible2(!modalVisible2);
                            }}>
                            <View style={styles.modalBackground}>
                            <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.typoTitle1}>Delete Task</Text>
                                    <View style={styles.box1}>
                                        <Text style={styles.typoBoddy}>Are you sure to delete this Task ?</Text>
                                    </View>
                                    <View style={styles.box1}>
                                        <NativeBaseProvider>
                                            <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                                                <Button style={{ marginHorizontal: 20 }} variant="outline" colorScheme="fuchsia" onPress={handleCancle}>
                                                    Cancle
                                                </Button>
                                                <Button colorScheme="fuchsia" onPress={() => handleDeletePermission(props._id)}>    Sure    </Button>
                                            </View>
                                        </NativeBaseProvider>
                                    </View>
                            </View>
                            </View>
                            </View>
                    </Modal>   
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={handleEdit} style={styles.textRow}>
                        <Text><Feather name="edit" size={14} color="black" />  Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={styles.textRow}>
                        <Text><AntDesign name="delete" size={14} color="black" />  Delete</Text>
                    </TouchableOpacity>
            </View>
        </Popover>

        <View style={[styles.altriumRoom01Wrapper, styles.wrapperLayout]}>
          <Text style={[styles.altriumRoom01, styles.altriumRoom01Typo]}>
            {props.roomId}
          </Text>
        </View>

      </View>

    );
}

const styles = StyleSheet.create ({

    textRow: {
        marginVertical:10,
    },
      menuContainer: {
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    frameFlexBox1: {
        flexDirection: "column",
        position: "absolute",
        alignItems: "center",
        overflow: "hidden",
    },
    doted: {
        top: 20,
        left: 300,
    },
    altriumRoom01Wrapper: {
        top: 75,
        left: 36,
        backgroundColor: Color.lightcoral_200,
        paddingHorizontal: Padding.p_6xs,
        alignItems: "flex-end",
      },
    wrapperLayout: {
        paddingVertical: Padding.p_11xs,
        height: 20,
        width: 108,
        borderRadius: Border.br_10xs,
        position: "absolute",
      },
    altriumRoom01: {
        color: Color.lightcoral_100,
      },
    projectProgressMeeting: {
        fontSize: FontSize.size_sm,
        color: Color.darkslateblue,
        fontFamily: Font["poppins-regular"],
        fontWeight: "500",
        textAlign: "left",
      },
    text4: {
        color: Color.lightsteelblue,
        fontFamily: Font["poppins-regular"],
        fontSize: FontSize.size_sm,
        textAlign: "left",
      },
    projectProgressMeetingParent: {
        width: 175,
        marginLeft: 16,
      },
    altriumRoom01Typo: {
        height: 20,
        width: 83,
        fontSize: FontSize.size_3xs,
        fontFamily: Font["poppins-regular"],
        fontWeight: "500",
        textAlign: "left",
      },
    frame4: {
        top: 15,
        left: 19,
        width: 192,
        height: 49,
      },
    frameLayout: {
        height: 114,
        width: 322,
        backgroundColor: Color.ghostwhite,
        borderRadius: Border.br_mini,
      },
    frameFlexBox: {
        flexDirection: "row",
        position: "absolute",
        alignItems: "center",
        overflow: "hidden",
      },
    frameContainer: {
        marginTop: 18,
      },
    frameChild: {
        borderStyle: "solid",
        borderColor: "#8f99eb",
        borderRightWidth: 2,
        width: 2,
        height: 37,
      },

    //Modal
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Model Styles
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    typoTitle1: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.size_xl,
    },
    typoBoddy: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.size_base,
    },
    box1: {
        flex:1,
        flexDirection:'row',
        maxHeight:50
    },
})

export default EditableScheduleBox;