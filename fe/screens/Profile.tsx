import * as React from "react";
import { Text, StyleSheet, View, Pressable , ScrollView ,TouchableWithoutFeedback} from "react-native";
import { Image } from "expo-image";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import RoomBox from "../components/Rooms/RoomBox";
import { roomsApi } from "../data/virtualData";
import { RoomType } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Popover from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import NonAdminRoomBox from "../components/Rooms/NonAdminRoomBox";


const AdminRoomComponent = () => {
    const roomPairs = [];
    for (let i = 0; i < roomsApi.length; i += 2) {
      const room1 = roomsApi[i];
      const room2 = i + 1 < roomsApi.length ? roomsApi[i + 1] : null;
  
      roomPairs.push(
        <View key={i} style={{ flexDirection: 'row' }}>
          <RoomBox {...room1} />
          {room2 && <RoomBox {...room2} />}
        </View>
      );
    }

    return <View>{roomPairs}</View>;
}

const RoomComponent = () => {
  const roomPairs = [];
  for (let i = 0; i < roomsApi.length; i += 2) {
    const room1 = roomsApi[i];
    const room2 = i + 1 < roomsApi.length ? roomsApi[i + 1] : null;

    roomPairs.push(
      <View key={i} style={{ flexDirection: 'row' }}>
        <NonAdminRoomBox {...room1} />
        {room2 && <NonAdminRoomBox {...room2} />}
      </View>
    );
  }

  return <View>{roomPairs}</View>;
}

