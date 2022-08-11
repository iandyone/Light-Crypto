import { useDispatch } from "react-redux";
import { setActiveInputAction, setCurrentValueAction } from "../../store/actions/inputActions";
import "./input.css";

export function Input(props) {
    const dispatch = useDispatch();
    const placeholder = props.placeholder || "";
    const value = props.value;

    function setInputValue(e) {
        dispatch(setCurrentValueAction(e.target.value));
        if (e.target.id === "cryptoInput") {
            dispatch(setActiveInputAction("cryptoInput"))
        } else if (e.target.id === "currencyInput") {
            dispatch(setActiveInputAction("currencyInput"))
        }
    }

    return (
        <input className={`${props.className} input`} id={props.id} type="number" placeholder={placeholder} value={value} onChange={(e) => setInputValue(e)} />
    );
}