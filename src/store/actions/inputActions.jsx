export const SET_CURRENT_VALUE = "SET_CURRENT_VALUE";
export const SET_CRYPTO_SCALE = "SET_CRYPTO_SCALE";
export const SET_CURRENCY_SCALE = "SET_CURRENCY_SCALE";
export const SET_ACTIVE_INPUT = "SET_ACTIVE_INPUT";

export const setCurrentValueAction = (payload) => ({ type: SET_CURRENT_VALUE, payload });
export const setCryptoScaleAction = (payload) => ({ type: SET_CRYPTO_SCALE, payload });
export const setCurrencyScaleAction = (payload) => ({ type: SET_CURRENCY_SCALE, payload });
export const setActiveInputAction = (payload) => ({ type: SET_ACTIVE_INPUT, payload });