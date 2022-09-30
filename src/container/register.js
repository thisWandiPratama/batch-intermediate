import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, ToastAndroid, Modal, TouchableWithoutFeedback, TouchableNativeFeedback, ScrollView } from 'react-native';
import { registerService } from "../service/ApiAuthService";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      alamat: "",
      is_see_password: true,
      is_see_field_input: false,
      is_Loading: false
    };
  }

  register = () => {
    this.setState({ is_Loading: true })
    console.log(typeof this.state.email)
    console.log(typeof this.state.password)
    console.log(typeof this.state.phone)
    console.log(typeof this.state.alamat)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "nama": this.state.name,
      "alamat": this.state.alamat,
      "telepon": this.state.phone,
      "email": this.state.email,
      "password": this.state.password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://103.189.234.73:8080/api/v1/users/register/", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ is_Loading: false })
        this.props.navigation.goBack()
        alert(result.meta.message)

      })
      .catch(error => console.log('error', error));
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
        <ScrollView>
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
                <Text style={{ color: "#53565B", fontSize: 14 }}>Alamat</Text>
                <TextInput
                  placeholder='Masukan alamat lengkap anda'
                  onChangeText={(alamat) => this.setState({ alamat: alamat })}
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
        </ScrollView>
      </View>
    );
  }
}

export default Register;