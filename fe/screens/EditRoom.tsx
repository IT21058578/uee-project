import * as React from "react";
import {
  View,
  Pressable,
  Image,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseProvider, Input, TextArea } from "native-base";
import { Button, Stack } from "native-base";
import { useState } from "react";

const EditRoom = () => {
  const navigate = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleButtonClick = (category: any) => {
    setSelectedCategory(category);
  };
  const handleBackNav = () => {
    navigate.goBack();
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
          <Text style={styles.typo1}>Edit Room</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Name</Text>
        </View>
        <View style={styles.box1}>
          <NativeBaseProvider>
            <Input
              variant="underlined"
              placeholder="Enter Room Name"
              value="SE Project Goup"
            />
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
              value="This Room is created for manage group assignments though the entire semester."
              w="100%"
              backgroundColor={Colors.colorGhostwhite}
              maxW={400}
              autoCompleteType="off"
            />
          </NativeBaseProvider>
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Organisation</Text>
        </View>
        <View style={styles.box1}>
          <NativeBaseProvider>
            <Input
              variant="underlined"
              placeholder="Enter Organisation Name"
              value="SLIIT"
            />
          </NativeBaseProvider>
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Tag</Text>
        </View>
        <View style={styles.box2}>
          {/* <View style={[styles.tabButton,{backgroundColor:"#eceaff"}]}>
                    <Text style={[styles.tabtypoBoddy,{color:"#8F81FE"}]}>Office</Text>
                </View>
                <View style={[styles.tabButton,{backgroundColor:"#ffefeb"}]}>
                    <Text style={[styles.tabtypoBoddy,{color:"#F0A58E"}]}>Home</Text>
                </View>
                <View style={[styles.tabButton,{backgroundColor:"#ffe9ed"}]}>
                    <Text style={[styles.tabtypoBoddy,{color:"#F57C96"}]}>Education</Text>
                </View>
                <View style={[styles.tabButton,{backgroundColor:"#d1feff"}]}>
                    <Text style={[styles.tabtypoBoddy,{color:"#1EC1C3"}]}>Bussiness</Text>
                </View> */}
          <NativeBaseProvider>
            <Stack
              mb="2.5"
              mt="1.5"
              direction={{ base: "row", md: "row" }}
              space={4}
              mx={{ base: "auto", md: "0" }}
              style={{ paddingHorizontal: 5 }}
            >
              <Button
                size="sm"
                variant="subtle"
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === "OFFICE"
                      ? Colors.lightPrimary
                      : "transparent",
                }}
                onPress={() => handleButtonClick("OFFICE")}
              >
                OFFICE
              </Button>
              <Button
                size="sm"
                variant="subtle"
                colorScheme="secondary"
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === "HOME" ? Colors.home : "transparent",
                }}
                onPress={() => handleButtonClick("HOME")}
              >
                HOME
              </Button>
              <Button
                size="sm"
                variant="subtle"
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === "EDUCATION"
                      ? Colors.edu
                      : "transparent",
                }}
                onPress={() => handleButtonClick("EDUCATION")}
              >
                EDUCATION
              </Button>
              <Button
                size="sm"
                variant="subtle"
                colorScheme="secondary"
                style={{
                  borderRadius: 20,
                  backgroundColor:
                    selectedCategory === "BUSINESS"
                      ? Colors.bussiness
                      : "transparent",
                }}
                onPress={() => handleButtonClick("BUSINESS")}
              >
                BUSINESS
              </Button>
            </Stack>
            {/* {selectedCategory && <Text>Selected Category: {selectedCategory}</Text>} */}
            {/* <Text>Selected Date: {selectedDate ? moment(selectedDate).format('MMMM D, YYYY') : 'No date selected'}</Text> */}
          </NativeBaseProvider>
        </View>
        <NativeBaseProvider>
          <Button
            size="lg"
            backgroundColor={Colors.ppButtons}
            borderRadius={10}
            marginTop={170}
          >
            {" "}
            Create Room
          </Button>
        </NativeBaseProvider>
      </ScrollView>
    </View>
  );
};

export default EditRoom;

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
  box0: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  tabtypoBoddy: {
    fontFamily: Font["poppins-regular"],
    fontSize: FontSize.medium,
  },
  typoTitle: {
    color: Colors.darkblue,
    fontFamily: Font["poppins-bold"],
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
    ustifyContent: "flex-end",
    alignItems: "flex-end",
  },
  box4: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});
