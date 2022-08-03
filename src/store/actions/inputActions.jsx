/* export const SET_INPUT_VALUE = "SET_INPUT_VALUE";
export const SET_REQUEST_VALUE = "SET_REQUEST_VALUE";
export const RESET_INPUT = "RESET_INPUT";

export const setInputValueAction = (payload) => ({ type: SET_INPUT_VALUE, payload });
export const setRequestValueAction = (payload) => ({ type: SET_REQUEST_VALUE, payload });
export const resetInputAction = (payload) => ({ type: RESET_INPUT, payload }); */

export const SET_CRYPTO_VALUE = "SET_CRYPTO_VALUE";
export const SET_CRYPTO_SCALE =  "SET_CRYPTO_SCALE";
export const SET_CURRENCY_VALUE = "SET_CURRENCY_VALUE";
export const SET_CURRENCY_SCALE =  "SET_CURRENCY_SCALE";

export const setCryptoValueAction = (payload) => ({ type: SET_CRYPTO_VALUE, payload });
export const setCryptoScaleAction = (payload) => ({ type: SET_CRYPTO_SCALE, payload });
export const setCurrencyValueAction = (payload) => ({ type: SET_CURRENCY_VALUE, payload });
export const setCurrencyScaleAction = (payload) => ({ type: SET_CURRENCY_SCALE, payload });