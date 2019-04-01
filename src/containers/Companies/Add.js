import React from "react";
import { observer } from "mobx-react";
import { TextInput } from "react-native-web";
import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Add extends React.Component {
  componentDidMount(){
    store.companyStore.company = {
      id: 0,
      name: "",
      logo: ""
    }
  }
  render() {
    return (
      <Form
        label="Sauvegarder pour créer une nouvele enterprise"
        onSubmit={() => store.companyStore.create()}
      >
        <Form.Item required label="Nom de l'enterprise">
          <TextInput
            value={store.companyStore.company.name}
            onChangeText={(text) => store.companyStore.company.name = text}
            placeholder="Nom"
            style={globalStyles.textInput}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Add);
