import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, ToastAndroid, Modal, TouchableWithoutFeedback, TouchableNativeFeedback, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            is_Loading: false,
            is_see_password: true,
        };
    }

    login = async () => {
        this.setState({ is_Loading: true })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("http://103.189.234.73:8080/api/v1/users/login/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.meta.status == "success") {
                    this.storeToken(result.data.token)
                    this.setState({ is_Loading: false })
                    this.props.navigation.navigate("Home")
                    alert(result.meta.message)
                } else {
                    this.setState({ is_Loading: false })
                    alert(result.meta.message)
                }

            })
            .catch(error => {
                this.setState({ is_Loading: false })
                console.log('error', error)
            });
    }

    storeToken = async (token) => {
        await AsyncStorage.setItem("token", token);
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.4)", marginLeft: 10, marginRight: 10 }} >
                <ScrollView>
                    <View style={{ marginTop: 25 }}>
                        <Text style={{ fontWeight: "bold", color: "#000", fontSize: 24 }}> Welcome Back,</Text>
                        <Text style={{ fontSize: 12, paddingLeft: 4, color: "#53565B" }}> Sign in to continue </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={{ height: 150, width: 150 }} source={{ uri: "https://i.ibb.co/dL63qgp/destination.png" }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ height: 30, width: 30, marginRight: 5 }} source={{ uri: "https://i.ibb.co/fYtcms8/email.png" }} />
                        <View style={{ width: "100%" }}>
                            <TextInput
                                placeholder='Masukan email anda'
                                onChangeText={(email) => this.setState({ email: email })}
                                style={{ borderBottomWidth: 1, borderBottomColor: "#CCCCCC" }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
                        <Image style={{ height: 30, width: 30, marginRight: 5 }} source={{ uri: "https://i.ibb.co/TwwZKmd/reset-password.png" }} />
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
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <TouchableOpacity
                            disabled={(this.state.email && this.state.password) == "" || this.state.is_Loading}
                            onPress={() => this.login()}
                            style={{ height: 55, width: "90%", backgroundColor: (this.state.email && this.state.password) == "" || this.state.is_Loading ? "#ED6F3C90" : "#ED6F3C", marginTop: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}
                        >
                            {this.state.is_Loading ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>Login</Text>}
                        </TouchableOpacity>
                        <View style={{ width: "90%", flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ color: "#53565B", fontSize: 14, }} >Don't have an account?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: "#803F87" }} >Create Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Login;