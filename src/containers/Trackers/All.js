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
    store.trackerStore.getAll()
  }
  delete(id) {
    if (window.confirm('Do you delete this tracker')) {
      store.trackerStore.delete(id)
    }
  }
  render() {
    if (store.trackerStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }
    if (store.trackerStore.trackers.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun traqueur</Text>
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
              store.trackerStore.trackers.map((tracker, index) => (
                <Card
                  key={index}
                  isSelected={store.trackerStore.selectedId === tracker.id}
                  onDelete={() => this.delete(tracker.id)}
                  onEdit={() => this.props.history.push("/trackers/edit/" + tracker.id)}
                  onPress={() => {
                    store.trackerStore.selectedId = tracker.id;
                  }}
                >
                  <Text>{tracker.code}</Text>
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
