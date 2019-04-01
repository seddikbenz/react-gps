import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";
import {
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  View
} from "react-native-web";
import Login from "./containers/Login";
import Header from "./containers/Header";
import Container from "./components/Container";
import Companies from "./containers/Companies";
import Users from "./containers/Users";
import Cars from "./containers/Cars";
import Trackers from "./containers/Trackers";
import Maps from "./containers/Maps";
import ToastContainer from "./containers/Toast";
import { colors } from "./constants";

import store from "./stores";

window.store = store;
class App extends React.Component {
  componentWillMount() {
    store.userStore.me();
  }
  render() {
    if (store.userStore.loadingUser) {
      return (
        <View style={styles.container}>
          <Container style={{ justifyContent: "center" }}>
            <ActivityIndicator size={48} />
          </Container>
        </View>
      );
    }
    if (store.userStore.currentUser.username === "") {
      return (
        <View style={styles.container}>
          <Login />
          <ToastContainer />
        </View>
      );
    }
    return (
      <BrowserRouter>
        <View style={styles.container}>
          <Header />
          <Route path={"/companies"} component={Companies} />
          <Route path={"/users"} component={Users} />
          <Route path={"/cars"} component={Cars} />
          <Route path={"/trackers"} component={Trackers} />
          <Route path={"/maps"} component={Maps} />
          <ToastContainer />
        </View>
      </BrowserRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.darkGray,
    flex: 1
  }
});

export default observer(App);
