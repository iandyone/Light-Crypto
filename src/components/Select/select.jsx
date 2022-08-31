import { useDispatch, useSelector } from "react-redux";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../../store/actions/inputActions";
import "./select.css";

export function Select(props) {
    const dispatch = useDispatch();
    const coinData = useSelector((store) => store.coins.cryptocurrencies);
    const currencyList = useSelector((store) => store.coins.currencies);
    const options = getOptions(props.id);

    function getOptions(id) {
        const coinList = [];

        if (id === "cryptoInput") {
            for (let coin in coinData) {
                coinList.push({ name: coinData[coin].name, fullName: coinData[coin].fullName })
            }
        } else if (id === "currencyInput") {
            for (let currency in currencyList) {
                coinList.push({ name: currencyList[currency].name, fullName: currencyList[currency].fullName })
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
        <select className={`${props.className} select`} name={props.id} id={props.id} onLoad={(e) => setScale(e)} onChange={(e) => setScale(e)}>
            {options.map((option) => {
                return <option className="select__option" key={option.name} value={option.name}>{option.fullName} ({option.name})</option>
            })}
        </select>
    );
}