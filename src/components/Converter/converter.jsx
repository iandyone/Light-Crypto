import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinsData } from "../../helpers/getCoinsData";
import { setPreviousCoinsDataAction } from "../../store/actions/coinsActions";
import { Button } from "../Button/button";
import { SwitchButton } from "../SwitchButton/switchButton";
import { Title } from "../Title/title";
import { UserInput } from "../UserInput/userInput";
import "./converter.css";

export function Converter() {
    const currencyList = useSelector(store => store.coins.currencies);
    const dispatch = useDispatch();
    const refreshDataFlag = true;

    function refreshCryptoPrices(e) {
        e.preventDefault();
        dispatch(setPreviousCoinsDataAction());
        dispatch(getCoinsData(currencyList, refreshDataFlag));
    }
    
    useEffect(() => {
        setInterval(() => {
            dispatch(setPreviousCoinsDataAction());
            dispatch(getCoinsData(currencyList, refreshDataFlag));
        }, 20000);
    })

    return (
        <section className="light-crypto__converter converter">
            <div className="converter__container container">
                <div className="converter__header">
                    <Title className={"converter__title"} content={"💎 Cryptocurrency Converter"} />
                    <Button className={"converter__button"} content={"refresh"} onClick={(e) => refreshCryptoPrices(e)} />
                </div>
                <form className="converter__body">
                    <UserInput className={"converter__user-input"} id={"cryptoInput"} inputClassName={"converter__input"} selectClassName={"converter__select"} placeholder={"Enter amound"} />
                    <SwitchButton className={"converter__switch-button"} />
                    <UserInput className={"converter__user-input"} id={"currencyInput"} inputClassName={"converter__input"} selectClassName={"converter__select"} placeholder={"Enter amound"} />
                    <Button className={"converter__button"} content={"refresh"} onClick={(e) => refreshCryptoPrices(e)} />
                </form>
            </div>
        </section>
    );
}