import { myHeadersApiPublic, baseURL } from "./ApiService";
import { ToastAndroid } from "react-native";
import { getTokenFcm } from "./token/token";

export const getAllTeacherService = () => {
    const consume = fetch(`${baseURL}/allteacher/`, {
        method: "GET",
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => ToastAndroid.show("Network Request Failed", ToastAndroid.SHORT))
    return consume;
}

export const getAllStudentService = () => {
    const consume = fetch(`${baseURL}/allstudent/`, {
        method: "GET",
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return consume;
}

export const getProfileService = (token, role) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Accept", "application/json");
    myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

    const consume = fetch(`${baseURL}/${role == "admin" ? "users" : role + "s"}/${role == "user" ? role + "s" : role == "admin" ? "users" : role}_fetch/`, {
        method: "GET",
        headers: myHeadersApiPrivate,
    })
        .then(response => response.json())
        .catch(err => ToastAndroid.show("Network Request Failed!", ToastAndroid.SHORT))
    return consume;
}

export const getAllBatuanService = () => {
    const consume = fetch(`${baseURL}/admins/allbantuan/`, {
        method: "GET",
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return consume;
}

export const getSpesialisMapelService = () => {
    const consume = fetch(`${baseURL}/admins/allspesialis/`, {
        method: "GET",
        headers: myHeadersApiPublic,
    })
        .then(response => response.json())
        .catch(err => console.log(err))
    return consume;
}

export const searchTeacherService = (token, word) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Accept", "application/json");
    myHeadersApiPrivate.append("Authorization", `Bearer ${token}`);

    const consume = fetch(`${baseURL}/teachers/search/${word}/`, {
        method: "GET",
        headers: myHeadersApiPrivate,
    })
        .then(res => res.json())
        .catch(err => ToastAndroid.show("Network Request Failed!", ToastAndroid.SHORT))
    return consume;
}

export const checkContactAdminService = (admin_id, customer_id) => {
    let dataToSend = {
        admin_id,
        customer_id
    }

    const consume = fetch(`${baseURL}/check_contact_with_admin/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

export const getDataAdminService = () => {
    const consume = fetch(`${baseURL}/admins/data/`, {
        method: "GET",
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

export const addContactAdminService = (admin_id, customer_id, pengirim) => {
    let dataToSend = {
        admin_id,
        customer_id,
        pengirim
    }

    const consume = fetch(`${baseURL}/add_contact_with_admin/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

export const pushNotificationService = async (notification) => {
    let myHeadersApiPrivate = new Headers();
    myHeadersApiPrivate.append("Content-Type", "application/json");
    myHeadersApiPrivate.append("Authorization", "key=AAAACoktzJI:APA91bEn9fap-WEvJRM_r3240PTuWz7GDPONKKAgQajHOmMZf3lRbRRCnh7Jr-6Hq_QoTzgQ7t2LxuINfFa-EXvvImCD1_KO82wurhxg1u-Yj8RkDbv03HJ7T7mVzdx06gtNuRJYNHhl");

    const token = await getTokenFcm();

    const dataToSend = {
        to: token,
        priority: "high",
        notification,
    }

    const consume = fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPrivate
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}


// 
export const getCountBadgeNotifChatStudent = (student_id) => {
    let dataToSend = {
        student_id
    }

    const consume = fetch(`${baseURL}/count_badge_notif_chat_student/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

export const updateTokenNotifFCM = (student_id, token_notif) => {
    let dataToSend = {
        student_id,
        token_notif
    }

    const consume = fetch(`${baseURL}/users/add_token_notif/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

export const addNotifikasi = (data) => {
    let dataToSend = {
        student_id:data.student_id,
        teacher_id:data.teacher_id,
        transaction_id:data.transaction_id,
        message_notifikasi:data.message_notifikasi,
        info:data.info,
        is_read:data.is_read,
        role:data.role
    }

    const consume = fetch(`${baseURL}/add_notifikasi/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

export const getCountNotifikasi = (data) => {
    let dataToSend = {
        akses:data.akses,
        id_akses:data.id_akses,
    }

    const consume = fetch(`${baseURL}/get_count_notifikasi/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

// get data student by id
export const getDataStudentByID = (student_id) => {

    const consume = fetch(`${baseURL}/datauser/${student_id}/`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}

// get data student by id
export const getDataTeacherByID = (student_id) => {

    const consume = fetch(`${baseURL}/datateacher/${student_id}/`, {
        method: "GET"
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}


export const UpdateIsReadNotifikasi = (notif_id) => {
    let dataToSend = {
        notif_id:notif_id
    }

    const consume = fetch(`${baseURL}/update_is_read_notifikasi/`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: myHeadersApiPublic,
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return consume;
}