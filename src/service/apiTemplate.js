import { myHeadersApiPublic, baseURL,baseURLTripay } from "./ApiService";
import {ToastAndroid} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


export const postService = (data,endpoint) => {
    const formData = data;
    const consume = fetch(`${baseURL}/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeadersApiPublic,
    })
    .then(response => response.json())
    .catch(err =>  ToastAndroid.show("Network Request Failed!", ToastAndroid.SHORT));
    return consume;
};


export const getService = (endpoint) => {
    const consume = fetch(`${baseURL}/${endpoint}`, {
        method: "GET",
    })
    .then(response => response.json())
    .catch(err =>  ToastAndroid.show("Network Request Failed!", ToastAndroid.SHORT));
    return consume;
};


export const getWithTokenService = (endpoint,token) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Accept", "application/json");
    myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

    const consume = fetch(`${baseURL}/${endpoint}`, {
        method: "GET",
        headers: myHeadersApiPrivate,
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    return consume;
}

export const getServiceTripay = (endpoint,token) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Accept", "application/json");
    myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

    const consume = fetch(`${baseURLTripay}/${endpoint}`, {
        method: "GET",
        headers: myHeadersApiPrivate,
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    return consume;
}

export const getDataToken = async () => {
      const value = await AsyncStorage.getItem('token') 
    return value
  }
