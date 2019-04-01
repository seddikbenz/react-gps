import React from "react";
import PropTypes from "prop-types";

import { StyleSheet, View, TouchableOpacity } from "react-native-web";
import { colors } from "../../constants";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const Card = ({ children, onPress, onEdit, onDelete, isSelected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.card,
      {
        borderColor: isSelected ? colors.orange : colors.lightGray
      }
    ]}
  >
    <View style={styles.body}>{children}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    margin: 3,
    backgroundColor: colors.lightGray,
    justifyContent: "space-between"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    bottom: 0,
    paddingBottom: 3
  },
  button: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginBottom: 3
  }
});

Card.propTypes = {
  children: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default Card;
