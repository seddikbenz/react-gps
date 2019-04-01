import React from "react";
import { observer } from "mobx-react";
import {ActivityIndicator, Picker, Text, TextInput, View} from "react-native-web";
import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Add extends React.Component {
  componentDidMount(){
    store.carStore.car = {
      id: 0,
      numberplate: "",
      code: "",
      gps_code: "",
      company_id: ""
    }
    if (store.userStore.currentUser.role === 'superadmin') {
      store.companyStore.getAll()
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
      <Form
        label="Sauvegarder pour créer une nouvele vehicule"
        onSubmit={() => store.carStore.create()}
      >
        {
          store.userStore.currentUser.role === "superadmin" &&
          <Form.Item required label="Enterprise de vehicule">
            <Picker
              value={store.carStore.car.company_id}
              onValueChange={value =>
                store.carStore.car.company_id = value
              }
              style={globalStyles.pickerInput}
            >
              <Picker.Item label={"selectionner"} value={0} />
              {
                store.companyStore.companies.map((company, index) => (
                  <Picker.Item key={index} label={company.name} value={company.id} />
                ))
              }
            </Picker>
          </Form.Item>
        }
        <Form.Item required label="Matricles de vehicule">
          <TextInput
            value={store.carStore.car.numberplate}
            onChangeText={(text) => store.carStore.car.numberplate = text}
            placeholder="Matricule"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Code de vehicule">
          <TextInput
            value={store.carStore.car.code}
            onChangeText={(text) => store.carStore.car.code = text}
            placeholder="Code"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Code GPS de vehicule">
          <TextInput
            value={store.carStore.car.gps_code}
            onChangeText={(text) => store.carStore.car.gps_code = text}
            placeholder="Code GPS"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
