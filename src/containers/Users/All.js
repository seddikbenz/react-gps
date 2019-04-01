import React from "react";
import { observer } from "mobx-react";
import { View, Text, TextInput, ScrollView, ActivityIndicator } from "react-native-web";

import store from "../../stores";

import { globalStyles } from "../../constants";
import Card from "../../components/Card";

class All extends React.Component {
  componentDidMount() {
    store.userStore.getAll()
    store.userStore.selectedId = 0
  }
  delete(id) {
    if (window.confirm('Do you delete that User?')) {
      store.userStore.delete(id)
    }
  }
  render() {
    if (store.userStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }
    if (store.userStore.users.length === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun utilisateur</Text>
        </View>
      );
    }
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.header}>
          <TextInput
            placeholder="Rechercher un utilisateur ..."
            style={globalStyles.searchInput}
          />
        </View>
        <ScrollView>
          <View style={globalStyles.cards}>
            {
              store.userStore.users.map((user, index) => (
                <Card
                  key={index}
                  isSelected={store.userStore.selectedId === user.id}
                  onDelete={() => this.delete(user.id)}
                  onEdit={() => this.props.history.push("/users/edit/" + user.id)}
                  onPress={() => {
                    store.userStore.selectedId = user.id;
                  }}
                >
                  <Text>{user.username}</Text>
                  <Text>{user.email}</Text>
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
