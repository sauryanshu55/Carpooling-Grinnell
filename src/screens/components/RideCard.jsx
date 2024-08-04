import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialChipBasic from "./Chip";

export function MaterialCardWithImageAndTitle(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        <View style={styles.bodyContent}>
          <Text style={styles.march27230Pm}>March 27, 2:30 PM</Text>
          <Text style={styles.subtitleHere}>
            Walmart, 1127 E Street, West Des Moines
          </Text>
        </View>
      </View>
      <View style={styles.actionBody}>
        <TouchableOpacity
          onPress={() => console.log("Navigate to Untitled")}
          style={styles.button}
        >
          <Text style={styles.offerToDrive}>Offer to Drive</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loremIpsum}>$18.5</Text>
      <Text style={styles.toAndFrom}>To and From</Text>
      <Text style={styles.flexible1}>Wait at stop for 30 mins</Text>
      <Text style={styles.requestedBy}>Requested By</Text>
      <Text style={styles.johnDoe}>John Doe</Text>
      <MaterialChipBasic style={styles.materialChipBasic}></MaterialChipBasic>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.21,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "#000000"
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    height: 102,
    width: 359
  },
  march27230Pm: {
    fontSize: 18,
    color: "#000",
    paddingBottom: 12
  },
  subtitleHere: {
    fontSize: 11,
    color: "#000",
    lineHeight: 16,
    opacity: 0.5,
    width: 153,
    height: 14
  },
  actionBody: {
    padding: 8,
    flexDirection: "row",
    width: 353,
    height: 58
  },
  button: {
    padding: 8,
    height: 27,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    shadowColor: "rgba(189,16,224,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.29,
    shadowRadius: 0,
    width: 81
  },
  offerToDrive: {
    fontSize: 10,
    color: "#000",
    opacity: 0.9
  },
  loremIpsum: {
    top: 40,
    left: 242,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(155,155,155,1)",
    fontSize: 37,
    width: 108,
    height: 48
  },
  ellipse: {
    top: 98,
    left: 18,
    width: 9,
    height: 8,
    position: "absolute",
    opacity: 0.42
  },
  flexible: {
    top: 98,
    left: 30,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    height: 8,
    width: 43,
    fontSize: 7
  },
  ellipse1: {
    top: 98,
    left: 143,
    width: 9,
    height: 8,
    position: "absolute",
    opacity: 0.42
  },
  ellipse2: {
    top: 98,
    left: 75,
    width: 9,
    height: 8,
    position: "absolute",
    opacity: 0.42
  },
  toAndFrom: {
    top: 98,
    left: 89,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    height: 8,
    width: 43,
    fontSize: 7
  },
  flexible1: {
    top: 98,
    left: 156,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(74,74,74,1)",
    height: 8,
    width: 87,
    fontSize: 7
  },
  requestedBy: {
    top: 120,
    left: 287,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(155,155,155,1)",
    height: 13,
    width: 67,
    fontSize: 10,
    textAlign: "right"
  },
  johnDoe: {
    top: 137,
    left: 200,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 19,
    width: 151,
    textAlign: "right",
    fontSize: 15
  },
  materialChipBasic: {
    width: 173,
    height: 24,
    position: "absolute",
    left: 183,
    top: 5,
    borderWidth: 1,
    borderColor: "rgba(189,16,224,1)",
    borderStyle: "solid"
  }
});

export default MaterialCardWithImageAndTitle;
