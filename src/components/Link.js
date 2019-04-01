import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Text } from "react-native-web";
import {colors} from "../constants";


const Link = ({onPress, isSelected, text}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.link,
      {
        borderColor:
          isSelected
            ? colors.orange
            : colors.lightGray
      }
    ]}
  >
    <Text
      style={{
        fontWeight: isSelected ? "bold" : ""
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  link: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: colors.lightGray
  }
});

Link.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Link