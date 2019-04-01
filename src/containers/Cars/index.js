import React from "react";
import {observer} from "mobx-react";
import {Route, withRouter} from "react-router-dom";
import {StyleSheet, View} from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";
import {colors, globalStyles} from "../../constants";

import store from '../../stores'

const Cars = withRouter(({history, location}) => (
  <Container title="Gestion des vehicules">
    <View style={globalStyles.links}>
      <Link
        text="Tous les vehicules"
        onPress={()=>history.push("/cars")}
        isSelected={location.pathname === "/cars"}
      />
      {
        store.userStore.currentUser.role === "superadmin" &&
        <Link
          text="Ajouter une vehicule"
          onPress={() => history.push("/cars/add")}
          isSelected={location.pathname === "/cars/add"}
        />
      }
    </View>
    <Route path="/cars" component={All} exact/>
    <Route path="/cars/add" component={Add} exact/>
    <Route path="/cars/edit/:id" component={Edit}/>
  </Container>
))

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    width: 800,
    flex: 1
  },
  links: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
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

export default observer(Cars);
