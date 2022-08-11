import { Fragment } from "react";
import { Input } from "../Input/input";
import { Select } from "../Select/select";
import { useSelector } from "react-redux";
import "./userInput.css";

export function UserInput(props) {
    const cryptoScale = useSelector(store => store.input.cryptoScale);
    const currencyScale = useSelector(store => store.input.currencyScale);
    const activeInput = useSelector(store => store.input.activeInput)
    const coinsData = useSelector(store => store.coins.data);
    const currentValue = useSelector(store => store.input.currentValue);
    const calcValue = getCalculatedValue() || "";

    function getCalculatedValue() {
        if (activeInput === props.id) {
            return currentValue;
        } else if (props.id === "cryptoInput") {
            return currentValue / coinsData[cryptoScale]?.prices[currencyScale];
        } else if (props.id === "currencyInput") {
            return currentValue * coinsData[cryptoScale]?.prices[currencyScale];
        }
    }

    return (
        <Fragment>
            <div className={`${props.className} user-input`}>
                <Select className={props.selectClassName} id={props.id} />
                <Input className={props.inputClassName} id={props.id} placeholder={props.placeholder} value={calcValue} />
            </div>
        </Fragment>
    );
}