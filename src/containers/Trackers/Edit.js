import React from "react";
import {observer} from "mobx-react";
import {ActivityIndicator, Picker, Text, TextInput, View} from "react-native-web";
import {globalStyles} from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Edit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    store.trackerStore.getTracker(id)
    store.companyStore.getAll()
  }

  render() {
    if (store.trackerStore.loading || store.companyStore.loading) {
      return (
        <View style={[globalStyles.container, {justifyContent: "center"}]}>
          <ActivityIndicator size={48}/>
        </View>
      )
    }
    if (store.trackerStore.tracker.id === 0) {
      return (
        <View style={globalStyles.container}>
          <Text>404 not found</Text>
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour modifier le traqueur"
        onSubmit={() => store.trackerStore.update()}
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
            <Picker.Item label={"selectionner"} value={0}/>
            {
              store.companyStore.companies.map((company, index) => (
                <Picker.Item key={index} label={company.name} value={company.id}/>
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
            <Picker.Item label={"selectionner"} value={0}/>
            {
              store.carStore.cars.map((car, index) => (
                <Picker.Item key={index} label={car.numberplate} value={car.id}/>
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

export default observer(Edit);
