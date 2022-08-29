export const SET_COINS_DATA = "SET_COINS_DATA";
export const SET_PREVIOUS_DATA = "SET_PREVIOUS_DATA";
export const SET_CRYPTOS = "SET_CRYPTOS";

export const setCoinsDataAction = (payload) => ({ type: SET_COINS_DATA, payload });
export const setPreviousDataAction = () => ({ type: SET_PREVIOUS_DATA });
export const setCryptosAction = (payload) => ({ type: SET_CRYPTOS, payload });