import React from "react";
import {observer} from "mobx-react";
import {ActivityIndicator, Picker, Text, TextInput, View} from "react-native-web";
import {globalStyles} from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Add extends React.Component {
  componentDidMount() {
    store.trackerStore.tracker = {
      id: 0,
      code: "",
      car_id: ""
    };
    store.companyStore.getAll()
  }

  render() {
    if (store.companyStore.loading) {
      return (
        <View style={[globalStyles.container, {justifyContent: "center"}]}>
          <ActivityIndicator size={48}/>
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
      <Form
        label="Sauvegarder pour créer un nouvele traqueur"
        onSubmit={() => store.trackerStore.create()}
      >
        <Form.Item required label="Enterprise de traqueur">
          <Picker
            value={store.trackerStore.tracker.company_id}
            onValueChange={value => {
              store.companyStore.getCompanyCars(value)
              store.trackerStore.tracker.company_id = value
            }}
            style={globalStyles.pickerInput}
          >
            <Picker.Item key={0} label={"selectionner"} value={0}/>
            {
              store.companyStore.companies.map((company, index) => (
                <Picker.Item key={index + 1} label={company.name} value={company.id}/>
              ))
            }
          </Picker>
        </Form.Item>

        <Form.Item required label="vehicule de traqueur">
          <Picker
            value={store.trackerStore.tracker.car_id}
            onValueChange={value => {
              store.trackerStore.tracker.car_id = value
            }}
            style={globalStyles.pickerInput}
          >
            <Picker.Item key={0} label={"selectionner"} value={0}/>
            {
              store.carStore.cars.map((car, index) => (
                <Picker.Item key={index + 1} label={car.numberplate} value={car.id}/>
              ))
            }
          </Picker>
        </Form.Item>

        <Form.Item required label="Code de traqueur">
          <TextInput
            value={store.trackerStore.tracker.code}
            onChangeText={(text) => store.trackerStore.tracker.code = text}
            placeholder="Code"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
