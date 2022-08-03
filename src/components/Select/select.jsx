import { useDispatch, useSelector } from "react-redux";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../../store/actions/inputActions";
import "./select.css";

export function Select(props) {
    const className = `${props.className} select`;
    const dispatch = useDispatch();
    const value = useSelector(store => store.input[props.id].scale);

    /* TODO: 
        * после получения списка топ10 крипты вручную задиспатчить шкалу топ крипты в store (задать дефолт)
        * написать функцию заполнения option-ми в завивимости от id (валютой либо по списку топ10 крипты)
    */

    function setScale(e) {
        switch (e.target.id) {
            case "cryptoInput":
                dispatch(setCryptoScaleAction(e.target.value));
                return;
            case "currencyInput":
                dispatch(setCurrencyScaleAction(e.target.value));
                return;
            default: return;
        }
    }

    return (
        <select className={className} value={value} name={props.id} id={props.id} onChange={(e) => setScale(e)}>
            {/* TODO: 
                *ВСЕ ТЕГИ OPTION ЗАДАНЫ ДЛЯ ТЕСТА. НАПИСАТЬ ФУНКЦИЮ АВТОЗАОПЛНЕНИЯ SELECT 
            */}
            <option className="select__option" value="BTC" defaultValue>Bitcoin (BTC)</option>
            <option className="select__option" value="ETH">ETHEREUM (ETH)</option>
            <option className="select__option" value="Sol">Solana (Sol)</option>
            <option className="select__option" value="BUSD">BUSD (BUSD)</option>
            <option className="select__option" value="USDT">Tether (USDT)</option>
        </select>
    );
}