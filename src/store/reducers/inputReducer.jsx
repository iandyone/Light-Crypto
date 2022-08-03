import { SET_CRYPTO_SCALE, SET_CRYPTO_VALUE, SET_CURRENCY_SCALE, SET_CURRENCY_VALUE } from "../actions/inputActions"

const initialState = {
    cryptoInput: {
        value: "",
        scale: "BTC",
    },

    currencyInput: {
        value: "",
        scale: "USD",
    },

    activeInput: "",
}

export function inputReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CRYPTO_VALUE:
            return { ...state, cryptoInput: { ...state.cryptoInput, value: action.payload } };
        case SET_CURRENCY_VALUE:
            return { ...state, currencyInput: { ...state.currencyInput, value: action.payload } };
        case SET_CRYPTO_SCALE:
            return { ...state, cryptoInput: { ...state.cryptoInput, scale: action.payload } }
        case SET_CURRENCY_SCALE:
            return { ...state, currencyInput: { ...state.currencyInput, scale: action.payload } }
            
        default: return state
    }
}