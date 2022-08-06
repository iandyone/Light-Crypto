import { useDispatch, useSelector } from "react-redux";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../../store/actions/inputActions";
import "./select.css";

export function Select(props) {
    const className = `${props.className} select`;
    const dispatch = useDispatch();
    const coinData = useSelector(store => store.coins.data)
    const currencyList = useSelector(store => store.coins.currencies);
    const options = getOptions(props.id);

    function getOptions(id) {
        const coinList = [];
        if (id === "cryptoInput") {
            for (let i in coinData) {
                coinList.push({ name: coinData[i].name, fullName: coinData[i].fullName })
            }
            dispatch(setCryptoScaleAction(Object.keys(coinData)[0]));
        } else if (id === "currencyInput") {
            const currencies = {
                USD: { name: "USD", fullName: "United States Dollar" },
                EUR: { name: "EUR", fullName: "Euro" },
                RUB: { name: "RUB", fullName: "Russian Ruble" },
                BYN: { name: "BYN", fullName: "Belarussian Ruble" },
                UAH: { name: "UAH", fullName: "Ukrainian Hryvnia" },
                CNY: { name: "CNY", fullName: "Chinese Yuan" },
                GBP: { name: "GBP", fullName: "Pround Sterling" },
            };

            currencyList.forEach((currency, index) => {
                if (!index) {
                    dispatch(setCurrencyScaleAction(currencies[currency].name));
                }
                coinList.push(currencies[currency]);
            });
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