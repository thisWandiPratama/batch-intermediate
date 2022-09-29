import { myHeadersApiPublic, baseURL } from "./ApiService";
import { removeToken, storeToken, removeBadge } from "./token/token";
import { ToastAndroid } from "react-native";
import { addNotifikasi } from "../service/ApiGuestService";

// Logout Service
export const logoutService = () => {
    removeToken();
    removeBadge();
};

// Syarat Service
export const syaratByRole = (role) => {
    const consume = fetch(`${baseURL}/admins/syarat/${role}/`, {
        method: "GET",
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => ToastAndroid.show("Network Request Failed!", ToastAndroid.LONG))
    return consume;
}

// Register Service
export const registerStudentService = (data) => {
    const formData = data;
    const consume = fetch(`${baseURL}/users/register/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .then(result => {
            storeToken(result.data.token, result.data.role);
            ToastAndroid.show(result.meta.message, ToastAndroid.LONG);
        })
        .catch(err => console.log(err));
    return consume;
};

export const registerTeacherService = (data, uri, type) => {
    let myHeadersApiPublic = new Headers();
    myHeadersApiPublic.append("Accept", "multipart/form-data");

    let formdata = new FormData();
    let dataToSend = data;

    for (let p in dataToSend) formdata.append(p, dataToSend[p]);

    formdata.append("avatar_bersama_ktp", {
        name: uri,
        uri,
        type,
    });

    const consume = fetch(`${baseURL}/teachers/register/`, {
        method: "POST",
        body: formdata,
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .then(result => {
            storeToken(result.data.token, result.data.role);
            let dataToSendAdmin = {
                student_id: 0,
                teacher_id: result.data.id,
                transaction_id: 0,
                message_notifikasi: "Pendaftaran akun teacher baru atas nama" + " " + result.data.nama,
                info: "info",
                is_read: 1,
                role: "admin"
            }
            let dataToSendTeacher = {
                student_id: 0,
                teacher_id: result.data.id,
                transaction_id: 0,
                message_notifikasi: "Hallo teacher" + " " + result.data.nama + " " + "akun sedang menunggu verifikasi admin. Mohon ditunggu ya.",
                info: "info",
                is_read: 1,
                role: "user"
            }
            addNotifikasi(dataToSendAdmin)
            addNotifikasi(dataToSendTeacher)
            ToastAndroid.show(result.meta.message, ToastAndroid.LONG);
            console.log("register")
        })
        .catch(err => console.log(err))
    return consume;
}

// Login Service
export const loginService = (data, role) => {
    const formData = data;
    const consume = fetch(`${baseURL}/${role}s/login/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => ToastAndroid.show("Network Request Failed!", ToastAndroid.SHORT));
    return consume;
}

export const loginGoogleService = (data, role) => {
    const formData = data;
    const consume = fetch(`${baseURL}/${role}s/logingoogle/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return consume;
}

// Check Email Service
export const checkEmailService = (email, role) => {
    const formData = { email };
    const consume = fetch(`${baseURL}/${role}s/email_checkers/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => ToastAndroid.show("Network Request Failed!", ToastAndroid.SHORT))
    return consume;
}