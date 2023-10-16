import React from "react";
import { Text, StyleSheet, View , Pressable} from "react-native";
import { Button } from "react-native-paper";
import Font from "../../constants/Font";
import { scheduleTypes } from "../../types";
import { Color,FontSize, Padding, Border } from "../../Styles/GlobalStyles";

const AdminRoomScheduleBox = (props : scheduleTypes) => {
    return(
        <View style={styles.roomManagmentProfileSetti}>
        <View style={styles.roomManagmentProfileSettiInner}>
          <View style={styles.groupParent}>
            <View style={styles.groupChildPosition}>
              <View style={[styles.groupChild, styles.groupChildPosition]} />
              <View style={styles.projectProgressParent}>
                <Text
                  style={[styles.projectProgress, styles.textPosition]}
                >{props.title}</Text>
                <Text style={[styles.text, styles.textPosition]}>
                {props.startTime} - {props.endTime}
                </Text>
              </View>
              <View
                style={[
                  styles.fluentmoreVertical20Regula,
                  styles.groupItemPosition,
                ]}
              />
              <View style={[styles.groupItem, styles.groupItemPosition]} />
            </View>
            <Pressable style={[styles.groupInner, styles.groupInnerLayout]} />
            <Text style={[styles.remove, styles.removeTypo]}>Remove</Text>
            <Pressable
              style={[styles.rectanglePressable, styles.groupInnerLayout]}
            />
            <Text style={[styles.reschedule, styles.removeTypo]}>Reschedule</Text>
          </View>
        </View>
      </View>

    );
}

const styles = StyleSheet.create ({
    groupChildPosition: {
        left: 0,
        top: 0,
        height: 130,
        width: "100%",
        position: "absolute",
      },
      textPosition: {
        textAlign: "left",
        left: 0,
        position: "absolute",
      },
      groupItemPosition: {
        top: 21,
        position: "absolute",
      },
      groupInnerLayout: {
        borderRadius: Border.br_5xs,
        bottom: "10.53%",
        top: "72.81%",
        width: "36.84%",
        height: "16.67%",
        position: "absolute",
      },
      removeTypo: {
        height: 15,
        width: 104,
        textAlign: "center",
        color: Color.colorAliceblue,
        lineHeight: 15,
        fontSize: FontSize.size_3xs,
        top: 85,
        fontFamily: Font['poppins-regular'],
        fontWeight: "500",
        position: "absolute",
      },
      groupChild: {
        borderRadius: 15,
        backgroundColor: "#f9fafd",
      },
      projectProgress: {
        fontSize: 16,
        color: "#2c406e",
        fontFamily: Font['poppins-regular'],
        fontWeight: "500",
        textAlign: "left",
        width: 166,
        top: 0,
      },
      text: {
        top: 26,
        fontSize: 14,
        fontFamily: Font['poppins-regular'],
        color: "#9aa8c7",
        width: "100%",
      },
      projectProgressParent: {
        top: 15,
        left: 37,
        height: 49,
        width: 166,
        position: "absolute",
      },
      fluentmoreVertical20Regula: {
        left: 244,
        width: 21,
        height: 14,
        overflow: "hidden",
      },
      groupItem: {
        left: 21,
        borderStyle: "solid",
        borderColor: "#8f99eb",
        borderRightWidth: 2,
        width: 2,
        height: 37,
      },
      groupInner: {
        right: "11.05%",
        left: "52.11%",
        backgroundColor: "#ff5959",
      },
      remove: {
        left: 175,
      },
      rectanglePressable: {
        right: "52.63%",
        left: "10.53%",
        backgroundColor: "#5b67ca",
      },
      reschedule: {
        left: 42,
      },
      groupParent: {
        height: 114,
        width: "100%",
      },
      roomManagmentProfileSettiInner: {
        top: 10,
        flexDirection: "row",
        width: "100%",
        position: "absolute",
      },
      roomManagmentProfileSetti: {
        backgroundColor: "#feffff",
        flex: 1,
        width: "100%",
        height: 140,
        overflow: "hidden",
      },
})

export default AdminRoomScheduleBox;