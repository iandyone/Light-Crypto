import { SET_COINS_DATA, SET_COINS_ERROR, SET_COINS_LOADING, SET_CRYPTOS, SET_PREVIOUS_COINS_DATA, } from "../actions/coinsActions";

const initialState = {
    data: {},
    previousData: {},
    cryptocurrencies: {},
    isLoading: false,
    error: "",
    currencies: {
        USD: { name: "USD", fullName: "United States Dollar" },
        EUR: { name: "EUR", fullName: "Euro" },
        GBP: { name: "GBP", fullName: "Pound Sterling" },
        CHF: { name: "CHF", fullName: "Swiss Franc" },
        AUD: { name: "AUD", fullName: "Australian Dollar" },
        JPY: { name: "JPY", fullName: "Japanese Yen" },
        CNY: { name: "CNY", fullName: "Chinese Yuan" },
        PLN: { name: "PLN", fullName: "Polish Zloty" },
        UAH: { name: "UAH", fullName: "Ukrainian Hryvnia" },
        BYN: { name: "BYN", fullName: "Belarusian Ruble" },
    }
}

export function coinReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COINS_DATA:
            return { ...state, data: action.payload };
        case SET_CRYPTOS:
            return { ...state, cryptocurrencies: action.payload };
        case SET_PREVIOUS_COINS_DATA:
            return { ...state, previousData: state.data };
        case SET_COINS_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_COINS_ERROR:
            return { ...state, error: action.payload };
        default: return state
    }
}
