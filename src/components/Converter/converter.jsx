import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinsData } from "../../helpers/getCoinsData";
import { setPreviousCoinsDataAction } from "../../store/actions/coinsActions";
import { Button } from "../Button/button";
import { Title } from "../Title/title";
import { UserInput } from "../UserInput/userInput";
import "./converter.css";

export function Converter() {
    const currencyList = useSelector((store) => store.coins.currencies);
    const dispatch = useDispatch();
    const [refreshStatus, setRefreshStatus] = useState("");
    const [timerKey, setTimerKey] = useState(0);
    const [isIconRotating, setIsIconRotating] = useState(false);

    const refreshCryptoPrices = useCallback((showStatus = false) => {
        if (showStatus) {
            setRefreshStatus("updating");
        }

        setIsIconRotating(true);
        setTimerKey((currentTimerKey) => currentTimerKey + 1);
        dispatch(setPreviousCoinsDataAction());
        dispatch(getCoinsData(currencyList, true));
    }, [currencyList, dispatch]);

    function handleRefreshClick(e) {
        e.preventDefault();
        refreshCryptoPrices(true);
    }

    function getRefreshButtonText() {
        if (refreshStatus === "updating") {
            return "updating";
        }

        if (refreshStatus === "updated") {
            return "updated";
        }

        return "refresh";
    }

    function getRefreshButtonClassName() {
        const statusClassName = `converter__button_${refreshStatus || "idle"}`;
        const rotatingClassName = isIconRotating ? "converter__button_rotating" : "";

        return `converter__button ${statusClassName} ${rotatingClassName}`;
    }
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (document.hidden) {
                return;
            }

            refreshCryptoPrices();
        }, 20000);

        return () => clearInterval(intervalId);
    }, [refreshCryptoPrices, timerKey])

    useEffect(() => {
        if (!isIconRotating) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setIsIconRotating(false);
        }, 1600);

        return () => clearTimeout(timeoutId);
    }, [isIconRotating, timerKey])

    useEffect(() => {
        if (refreshStatus !== "updating") {
            return;
        }

        const timeoutId = setTimeout(() => {
            setRefreshStatus("updated");
        }, 700);

        return () => clearTimeout(timeoutId);
    }, [refreshStatus])

    useEffect(() => {
        if (refreshStatus !== "updated") {
            return;
        }

        const timeoutId = setTimeout(() => {
            setRefreshStatus("");
        }, 1200);

        return () => clearTimeout(timeoutId);
    }, [refreshStatus])

    return (
        <section className="light-crypto__converter converter">
            <div className="converter__container container">
                <div className="converter__header">
                    <Title className={"converter__title"} content={"Cryptocurrency Converter"} />
                    <Button key={`header-${timerKey}`} className={getRefreshButtonClassName()} content={getRefreshButtonText()} onClick={(e) => handleRefreshClick(e)} />
                </div>
                <form className="converter__body">
                    <UserInput className={"converter__user-input"} id={"cryptoInput"} inputClassName={"converter__input"} selectClassName={"converter__select"} placeholder={"Enter amount"} />
                    <UserInput className={"converter__user-input"} id={"currencyInput"} inputClassName={"converter__input"} selectClassName={"converter__select"} placeholder={"Enter amount"} />
                    <Button key={`body-${timerKey}`} className={getRefreshButtonClassName()} content={getRefreshButtonText()} onClick={(e) => handleRefreshClick(e)} />
                </form>
            </div>
        </section>
    );
}
