import { useDispatch, useSelector } from "react-redux";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../../store/actions/inputActions";
import "./select.css";

export function Select(props) {
    const dispatch = useDispatch();
    const className = `${props.className} select`;
    const coinData = useSelector(store => store.coins.data)
    const currencyList = useSelector(store => store.coins.currencies);
    const options = getOptions(props.id);

    function getOptions(id) {
        const coinList = [];
        if (id === "cryptoInput") {
            for (let i in coinData) {
                coinList.push({ name: coinData[i].name, fullName: coinData[i].fullName })
            }
        } else if (id === "currencyInput") {
            for (let i in currencyList) {
                coinList.push({ name: currencyList[i].name, fullName: currencyList[i].fullName })
            }
        }
        return coinList;
    }

    function setScale(e) {
        if (e.target.id === "cryptoInput") {
            dispatch(setCryptoScaleAction(e.target.value));
        } else if (e.target.id === "currencyInput") {
            dispatch(setCurrencyScaleAction(e.target.value));
        }
    }

    return (
        <select className={className} name={props.id} id={props.id} onLoad={(e) => setScale(e)} onChange={(e) => setScale(e)}>
            {options.map((option, index) => {
                return <option className="select__option" key={index} value={option.name}>{option.fullName} ({option.name})</option>
            })}
        </select>
    );
}