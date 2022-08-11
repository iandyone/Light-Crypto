import { SET_COINS_DATA } from "../actions/coinsActions";

const initialState = {
    data: {},
    currencies: {
        USD: { name: "USD", fullName: "United States Dollar" },
        EUR: { name: "EUR", fullName: "Euro" },
        RUB: { name: "RUB", fullName: "Russian Ruble" },
        BYN: { name: "BYN", fullName: "Belarussian Ruble" },
        UAH: { name: "UAH", fullName: "Ukrainian Hryvnia" },
        CNY: { name: "CNY", fullName: "Chinese Yuan" },
        GBP: { name: "GBP", fullName: "Pround Sterling" },
    }
}

export function coinReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COINS_DATA:
            return { ...state, data: action.payload };
        default: return state
    }
}