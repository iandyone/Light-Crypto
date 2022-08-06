import { useDispatch, useSelector } from "react-redux";
import { setCurrentValueAction } from "../../store/actions/inputActions";
import "./input.css";

export function Input(props) {
    const className = `${props.className} input`;
    const dispatch = useDispatch();
    const value = useSelector(store => store.input.currentValue);
    const placeholder = props.placeholder || "";

    function setInputValue(e) {
        dispatch(setCurrentValueAction(e.target.value));
        console.log(e.target.value);
    }

    return (
        <input className={className} id={props.id} type="number" placeholder={placeholder} value={value} onChange={(e) => setInputValue(e)} />
    );
}