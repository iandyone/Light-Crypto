import { useSelector } from "react-redux";
/* import { numFormatter } from "../../helpers/numFormatter"; */
import "./table.css";

export function Table(props) {
    const coinsData = useSelector(store => store.coins.data);                        // Отфильтрованые даныне о крипте, полученные через API
    const coinsList = Object.keys(coinsData)                                         // Аббревиатуры отображаемых в таблице валют
    const displayedData = coinsData[Object.keys(coinsData)[0]]?.displayed;           // Отображаемые данные (заголовок - свойство) 
    const tableHeaders = (displayedData) ? Object.keys(displayedData) : [];          // Массив заголовков таблицы

    function getTableContent(coinName, rowIndex) {
        const coinID = coinsData[coinName].id;
        const coinInfo = coinsData[coinName].displayed;
        const rootURL = "https://www.cryptocompare.com";

        return (
            <tr className="table__coin" key={coinID}>
                {tableHeaders.map((header, index) => {
                    if (header === "#") {
                        /* return <td key={coinID + index}><span>{coinInfo[header]}</span></td> */
                        return <td key={coinID + index}><span>{rowIndex + 1}</span></td>
                    } else if (header === "Name") {
                        return (
                            <td key={coinID + index} className="table__title">
                                <img className="table__coin-icon" src={`${rootURL}${coinsData[coinName].image}`} alt="coin icon" />
                                {coinInfo[header]}
                                <span>{coinName}</span>
                            </td>
                        )
                    }
                    return <td key={coinID + index}>{getFormattedValue(header, coinInfo[header], coinName)}</td>
                })}
            </tr>
        )
    }

    function getFormattedValue(header, value, coinName) {
        switch (header) {
            case "Price":
                return (value > 1000) ? `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}` : `$${value}`;

            case "1h %":
            case "24h %":
                return `${Math.ceil(value * 100) / 100}%`;

            case "Market Cap":
            case "Volume24h":
                return `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}`;

            case "Circulating Supply":
                return `${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))} ${coinName}`;

            default:
                return value;
        }
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