const RoomManagmentProfileSetti = () => {

  const [isPopoverVisible, setPopoverVisible] = useState(false);

  const navigation = useNavigation();


  const handleSettings = () => {
    navigation.navigate("Settings");
    setPopoverVisible(false); // Close the popover
  };

  const handleLogout = () => {
    setPopoverVisible(false); // Close the popover
  };

  const handleNavigate = () => {
    // Navigate to the desired screen when the Pressable is pressed
    navigation.navigate("CreateRoom"); 
  };


  return (
    <View style={styles.roomManagmentProfileSetti}>
      <ScrollView>
      <View style={styles.Box}>
      <Text style={[styles.tharinduGunasekara, styles.roomsManageByFlexBox]}>
        Tharindu Gunasekara
      </Text>
      <Text style={[styles.tharindugmailcom, styles.roomsManageByFlexBox]}>
        tharindu@gmail.com
      </Text>
      <View style={styles.groupParent}>
        <View style={[styles.ellipseParent, styles.ellipseParentPosition]}>
          <Image
            style={styles.groupChild}
            contentFit="cover"
            source={require("../assets/Ellipse-236.png")}
          />
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/58-13.png")}
          />
        </View>

        <Popover
        isVisible={isPopoverVisible} // Pass the state variable as a prop to control visibility
        onRequestClose={() => setPopoverVisible(false)} // Close the Popover when backdrop is pressed
            from={(
                  <View style={styles.groupWrapper}>
                  <View style={styles.groupPosition}>
                  <TouchableWithoutFeedback  onPress={() => setPopoverVisible(!isPopoverVisible)}>
                    <View style={[styles.groupItem, styles.groupPosition]}>
                      <Image
                        style={[styles.iconlycurvedmoreSquare, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/More-Square.png")}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  </View>
                </View>
            )}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={handleSettings} style={styles.textRow}>
                        <Text><AntDesign name="setting" size={14} color="black" />  Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.textRow}>
                        <Text><Ionicons name="log-out-outline" size={14} color="black" />  Log Out</Text>
                    </TouchableOpacity>
            </View>
        </Popover>

      </View>
      <View style={styles.roomsManageByYouParent}>
        <Text style={[styles.roomsManageBy, styles.ellipseParentPosition]}>
          Rooms Manage By You
        </Text>
        <TouchableWithoutFeedback  onPress={handleNavigate}>
          <View style={styles.groupContainer}>
            <View style={styles.groupPosition}>
              <View style={[styles.groupInner, styles.groupPosition]} />
            </View>
            <Text style={styles.createRoom}>Create Room</Text>
            <Image
              style={[styles.iconlycurvedhome, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/Home.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      </View>
      <View style={styles.Box1}>
        <AdminRoomComponent/>
      </View>
      <View style={styles.roomManagmentMember}>
        <Text style={styles.roomsYouMember}>Rooms You Member Of</Text>
      </View>
      <View style={styles.Box1}>
        <RoomComponent/>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  textRow: {
    marginVertical:10,
  },
  menuContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  roomsYouMember: {
    position: "absolute",
    left: 30,
    top:10,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Font['poppins-semiBold'],
    color: "#10275a",
    textAlign: "left",
  },
  roomManagmentMember: {
    backgroundColor: "#feffff",
    flex: 1,
    width: "100%",
    height: 50,
    overflow: "hidden",
  },
  Box: {
    width:"100%",
    height:300
  },
  Box1: {
    width: "100%",
    alignSelf: "stretch", // Ensures the container takes the full width
    marginHorizontal:35
  },
  roomsManageByFlexBox: {
    textAlign: "left",
    color: Colors.darkblue,
  },
  ellipseParentPosition: {
    left: 0,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupPosition: {
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  tharinduGunasekara: {
    top: 132,
    left: 94,
    fontSize: 20,
    fontFamily: Font["poppins-semiBold"],
    fontWeight: "600",
    color: Colors.darkblue,
    position: "absolute",
  },
  tharindugmailcom: {
    top: 176,
    left: 124,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: Font["poppins-regular"],
    position: "absolute",
  },
  groupChild: {
    top: -6,
    left: -16,
    width: 112,
    height: 112,
    borderRadius: FontSize.small,
    position: "absolute",
  },
  icon: {
    height: "90.7%",
    width: "91.86%",
    top: "8.14%",
    right: "5.81%",
    bottom: "1.16%",
    left: "2.33%",
  },
  ellipseParent: {
    top: 0,
    width: 86,
    height: 86,
  },
  groupItem: {
    backgroundColor: "#fff",
    shadowColor: "#f1f7ff",
    shadowOffset: {
      width: -3,
      height: 7,
    },
    shadowRadius: 13,
    elevation: 13,
    shadowOpacity: 1,
    borderRadius: FontSize.small,
  },
  iconlycurvedmoreSquare: {
    height: "50%",
    width: "50%",
    top: "27.08%",
    right: "25%",
    bottom: "22.92%",
    left: "25%",
  },
  groupWrapper: {
    height: "55.81%",
    width: "23.41%",
    top: "13.95%",
    bottom: "30.23%",
    left: "76.59%",
    right: "0%",
    position: "absolute",
  },
  groupParent: {
    top: 34,
    left: 143,
    width: 205,
    height: 86,
    position: "absolute",
  },
  roomsManageBy: {
    top: 1,
    fontSize: 16,
    textAlign: "left",
    color: Colors.darkblue,
    fontFamily: Font["poppins-semiBold"],
    fontWeight: "600",
  },
  groupInner: {
    borderRadius: 8,
    backgroundColor: "#858fe9",
  },
  createRoom: {
    top: 8,
    left: 18,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "500",
    fontFamily: Font["poppins-regular"],
    color: "#f1f7ff",
    textAlign: "center",
    width: 80,
    height: 15,
    position: "absolute",
  },
  iconlycurvedhome: {
    height: "48.39%",
    width: "16.13%",
    top: "25.81%",
    right: "80.65%",
    bottom: "25.81%",
    left: "3.23%",
  },
  groupContainer: {
    width: "33.49%",
    left: "69.51%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
  },
  roomsManageByYouParent: {
    top: 228,
    left: 35,
    width: 305,
    height: 31,
    position: "absolute",
  },
  roomManagmentProfileSetti: {
    top: 10,
    maxHeight:"85%",
    backgroundColor: "#feffff",
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default RoomManagmentProfileSetti;
