import React from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native-web";
import { colors } from "../constants";

const Item = ({ children, label, required }) => (
  <View style={styles.row}>
    <Text style={styles.text}> {label} {required && <Text style={[styles.text, { color: colors.red }]} >*</Text>}</Text>
    {children}
  </View>
);

Item.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired
};

const Form = ({ children, onSubmit, label, onSubmitLabel }) => (
  <ScrollView>
    <View style={styles.container}>
      {children}
      <View style={styles.controllers}>
        <Text> {label} </Text>
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.textButton}> {onSubmitLabel ? onSubmitLabel : "Sauvegarder"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>

);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    alignSelf: "center",
    width: 600,
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  controllers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray
  },
  textButton: {
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 16,
    alignSelf: "flex-end"
  },
  textInput: {
    paddingHorizontal: 10,
    height: 32,
    width: 350,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 3
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    marginBottom: 10
  },
  text: {
    fontWeight: "bold"
  }
});

Form.propTypes = {
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string,
  onSubmitLabel: PropTypes.string
};

Form.Item = Item;

export default Form;
