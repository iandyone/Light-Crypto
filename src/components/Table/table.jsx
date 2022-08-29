import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPreviousDataAction } from "../../store/actions/coinsActions";
import "./table.css";

export function Table(props) {
    const coinsData = useSelector(store => store.coins.data);
    const prev = useSelector(store => store.coins.previousData);
    
    const socketsData = useSelector(store => store.sockets.socketsData) || [];
    // const previousData = useSelector(store => store.coins.previousData);            // Отфильтрованые даныне о крипте, полученные через API
    const coinsList = Object.keys(coinsData);                                        // Аббревиатуры отображаемых в таблице валют
    const displayedData = coinsData[Object.keys(coinsData)[0]]?.displayed;           // Отображаемые данные (заголовок - свойство) 
    const tableHeaders = (displayedData) ? Object.keys(displayedData) : [];          // Массив заголовков таблицы


    useEffect(() => {
        /* console.log(`prev: ${prev.BTC.displayed.Price} - new: ${coinsData.BTC.displayed.Price}`); */
        console.log(prev.BTC?.displayed.Price === coinsData.BTC?.displayed.Price);
    })


    /* function getUpdatedDataClasses(header, coinInfo, coinName) {
        const updatedDataHeaders = new Set(["Price", "1h %", "24h %", "Median", "Market Cap", "Volume24h"]);
        const oldData = previousData[coinName];
        //console.log(`${coinName}: ${oldData.Price} => ${coinInfo.Price}`);

        if (previousData && updatedDataHeaders.has(header)) {
            if (coinInfo[header] > oldData[header]) {
                console.log(`${previousData[coinName]?.displayed.Price} => ${coinName}: ${coinInfo.Price}`);
                return `table__data-up`;
            } else if (coinInfo[header] < oldData) {
                return `table__data-down`;
            }
        }
    } */

    function getFormattedData(header, value, coinName) {
        switch (header) {
            case "Price": return (value > 1000) ? `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}` : `$${value}`;

            case "1h %":
            case "24h %": return `${(Math.ceil(value * 100) / 100).toFixed(2)}%`;

            case "Market Cap":
            case "Volume24h":
                return `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}`;
            /* return `$ ${formatValue(value)}`; */

            case "Median":
                return `${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))} ${coinName}`;
            /*   return `$ ${formatValue(value)} ${coinName}`; */

            default:
                return value;
        }
    }

    function getTableContent(coinName, rowIndex) {
        const coinID = coinsData[coinName].id;
        const coinInfo = coinsData[coinName].displayed;
        const rootURL = "https://www.cryptocompare.com";

        return (
            <tr className="table__coin" key={coinID}>
                {tableHeaders.map((header, index) => {
                    if (header === "#") {
                        return <td key={coinID + index}><span>{rowIndex + 1}</span></td>
                    } else if (header === "Name") {
                        return (
                            <td key={coinID + index} className="table__title">
                                <img className="table__coin-icon" src={`${rootURL}${coinsData[coinName].image}`} alt={`${coinName} icon`} />
                                {coinInfo[header]}
                                <span>{coinName}</span>
                            </td>
                        )
                    } else if (header === "Price") {
                        const price = socketsData[coinName] || coinInfo[header];
                        return <td className={`table__data table__data-up`} key={coinID + index}><span>{getFormattedData(header, price, coinName)}</span></td>
                    }
                    /*  return <td className={getUpdatedDataClasses(header, coinInfo, coinName)} key={coinID + index}><span>{getFormattedData(header, coinInfo[header], coinName)}</span></td> */
                    return <td className={`table__data`} key={coinID + index}><span>{getFormattedData(header, coinInfo[header], coinName)}</span></td>
                })}
            </tr>
        )
    }

    return (
        <table className={`${props.className} table`}>
            <thead className="table__head">
                <tr className="table__headers">
                    {displayedData && tableHeaders.map((header) => {
                        return <th className="table__title" key={header}>{header}</th>
                    })}
                </tr>
            </thead>
            <tbody className="table__body">
                {coinsData && coinsList.map((coinName, rowIndex) => {
                    return getTableContent(coinName, rowIndex);
                })}
            </tbody>
        </table>
    );
}