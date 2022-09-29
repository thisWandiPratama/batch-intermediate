import AsyncStorage from "@react-native-async-storage/async-storage";

const storeTokenFcm = async (tokenFcm) => {
    await AsyncStorage.setItem("tokenFcm", tokenFcm);
}

const getTokenFcm = async (dataid) => {
    const value = await AsyncStorage.getItem("tokenFcm");
    console.log(dataid)
    return value;
}

const storeToken = async (tokens, roles) => {
    const token = ["token", tokens];
    const role = ["role", roles];
    await AsyncStorage.multiSet([token, role]);
};

const getToken = async () => {
    const value = await AsyncStorage.multiGet(["token", "role"]);
    return value;
};

const storeBadge = async (badge) => {
    await AsyncStorage.setItem("badge", JSON.stringify(badge));
}

const getBadge = async () => {
    const value = await AsyncStorage.getItem("badge");
    return String(value);
}

const removeBadge = async () => {
    await AsyncStorage.removeItem("badge")
}

const removeToken = async () => {
    await AsyncStorage.removeItem("token");
};

export { storeToken, getToken, removeToken, storeTokenFcm, getTokenFcm, storeBadge, removeBadge, getBadge };