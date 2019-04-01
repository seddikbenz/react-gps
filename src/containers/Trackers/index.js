import React from "react";
import {Route, withRouter} from "react-router-dom";
import {View} from "react-native-web";

import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Link from "../../components/Link";
import Container from "../../components/Container";
import {globalStyles} from "../../constants";

const Trackers = withRouter(({history, location})  => (
  <Container title="Gestion des trackeurs">
    <View style={globalStyles.links}>
      <Link
        text="Tous les trackeurs"
        onPress={()=>history.push("/trackers")}
        isSelected={location.pathname === "/trackers"}
      />
      <Link
        text="Ajouter un trackeur"
        onPress={()=>history.push("/trackers/add")}
        isSelected={location.pathname === "/trackers/add"}
      />
    </View>
    <Route path="/trackers" component={All} exact/>
    <Route path="/trackers/add" component={Add} exact/>
    <Route path="/trackers/edit/:id" component={Edit}/>
  </Container>
))

export default Trackers
