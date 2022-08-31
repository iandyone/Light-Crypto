export const SET_COIN_PRICE = "SET_COIN_PRICE";
export const SET_COIN_OLD_PRICE = "SET_COIN_OLD_PRICE";

export const setCoinPriceAction = (payload) => ({ type: SET_COIN_PRICE, payload });
export const setCoinOldPriceAction = (payload) => ({ type: SET_COIN_OLD_PRICE, payload });