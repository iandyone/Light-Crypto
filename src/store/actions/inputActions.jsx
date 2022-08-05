export const SET_CRYPTO_VALUE = "SET_CRYPTO_VALUE";
export const SET_CRYPTO_SCALE =  "SET_CRYPTO_SCALE";
export const SET_CURRENCY_VALUE = "SET_CURRENCY_VALUE";
export const SET_CURRENCY_SCALE =  "SET_CURRENCY_SCALE";

export const setCryptoValueAction = (payload) => ({ type: SET_CRYPTO_VALUE, payload });
export const setCryptoScaleAction = (payload) => ({ type: SET_CRYPTO_SCALE, payload });
export const setCurrencyValueAction = (payload) => ({ type: SET_CURRENCY_VALUE, payload });
export const setCurrencyScaleAction = (payload) => ({ type: SET_CURRENCY_SCALE, payload });