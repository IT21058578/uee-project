import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Font from "../constants/Font";
import { FontSize, Color, Border } from "../Styles/GlobalStyles";

const ContainerFrame = () => {
  return (
    <View style={[styles.frame, styles.frameLayout]}>
      <View style={[styles.frame1, styles.frameLayout]}>
        <Text style={styles.hiTharindu}>Hi, Tharindu</Text>
        <Text style={styles.letsMakeThis}>Let’s make this day productive</Text>
      </View>
      <View style={styles.frame2}>
        <Image
          style={styles.personedSkinTonewhitePo}
          contentFit="cover"
          source={require("../assets/personed-skin-tonewhite-posture1-happy.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    height: 56,
    overflow: "hidden",
  },
  hiTharindu: {
    fontSize: FontSize.size_9xl,
    lineHeight: 31,
    fontWeight: "600",
    fontFamily: Font["poppins-regular"],
    color: Color.midnightblue,
    textAlign: "left",
  },
  letsMakeThis: {
    fontSize: FontSize.size_sm,
    lineHeight: 17,
    fontFamily: Font["poppins-regular"],
    color: Color.dimgray,
    marginTop: 8,
    textAlign: "left",
  },
  frame1: {
    width: 182,
    overflow: "hidden",
  },
  personedSkinTonewhitePo: {
    width: 37,
    height: 36,
  },
  frame2: {
    borderRadius: Border.br_sm,
    backgroundColor: Color.white,
    shadowColor: "#f1f7ff",
    shadowOffset: {
      width: -3,
      height: 7,
    },
    shadowRadius: 13,
    elevation: 13,
    shadowOpacity: 1,
    width: 39,
    height: 39,
    alignItems: "center",
    marginLeft: 106,
    overflow: "hidden",
  },
  frame: {
    position: "absolute",
    top: 20,
    left: 0,
    width: 327,
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default ContainerFrame;
