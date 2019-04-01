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
    store.carStore.getAll()
  }
  delete(id) {
    if (window.confirm('Do you delete this car')) {
      store.carStore.delete(id)
    }
  }
  render() {
    if (store.carStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }

    if (store.carStore.cars.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun voitures</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher une vehicule ..."
            style={globalStyles.searchInput}
          />
        </View>

        <ScrollView>
          <View style={globalStyles.cards}>
            {
              store.carStore.cars.map((car, index) => (
                <Card
                  key={index}
                  isSelected={store.carStore.selectedId === car.id}
                  onDelete={() => this.delete(car.id)}
                  onEdit={() => this.props.history.push("/cars/edit/" + car.id)}
                  onPress={() => {
                    store.carStore.selectedId = car.id;
                  }}
                >
                  <Text>{car.numberplate}</Text>
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
