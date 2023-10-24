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
import { NativeBaseProvider, Input, TextArea, useToast } from "native-base";
import { Button, Stack } from "native-base";
import { useEffect, useState } from "react";
import TagButton from "../components/TagButton";
import {
  useGetroomQuery,
  useUpdateroomMutation,
} from "../Redux/API/rooms.api.slice";
import LoadingIndictator from "../components/LoadingIndictator";

const EditRoom = (props: any) => {
  const navigation = props.navigation;
  const roomId: string = props.route?.params?.roomId;
  const toast = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [updateRoom, { isLoading: isUpdateRoomLoading }] =
    useUpdateroomMutation();
  const { data: roomData, isFetching: isRoomDataFetching } =
    useGetroomQuery(roomId);

  useEffect(() => {
    if (roomData) {
      setFormData({
        name: roomData.name,
        description: roomData.description,
        organization: roomData.organization,
        tag: roomData.tag,
      });
    }
  }, [roomData, isRoomDataFetching]);

  const handleBackNav = () => {
    navigation.goBack();
  };

  const handleEditRoomClick = async () => {
    try {
      console.log("Submitted Edited Room Data : ", roomId, formData);
      await updateRoom({ roomId, formData }).unwrap();
      console.log("Succesfully Edited room data");
      toast.show({
        placement: "top",
        title: "Successfully Edited Room",
        description: "All room details have been updated",
      });
      handleBackNav();
    } catch (error) {
      console.error(error);
      toast.show({
        placement: "top",
        title: "An error occurred",
        description: "Please try again later",
      });
    }
  };

  const getFieldValueChangeHandler = (fieldName: string) => (value: string) =>
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

  if (isRoomDataFetching) {
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
        <LoadingIndictator />
      </View>
    );
  }

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
          <Input
            variant="underlined"
            placeholder="Enter Room Name"
            value={formData.name}
            onChangeText={getFieldValueChangeHandler("name")}
          />
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Description</Text>
        </View>
        <View style={styles.box1}>
          <TextArea
            h={20}
            placeholder="Enter Description"
            w="100%"
            backgroundColor={Colors.colorGhostwhite}
            maxW={400}
            autoCompleteType="off"
            value={formData.description}
            onChangeText={getFieldValueChangeHandler("description")}
          />
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Organisation</Text>
        </View>
        <View style={styles.box1}>
          <Input
            variant="underlined"
            placeholder="Enter Organisation Name"
            value={formData.organization}
            onChangeText={getFieldValueChangeHandler("organization")}
          />
        </View>
        <View style={styles.box1}>
          <Text style={styles.typoBoddy}>Tag</Text>
        </View>
        <View style={styles.box2}>
          <Stack
            mb="2.5"
            mt="1.5"
            direction={{ base: "row", md: "row" }}
            space={4}
            mx={{ base: "auto", md: "0" }}
            style={{ paddingHorizontal: 5 }}
          >
            {["OFFICE", "HOME", "EDUCATION", "BUSINESS"].map((key) => (
              <TagButton
                key={key}
                isSelected={formData.tag === key}
                onClick={getFieldValueChangeHandler("tag")}
              >
                {key}
              </TagButton>
            ))}
          </Stack>
        </View>
        <Button
          size="lg"
          backgroundColor={Colors.ppButtons}
          borderRadius={10}
          marginTop={170}
          onPress={handleEditRoomClick}
          isLoading={isUpdateRoomLoading}
        >
          Edit Room
        </Button>
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
