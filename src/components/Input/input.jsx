import { useDispatch, useSelector } from "react-redux";
import { setCryptoValueAction, setCurrencyValueAction } from "../../store/actions/inputActions";
import "./input.css";

export function Input(props) {
    const className = `${props.className} input`;
    const dispatch = useDispatch();
    const value = useSelector(store => store.input[props.id].value);

    function setInputValue(e) {
        switch (e.target.id) {
            case "cryptoInput":
                dispatch(setCryptoValueAction(e.target.value));
                return;
            case "currencyInput":
                dispatch(setCurrencyValueAction(e.target.value));
                return;
            default: return;
        }
    }

    return (
        <input className={className} id={props.id} type="number" placeholder="Enter amount" value={value} onChange={(e) => setInputValue(e)} />
    );
}