import _ from 'lodash';
import ImagePicker from "react-native-image-crop-picker"
import { ToastAndroid } from "react-native";
import {PATH } from "./ApiService" 
export const path = PATH


export const toPrice = (price) => {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
};

export const choosePhotoFromLibrary = () => {
    const photo = ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
    .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT))
    return photo;
  }

export const chooseMessageImageFromLibrary = () => {
    const photo = ImagePicker.openPicker({
      cropping: true,
      showCropGuidelines: false,
      compressImageQuality: 0.3
    })
    .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT))
    return photo;
  }

export const takePhotoFromCamera = () => {
    const photo = ImagePicker.openCamera({
        cropping: true,
        showCropGuidelines: false,
        compressImageQuality: 0.3
    })
    .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT))
    return photo;
} 