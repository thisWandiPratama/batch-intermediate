// vps producation
// const baseURL = "https://gurujagoan.id/app/api/v1";
// export const PATH = "https://gurujagoan.id/app/";
// export const baseURLTripay = "https://tripay.co.id/api"


// vps development
const baseURL = "https://pindahdigital.my.id/app/api/v1";
export const PATH = "https://pindahdigital.my.id/app/";
// export const baseURLTripay = "https://tripay.co.id/api"


// local
// const baseURL = "http://192.168.1.9:9990/api/v1";
// export const PATH = "http://192.168.1.9:9990/";
export const baseURLTripay = "https://tripay.co.id/api-sandbox"


// tripay config sandbox
// export const kodeMerchant = "T11858"
// export const apiKey = "DEV-cPtfMKyE8BjeoEzra4Kr0oD2WICFOdTbFkbG0Cpq"
// export const privateKey = "XK5Ep-1lENY-UlMmh-ywwxk-aDiRt" 

// tripay config producation
export const kodeMerchant = "T13236"
export const apiKey = "WhzWaP6MHdWE1g3bYwrd1G8QbuzZ0CUqgKGwsars"
export const privateKey = "09T0T-e9FCL-gCskV-hwKN6-DE0xj"

let myHeadersApiPublic = new Headers();
myHeadersApiPublic.append("Accept", "application/json");

export { baseURL, myHeadersApiPublic };