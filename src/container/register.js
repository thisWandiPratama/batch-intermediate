import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, ToastAndroid, Modal, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { registerService } from "../service/ApiAuthService";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      is_see_password: true,
      is_see_field_input: false,
      is_Loading: false
    };
  }

  register = () => {
    this.setState({ is_Loading: true });
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
    }
    registerService(data)
      .then(result => {
        console.log(result)
        if(result.meta.status == "success"){
          this.props.navigation.navigate("Login")
          ToastAndroid.show(result.meta.message, ToastAndroid.LONG)
        }
        result.meta.status == "error" ? ToastAndroid.show("password atau email anda salah!", ToastAndroid.LONG) : ToastAndroid.show(result.meta.message, ToastAndroid.LONG);
      })
      .finally(() => this.setState({ is_Loading: false }))
    return false;
  }


  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10, backgroundColor: "#fff" }} >
        <View style={{ marginTop: 25 }}>
          <Text style={{ fontWeight: "bold", color: "#000", fontSize: 24 }}> Welcome,</Text>
          <Text style={{ fontSize: 12, paddingLeft: 4, color: "#53565B" }}> Register in to enter </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image style={{ height: 150, width: 150 }} source={{ uri: "https://i.ibb.co/dL63qgp/destination.png" }} />
        </View>
        <View style={{ alignItems: "center" }} >
          <View View style={{ width: "95%", marginTop: 10 }}>
            <View style={{ width: "95%" }}>
              <Text style={{ color: "#53565B", fontSize: 14 }}>Nama Lengkap</Text>
              <TextInput
                placeholder='Masukan nama lengkap anda'
                onChangeText={(name) => this.setState({ name: name })}
                style={{ borderBottomWidth: 1, borderBottomColor: "#CCCCCC" }}
              />
            </View>
            <View style={{ width: "95%" }}>
              <Text style={{ color: "#53565B", fontSize: 14 }}>Email</Text>
              <TextInput
                placeholder='Masukan email anda'
                onChangeText={(email) => this.setState({ email: email })}
                style={{ borderBottomWidth: 1, borderBottomColor: "#CCCCCC", color: "#000" }}
              />
            </View>
            <View>
              <Text style={{ color: "#53565B", fontSize: 14 }}>Password</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }} >
                <TextInput
                  placeholder='Masukan password anda'
                  onChangeText={(password) => this.setState({ password: password })}
                  secureTextEntry={this.state.is_see_password}
                  style={{ borderBottomWidth: 1, borderBottomColor: "#CCCCCC", width: "90%" }}
                />
                {this.state.is_see_password ?
                  <TouchableOpacity onPress={() => this.setState({ is_see_password: !this.state.is_see_password })}>
                    <Image
                      source={{ uri: "https://i.ibb.co/XSvLQ2G/eye-password.png" }}
                      style={{ height: 19, width: 19, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => this.setState({ is_see_password: !this.state.is_see_password })}>
                    <Image
                      source={{ uri: "https://i.ibb.co/qJV2fzc/eye-hidden.png" }}
                      style={{ height: 19, width: 19, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                }
              </View>

              <View style={{ width: "95%" }}>
                <Text style={{ color: "#53565B", fontSize: 14 }}>Phone</Text>
                <TextInput
                  placeholder='Masukan no telepon anda'
                  onChangeText={(phone) => this.setState({ phone: phone })}
                  style={{ borderBottomWidth: 1, borderBottomColor: "#CCCCCC" }}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={{ alignItems: 'center', width: "95%" }}>
              <TouchableOpacity
                onPress={() => this.register()}
                style={{ height: 55, width: "90%", backgroundColor: "#ED6F3C", marginTop: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}
              >
                {this.state.is_Loading ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Register</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Register;