import React from "react";
import { observer } from "mobx-react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native-web";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { colors, globalStyles } from "../../constants";
import HandleClickOutside from "../../components/HandleClickOutside";
import Card from "./Card";

import store from "../../stores";

class Menu extends React.Component {
  render() {
    return (
      <HandleClickOutside handleClick={() => (store.mapStore.showMenu = false)}>
        <View style={styles.container}>
          <TextInput
            placeholder="Rechercher une vehicule ..."
            style={globalStyles.textInput}
          />
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => (store.mapStore.showMenu = !store.mapStore.showMenu)}
          >
            {!store.mapStore.showMenu && <FaAngleDown size={24} />}
            {store.mapStore.showMenu && <FaAngleUp size={24} />}
          </TouchableOpacity>
          {store.mapStore.showMenu && (
            <ScrollView contentContainerStyle={styles.menuContainer}>
              <View style={styles.menu}>
                {store.mapStore.cars.map((car, index) => (
                  <Card
                    isSelected={store.mapStore.selectedId === car.id}
                    key={index}
                    onPress={() => {
                      if (car.positions.length !== 0) {
                        store.mapStore.zoomTo(car.id, car.positions[0]);
                      }
                    }}
                  >
                    <Text>{car.numberplate}</Text>
                    <Text>{car.numberplate}</Text>
                  </Card>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </HandleClickOutside>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    position: "absolute",
    left: 3,
    top: 3,
    padding: 5,
    borderRadius: 3,
    zIndex: 99999
  },
  menuButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  },
  menu: {
    maxHeight: 550
  },
  menuContainer: {}
});

export default observer(Menu);
