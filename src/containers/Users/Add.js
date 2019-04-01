import React from "react";
import { observer } from "mobx-react";
import { TextInput, View, Text, ActivityIndicator, Picker } from "react-native-web";

import { globalStyles } from "../../constants";
import Form from "../../components/Form";

import store from '../../stores'

class Add extends React.Component {
  componentDidMount() {

    if (store.userStore.currentUser.role === 'superadmin') {
      store.companyStore.getAll()
      store.userStore.user = {
        id: 0,
        username: "",
        email: "",
        tel: "",
        job: "",
        role: "user",
        password: "",
        passwordVerification: "",
        user_id: 0,
        company_id: 0,
        created_at: "",
        updated_at: ""
      }
    } else{
      store.userStore.user = {
        id: 0,
        username: "",
        email: "",
        tel: "",
        job: "",
        role: "user",
        password: "",
        passwordVerification: "",
        user_id: 0,
        company_id: store.userStore.currentUser.company_id,
        created_at: "",
        updated_at: ""
      }
    }
  }

  renderUserRole() {
    if (store.userStore.currentUser.role === 'admin' || store.userStore.currentUser.role === 'superadmin') {
      return (
        <Form.Item required label="Type d'utilisateur">
          <Picker
            value={store.userStore.user.role}
            onValueChange={value =>
              store.userStore.user.role = value
            }
            style={globalStyles.pickerInput}
          >
            {
              store.userStore.currentUser.role === "superadmin" &&
              <Picker.Item value='admin' label="Admin" />
            }
            <Picker.Item value='superuser' label="Sous admin" />
            <Picker.Item value='user' label="Utilisateur" />
          </Picker>
        </Form.Item>
      )
    }
  }

  render() {
    if (store.userStore.loading || store.companyStore.loading) {
      return (
        <View style={[globalStyles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={48} />
        </View>
      )
    }
    if (store.companyStore.companies.length === 0 && store.userStore.currentUser.role === 'superadmin') {
      return (
        <View style={globalStyles.container}>
          <Text>Il ya aucun enterprises</Text>
        </View>
      );
    }
    return (
      <Form
        label="Sauvegarder pour créer un nouvel utilisateur"
        onSubmit={() => store.userStore.create()}
      >
        {
          store.userStore.currentUser.role === 'superadmin' &&
          <Form.Item required label="Enterprise">
            <Picker
              value={store.userStore.user.company_id}
              onValueChange={value =>
                store.userStore.user.company_id = value
              }
              style={globalStyles.pickerInput}
            >
              <Picker.Item label={"selectionner"} value={0} />
              {
                store.companyStore.companies.map((company, index) => (
                  <Picker.Item label={company.name} value={company.id} />
                ))
              }
            </Picker>
          </Form.Item>
        }


        <Form.Item required label="Nom de l'utilisateur">
          <TextInput
            value={store.userStore.user.username}
            onChangeText={text =>
              store.userStore.user.username = text
            }
            placeholder="Nom"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item required label="Email de l'utilisateur">
          <TextInput
            value={store.userStore.user.email}
            onChangeText={text =>
              store.userStore.user.email = text
            }
            placeholder="Email"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="N° Telephone">
          <TextInput
            value={store.userStore.user.tel}
            onChangeText={text =>
              store.userStore.user.tel = text
            }
            placeholder="Telephone"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item label="Post de travail">
          <TextInput
            value={store.userStore.user.job}
            onChangeText={text =>
              store.userStore.user.job = text
            }
            placeholder="Travail"
            style={globalStyles.textInput}
          />
        </Form.Item>

        <Form.Item required label="Mot de pass">
          <TextInput
            value={store.userStore.user.password}
            onChangeText={text =>
              store.userStore.user.password = text
            }
            placeholder="Mot de pass"
            style={globalStyles.textInput}
          />
        </Form.Item>

        {
          this.renderUserRole()
        }
      </Form>
    );
  }
}

export default observer(Add);
