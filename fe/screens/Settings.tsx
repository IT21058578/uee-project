import * as react from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Image, Switch, Pressable, Modal, Alert } from 'react-native';
import { Checkbox, NativeBaseProvider, Button } from 'native-base';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {

    const navigation = useNavigation(); // Get the navigation object

    const handleBackNav = () => {
        // Navigate to the previous screen
        navigation.goBack();
    };

    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitchNottification = () => setIsEnabled1(previousState => !previousState);
    const toggleSwitchRings = () => setIsEnabled2(previousState => !previousState);

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [isSelect, setIsSelect] = useState<boolean>(false);

    const handleCheckboxChange = () => {
        setIsSelect(!isSelect); // Toggle the state when the checkbox is clicked
    };

    return (
        <View style={styles.container}>
            <View style={styles.box0}>
                <Pressable style={styles.rectangle} onPress={handleBackNav}>
                    <Image style={styles.backImg} source={require('../assets/Arrow.png')} />
                </Pressable>
                <Text style={styles.typo1}>Settings</Text>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoTitle}>Genaral</Text>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Language</Text>

                {/* Model to change the Language */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible1}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible1(!modalVisible1);
                    }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.typoTitle1}>Language</Text>
                                <View style={styles.box1}>
                                    <Text style={styles.typoBoddy}>English</Text>
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
                                <View style={styles.box1}>
                                    <Text style={styles.typoBoddy}>Sinhala</Text>
                                    <NativeBaseProvider>
                                        <View style={styles.CheckboxSpace2}>
                                            <Checkbox
                                                value={String(isSelect)}
                                                colorScheme="purple"
                                                onChange={handleCheckboxChange}
                                                aria-label="Purple Checkbox"
                                            />
                                        </View>
                                    </NativeBaseProvider>
                                </View>
                                <View style={styles.box1}>
                                    <NativeBaseProvider>
                                        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
                                            <Button style={{ marginHorizontal: 20 }} variant="outline" colorScheme="fuchsia" onPress={() => setModalVisible1(!modalVisible1)}>
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
                <Pressable style={{ flexDirection: 'row' }} onPress={() => setModalVisible1(true)}>
                    <Text style={[styles.typoBoddy, styles.typoRight]}>English</Text>
                    <Image style={[styles.arwImg, { transform: [{ rotate: '180deg' }] }]} source={require('../assets/Arrow.png')} />
                </Pressable>
            </View>
            <View style={styles.box1}>
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
                                <Text style={styles.typoTitle1}>Delete Account</Text>
                                <View style={styles.box1}>
                                    <Text style={styles.typoBoddy}>Are you sure to delete this account ?</Text>
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
                <Pressable onPress={() => setModalVisible2(true)}>
                    <Text style={styles.typoBoddy}>Delete Account</Text>
                </Pressable>
            </View>
            <View style={[styles.box1, { marginTop: 20 }]}>
                <Text style={styles.typoTitle}>Notifications</Text>
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Allow Notification</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#5B67CA' }}
                    thumbColor={isEnabled1 ? '#fffff' : '#f4f3f4'}
                    ios_backgroundColor="#B1C0DE"
                    onValueChange={toggleSwitchNottification}
                    value={isEnabled1}
                    style={styles.troggle1}
                />
            </View>
            <View style={styles.box1}>
                <Text style={styles.typoBoddy}>Allow the Notification Rings</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#5B67CA' }}
                    thumbColor={isEnabled2 ? '#fffff' : '#f4f3f4'}
                    ios_backgroundColor="#B1C0DE"
                    onValueChange={toggleSwitchRings}
                    value={isEnabled2}
                    style={styles.troggle2}
                />
            </View>
        </View>
    );
};


export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 60,
        marginHorizontal: 20
    },
    box0: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 120
    },
    box1: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50
    },
    typo1: {
        marginLeft: 90,
        marginTop: 4,
        color: Colors.darkblue,
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.large,
    },
    typoTitle: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.medium,
    },
    typoTitle1: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.large,
    },
    typoBoddy: {
        color: Colors.darkblue,
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.medium,
    },
    typoRight: {
        marginLeft: 170,
    },
    backImg: {
        marginTop: 8
    },
    arwImg: {
        margin: 4,
        height: 15,
        width: 15,
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
    troggle1: {
        marginLeft: 140,
    },
    troggle2: {
        marginLeft: 62,
    },
    CheckboxSpace1: {
        marginLeft: 190,
    },
    CheckboxSpace2: {
        marginLeft: 187,
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
});