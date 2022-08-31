import { useDispatch, useSelector } from "react-redux";
import { setActiveInputAction, setCurrentValueAction } from "../../store/actions/inputActions";
import "./input.css";

export function Input(props) {
    const dispatch = useDispatch();
    const cryptoScale = useSelector((store) => store.input.cryptoScale);
    const currencyScale = useSelector((store) => store.input.currencyScale);
    const activeInput = useSelector((store) => store.input.activeInput)
    const coinsData = useSelector((store) => store.coins.data);
    const currentValue = useSelector((store) => store.input.currentValue);
    const socketPrices = useSelector((store) => store.sockets.socketsData);
    const displayedValue = getDisplayedValue(currentValue, currencyScale) || "";

    function setInputValue(e) {
        dispatch(setCurrentValueAction(e.target.value));

        if (e.target.id === "cryptoInput") {
            dispatch(setActiveInputAction("cryptoInput"));
        } else if (e.target.id === "currencyInput") {
            dispatch(setActiveInputAction("currencyInput"));
        }
    }

    function getFormattedValue(value) {
        if (value % 1 === 0) {
            return value
        } else if (value < 1) {
            return Math.floor(value * 10000000000) / 10000000000;
        } else {
            return Math.floor(value * 100000) / 100000;
        }
    }

    function getDisplayedValue(currentValue, currencyScale) {
        const socketPrice = socketPrices[cryptoScale];
        const dataPrice = coinsData[cryptoScale]?.prices[currencyScale];
        const currentPrice = (currencyScale === "USD") ? socketPrice || dataPrice : dataPrice;

        if (activeInput === props.id) {
            return getFormattedValue(currentValue);
        } else if (props.id === "cryptoInput") {
            return getFormattedValue(currentValue / currentPrice);
        } else if (props.id === "currencyInput") {
            return getFormattedValue(currentValue * currentPrice);
        }
    }

    return <input className={`${props.className} input`} id={props.id} type="number" placeholder={props.placeholder} value={displayedValue} onChange={(e) => setInputValue(e)} />;
}


