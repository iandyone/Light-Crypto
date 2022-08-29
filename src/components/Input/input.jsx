import { useDispatch, useSelector } from "react-redux";
import { setActiveInputAction, setCurrentValueAction } from "../../store/actions/inputActions";
import "./input.css";

export function Input(props) {
    const dispatch = useDispatch();
    const cryptoScale = useSelector(store => store.input.cryptoScale);
    const currencyScale = useSelector(store => store.input.currencyScale);
    const activeInput = useSelector(store => store.input.activeInput)
    const coinsData = useSelector(store => store.coins.data);
    const currentValue = useSelector(store => store.input.currentValue);
    const socketPrices = useSelector(store => store.sockets.socketsData);
    const calcValue = getCalculatedValue() || "";

    function setInputValue(e) {
        dispatch(setCurrentValueAction(e.target.value));
        
        if (e.target.id === "cryptoInput") {
            dispatch(setActiveInputAction("cryptoInput"));
        } else if (e.target.id === "currencyInput") {
            dispatch(setActiveInputAction("currencyInput"));
        }
    }

    function getCalculatedValue() {
        const socketValue = socketPrices[cryptoScale];
        const value = coinsData[cryptoScale]?.prices[currencyScale];
        const calculatedValue = (currencyScale === "USD") ? socketValue || value : value;

        if (activeInput === props.id) {
            return currentValue;
        } else if (props.id === "cryptoInput") {
            return currentValue / calculatedValue;
        } else if (props.id === "currencyInput") {
            return currentValue * calculatedValue;
        } 
    }

    return (
        <input className={`${props.className} input`} id={props.id} type="number" placeholder={props.placeholder} value={calcValue} onChange={(e) => setInputValue(e)} />
    );
}


