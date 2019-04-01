import React from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator
} from "react-native-web";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import store from "../../stores";

import { globalStyles } from "../../constants";
import Card from "../../components/Card";

class All extends React.Component {
  componentDidMount() {
    store.companyStore.getAll()
  }
  delete(id) {
    if (window.confirm('Do you delete this Company')) {
      store.companyStore.delete(id)
    }
  }
  render() {
    if (store.companyStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }
    if (store.companyStore.companies.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun enterprises</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher une enterprise ..."
            style={globalStyles.searchInput}
          />
        </View>

        <ScrollView>
          <View style={globalStyles.cards}>
            {
              store.companyStore.companies.map((company, index) => (
                <Card
                  key={index}
                  isSelected={store.companyStore.selectedId === company.id}
                  onDelete={() => this.delete(company.id)}
                  onEdit={() => this.props.history.push("/companies/edit/" + company.id)}
                  onPress={() => {
                    store.companyStore.selectedId = company.id;
                  }}
                >
                  <Text>{company.name}</Text>
                </Card>
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default observer(All);
