import React from "react";
import { Route, withRouter } from "react-router-dom";
import {View} from "react-native-web";


import All from "./All";
import Add from "./Add";
import Edit from "./Edit";

import Container from "../../components/Container";
import Link from "../../components/Link";

import {globalStyles} from "../../constants";

const Companies = withRouter(({history, location}) => (
  <Container title="Gestion des enterprises">
    <View style={globalStyles.links}>
      <Link
        text="Tous les enterprise"
        onPress={()=>history.push("/companies")}
        isSelected={location.pathname === "/companies"}
      />
      <Link
        text="Ajouter une enterprise"
        onPress={()=>history.push("/companies/add")}
        isSelected={location.pathname === "/companies/add"}
      />
    </View>
    <Route path="/companies" component={All} exact />
    <Route path="/companies/add" component={Add} exact />
    <Route path="/companies/edit/:id" component={Edit} />
  </Container>
));

export default Companies;
