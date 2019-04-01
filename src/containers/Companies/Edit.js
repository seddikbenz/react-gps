import React from "react";
import { observer } from "mobx-react";
import { TextInput, View, Text, ActivityIndicator } from "react-native-web";
import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from "../../stores";

class Edit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    store.companyStore.getCompany(id)
  }
  render() {
    if (store.companyStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }
    if (store.companyStore.company === undefined) {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun enterprises</Text>
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour modifier l'enterprise"
        onSubmit={() => store.companyStore.update()}
      >
        <Form.Item required label="Nom de l'enterprise">
          <TextInput
            placeholder="Nom"
            style={globalStyles.textInput}
            value={store.companyStore.company.name}
            onChangeText={(text)=>store.companyStore.company.name = text}
           />
        </Form.Item>
      </Form>
    );
  }
}

export default observer(Edit);
