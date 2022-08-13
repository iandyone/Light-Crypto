import { SET_ACTIVE_INPUT, SET_CRYPTO_SCALE, SET_CURRENCY_SCALE, SET_CURRENT_VALUE } from "../actions/inputActions"

const initialState = {
    currentValue: "",
    cryptoScale: "",
    currencyScale: "",
    activeInput: "",
}

export function inputReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_VALUE:
            return { ...state, currentValue: action.payload };
        case SET_CRYPTO_SCALE:
            return { ...state, cryptoScale: action.payload };
        case SET_CURRENCY_SCALE:
            return { ...state, currencyScale: action.payload };
        case SET_ACTIVE_INPUT:
            return { ...state, activeInput: action.payload };
        default: return state
    }
}