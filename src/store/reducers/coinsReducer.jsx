import { SET_COINS_DATA } from "../actions/coinsActions";

const initialState = {
    data: {},
    currencies: ["USD", "EUR", "RUB", "BYN", "UAH", "CNY", "GBP"],
}

export function coinReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COINS_DATA:
            return { ...state, data: action.payload };
        default: return state
    }
}