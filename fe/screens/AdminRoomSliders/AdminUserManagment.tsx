import * as React from "react";
import { View, Pressable, Image, Text, StyleSheet, ScrollView } from "react-native";
import Font from "../../constants/Font";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import { LinearGradient } from "expo-linear-gradient";
import { NativeBaseProvider, Button } from "native-base"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Modal } from 'react-native';
import { Input } from "native-base";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";

const AdminUserManage = () => {

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const navigate = useNavigation();

    const HandleNavigate = () => {
        navigate.goBack();
        console.log("Hi the button");
    }

    const toast = useToast();

    const sendEmail = () => {
        // Simulate sending an email. In a real application, you would have your email sending logic here.
        const emailSentSuccessfully = true; // Set this to true for success, false for an error.
      
        if (emailSentSuccessfully) {
          // Show a toast notification for successful email sending.
          toast.show({
            title: 'Email sent successfully!',
            placement: 'bottom',
            variant: 'success', // Use 'success' variant for success
          });
        } else {
          // Handle the error case here, if needed.
          // You can show an error toast or perform any other error handling.
          toast.show({
            title: 'Email sending failed!',
            placement: 'bottom',
            variant: 'danger', // Use 'danger' variant for errors
          });
        }
      };

    return (
        <View>
            <View style={styles.box0}>
                <Text style={styles.typo1}>Room Member Managment</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.box2}>
                    <LinearGradient
                        style={styles.box11}
                        locations={[0, 1]}
                        colors={["#fe9d9d", "#e77d7d"]}
                    >
                        <Text style={[styles.typoBoddy, { color: Colors.colorGray_100, fontFamily: Font['poppins-bold'] }]}>Created Date</Text>
                        <Text style={[styles.typoBoddy, { color: "#FFFFFF" }]}>14 August 2023</Text>
                    </LinearGradient>
                    <LinearGradient
                        style={styles.box11}
                        locations={[0, 1]}
                        colors={["#fe9d9d", "#e77d7d"]}
                    >
                        <Text style={[styles.typoBoddy, { color: Colors.colorGray_100, fontFamily: Font['poppins-bold'] }]}>Created Time</Text>
                        <Text style={[styles.typoBoddy, { color: "#FFFFFF" }]}>07:00 - 07:15 AM</Text>
                    </LinearGradient>
                </View>
                <View style={[styles.box2, { paddingBottom: 20 }]}>
                    <Text style={[styles.typoBoddy, { color: Colors.darkText, fontFamily: Font['poppins-bold'], fontSize: FontSize.large, paddingVertical: 10 }]}>Room</Text>
                    <View style={[styles.button, { justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
                    <NativeBaseProvider>
                        {/* Model To add a new member */}
                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible1}
                            onRequestClose={() => {
                                setModalVisible1(!modalVisible1);
                            }}
                            >
                            <View style={styles.modalBackground}>
                                <View style={styles.centeredView}>
                                <View style={styles.simpleModalView}>
                                    <Text style={styles.typoTitle1}>Add Member</Text>
                                    <Input placeholder="Enter Email Address" />

                                    <View style={styles.buttonContainer}>
                                    <Button
                                        style={styles.cancelButton}
                                        variant="outline"
                                        colorScheme="fuchsia"
                                        onPress={() => setModalVisible1(!modalVisible1)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button colorScheme="fuchsia" onPress={sendEmail}>
                                        Add
                                    </Button>
                                    </View>
                                </View>
                                </View>
                            </View>
                            </Modal>
                            <Button leftIcon={<Ionicons name="add-outline" size={24} color="white" />} size={'sm'} width={125} backgroundColor={'#858FE9'} onPress={sendEmail}>
                                New Member
                            </Button>
                        </NativeBaseProvider>
                    </View>
                </View>
                <View style={styles.box1}>
                    <Text style={styles.typoBoddy}>Assign Members</Text>
                </View>
                <View style={styles.box3}>
                    <View style={styles.box1}>
                        <View style={styles.box4}>
                            <Text style={styles.typoBoddy1}>Disira</Text>
                            <View style={styles.CheckboxSpace1}>
                                <Text style={styles.text}>Make Admin</Text>
                            </View>

                            {/* Model Remove a member */}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible2}
                                onRequestClose={() => {
                                    setModalVisible2(!modalVisible2);
                                }}>
                                <View style={styles.modalBackground}>
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Text style={styles.typoTitle1}>Remove User</Text>
                                            <View style={styles.box1}>
                                                <Text style={styles.typoBoddy}>Are you sure to remove this user ?</Text>
                                            </View>
                                            <View style={styles.box1}>
                                                <NativeBaseProvider>
                                                    <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                                                        <Button style={{ marginHorizontal: 20 }} variant="outline" colorScheme="fuchsia" onPress={() => setModalVisible2(!modalVisible2)}>
                                                            Cancle
                                                        </Button>
                                                        <Button colorScheme="fuchsia">    Sure    </Button>
                                                    </View>
                                                </NativeBaseProvider>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <Pressable style={[styles.CheckboxSpace1, { backgroundColor: '#FF5959' }]} onPress={() => setModalVisible2(true)}>
                                <Text style={styles.text}>Remove</Text>
                            </Pressable>
                        </View>
                        <Image source={require('../../assets/Line_19.png')} />
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.box4}>
                            <Text style={styles.typoBoddy1}>Sansika</Text>
                            <View style={styles.CheckboxSpace1}>
                                <Text style={styles.text}>Make Admin</Text>
                            </View>
                            <View style={[styles.CheckboxSpace1, { backgroundColor: '#FF5959' }]}>
                                <Text style={styles.text}>Remove</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/Line_19.png')} />
                    </View>
                    <View style={styles.box1}>
                        <View style={styles.box4}>
                            <Text style={styles.typoBoddy1}>Tharindu</Text>
                            <View style={[styles.CheckboxSpace1, { backgroundColor: '#E88B8C' }]}>
                                <Text style={styles.text}>Undo Admin</Text>
                            </View>
                            <View style={[styles.CheckboxSpace1, { backgroundColor: '#FF5959' }]}>
                                <Text style={styles.text}>Remove</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/Line_19.png')} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

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
        flexDirection: 'row',
        marginBottom: 0,
    },
    rectangle1: {

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
    typoTitle1: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-semiBold'],
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
        flex: 1,
        alignItems: 'center', // Align text to the center both vertically and horizontally
        backgroundColor: '#4CD97B',
        borderRadius: 10,
        marginLeft: 5,
        paddingVertical: 10,
    },
    text: {
        color: Colors.colorWhite,
    },
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        justifyContent: 'space-between',
      },

      simpleModalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
    
      // Styles for the cancel button
      cancelButton: {
        marginHorizontal: 10,
        flex: 1, // Adjust flex value as needed
      },
})

export default AdminUserManage;
