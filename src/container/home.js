//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { choosePhotoFromLibrary } from "../service/helper"


const Home = ({ navigation }) => {

  const [token, setToken] = useState("")
  const [title, setTitle] = useState("")
  const [longText, setLongText] = useState("")
  const [dataUser, setDataUser] = useState({})
  const [allTodoData, setAllTodo] = useState([])

  const logout = async () => {
    await AsyncStorage.clear()
    navigation.replace("Login")
  }

  useEffect(() => {
    getDataToken()
  }, [])

  const getDataToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        setToken(value)
        getWithTokenService(value)
        allTodo()
      }
    } catch (e) {
      console.log(e)
    }

  }

  const getWithTokenService = (token) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Accept", "application/json");
    myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

    const consume = fetch(`http://103.189.234.73:8080/api/v1/users/users_fetch/`, {
      method: "GET",
      headers: myHeadersApiPrivate,
    })
      .then(response => response.json())
      .then(response => setDataUser(response.data))
      .catch(err => console.log(err))
  }


  const changeImage = async () => {
    const photo = await choosePhotoFromLibrary();
    const upload = await uploadAvatarService(photo.path, photo.mime);
  }

  const uploadAvatarService = async (uri, type) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Accept", "multipart/form-data");
    myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

    let formData = new FormData();

    formData.append("avatar", {
      name: uri,
      uri: uri,
      type: type,
    });

    const consume = fetch(`http://103.189.234.73:8080/api/v1/users/avatars/`, {
      method: "POST",
      body: formData,
      headers: myHeadersApiPrivate,
    })
      .then(response => response.json())
      .then(response => {
        getWithTokenService(token)
      })
      .catch(err => console.log(err))
    return consume
  }

  const simpan = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(dataUser.id)
    var raw = JSON.stringify({
      "title": `${title}`,
      "long_text": `${longText}`,
      "userid": dataUser.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://103.189.234.73:8080/api/v1/add_todo/", requestOptions)
      .then(response => response.json())
      .then(result => allTodo())
      .catch(error => console.log('error', error));
  }

  const allTodo = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "userid": dataUser.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://103.189.234.73:8080/api/v1/all_todo/", requestOptions)
      .then(response => response.json())
      .then(result => {
        setAllTodo(result.data)
        console.log(result.data.map((value, index) => value.title))
      })
      .catch(error => console.log('error', error));
  }


  const renderData = () => {
    return allTodoData.map((value, index) => {
      return (
        <View style={{ height: 50, width: "90%", borderBottomWidth: 1 }}>
          <Text>{value.title}</Text>
          <Text>{value.long_text}</Text>
        </View>
      )
    })
  }

  return (
    <View style={styles.container}>
      <View style={{
        height: 60,
        width: "100%",
        alignItems: "center", //horizontal
        flexDirection: "row",
        borderBottomWidth: 1
      }}>
        <View
          style={{ height: 60, width: "50%", flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => changeImage()}

          >
            <Image
              source={{
                uri: `http://103.189.234.73:8080/images/${dataUser.avatar}`
              }}

              style={{
                height: 50,
                width: 50
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 60, justifyContent: "center" }}
            onPress={() => Alert.alert("Detail User", `${dataUser.nama} ${dataUser.alamat} ${dataUser.email} ${dataUser.telepon}`)}
          >
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "red"
            }}>{dataUser.nama}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 60, width: "50%", justifyContent: "center", alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => logout()}
            style={{
              height: 50,
              width: 100,
              backgroundColor: "red",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25
            }} >
            <Text style={{
              fontSize: 20,
              color: "#fff"
            }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
        flex: 1,
        alignItems: "center"
      }}>
        <View style={{
          height: 80,
          width: "90%",
          justifyContent: "center",
          borderBottomWidth: 1
        }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#aeaeae" }}>Title</Text>
          <TextInput
            placeholder='Masukkan Title'
            onChangeText={input => setTitle(input)}
          />
        </View>
        <View style={{
          height: 80,
          width: "90%",
          justifyContent: "center",
          borderBottomWidth: 1
        }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#aeaeae" }}>Deskripsi</Text>
          <TextInput
            placeholder='Masukkan Long Text'
            onChangeText={input => setLongText(input)}
          />
        </View>
        <TouchableOpacity
          onPress={() => simpan()}
          style={{
            height: 50,
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            marginTop: 10,
            borderRadius: 20
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>Simpan Data</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          {
            allTodoData.length == 0 ?
              <View>
                <Text>Tidak Ada Data</Text>
              </View>
              :
              <View style={{ height: 200, width: "100%" }}>
                {renderData()}
              </View>
          }
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Home;
