import React from "react";
import PropTypes from "prop-types";
import {observer} from 'mobx-react'
import {StyleSheet, View, TouchableOpacity, Text} from "react-native-web";
import {
  FaWindowClose,
  FaCheckSquare,
} from 'react-icons/fa'

import store from "../stores";

const Toast = ({id, text, type, onDismiss}) => (
  <TouchableOpacity
    style={styles.toast}
    onPress={onDismiss}
  >
    {type === "error" && <FaWindowClose color={'red'} size={32}/>}
    {type === "success" && <FaCheckSquare color={'green'} size={32}/>}
    <Text style={styles.toastText}> {text} </Text>
  </TouchableOpacity>
)

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

class ToastContainer extends React.Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        {
          store.toastStore.toasts.map((toast, index) => (
            <Toast
              key={index}
              id={toast.id}
              text={toast.text}
              type={toast.type}
              onDismiss={() => store.toastStore.dismiss(toast.id)}
            />
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    position: "absolute",
    bottom: 100,
    alignItems: "center",
    zIndex: 9999
  },
  toast: {
    width: 360,
    flexDirection: "row",
    flex: 1,
    padding: 20,
    backgroundColor: "black",
    opacity: 0.7,
    alignItems: "center",
    borderRadius: 10,
    margin: 5
  },
  toastText: {
    color: "white",
    marginLeft: 10
  }
});

export default observer(ToastContainer)
