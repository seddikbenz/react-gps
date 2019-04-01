import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native-web";

import { colors } from "../constants";

const Container = ({ children, title, style }) => (
  <View style={[styles.container, style]}>
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: colors.lightGray
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    width: 960,
    flex: 1
  }
});

Container.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  //style: PropTypes.object
};

export default Container;
