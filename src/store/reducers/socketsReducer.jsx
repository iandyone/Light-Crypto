import { SET_COIN_PRICE } from "../actions/socketsActions";

const initialState = {
    socketsData: {},
    previosSocketData: {},
}

export function socketsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COIN_PRICE:
            return { ...state, socketsData: { ...state.socketsData, [action.payload.coin]: action.payload.price }};
            //  return { ...state, socketsData: { ...state.socketsData, [action.payload.coin]: {...[state.socketsData.coin]}, [action.payload.currency]: [action.payload.price] }};
           /*  case SET_COIN_OLD_PRICE:
                return {...state, previosSocketData: state.socketsData }; */
        
        default: return state
    }
}