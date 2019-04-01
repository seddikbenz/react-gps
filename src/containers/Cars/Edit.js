import React from "react";
import { observer } from "mobx-react";
import {TextInput, View, Text, ActivityIndicator, Picker} from "react-native-web";
import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Edit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    store.carStore.getCar(id)
    if (store.userStore.currentUser.role === 'superadmin') {
      store.companyStore.getAll()
    }
  }
  render() {
    if (store.companyStore.loading || store.carStore.loading ) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }
    return (
      <Form
        label="Sauvegarder pour modifier la vehicule"
        onSubmit={() => store.carStore.update()}
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
            editable={store.userStore.currentUser.role === "superadmin"}
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

export default observer(Edit);
