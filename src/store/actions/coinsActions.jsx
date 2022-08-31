export const SET_COINS_DATA = "SET_COINS_DATA";
export const SET_PREVIOUS_COINS_DATA = "SET_PREVIOUS_COINS_DATA";
export const SET_CRYPTOS = "SET_CRYPTOS";

export const setCoinsDataAction = (payload) => ({ type: SET_COINS_DATA, payload });
export const setCryptosAction = (payload) => ({ type: SET_CRYPTOS, payload });
export const setPreviousCoinsDataAction = () => ({ type: SET_PREVIOUS_COINS_DATA });