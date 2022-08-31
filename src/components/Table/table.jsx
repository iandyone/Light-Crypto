import { useSelector } from "react-redux";
import { getFormattedData } from "../../helpers/getFormattedData";
import { TableData } from "../TableData/tableData";
import "./table.css";

export function Table(props) {
    const coinsData = useSelector(store => store.coins.data);
    const previousData = useSelector(store => store.coins.previousData);
    const socketsData = useSelector(store => store.sockets.socketsData);
    const previosSocketData = useSelector(store => store.sockets.previosSocketData);    // Отфильтрованые даныне о крипте, полученные через API
    const coinsList = Object.keys(coinsData);                                           // Аббревиатуры отображаемых в таблице валют
    const displayedData = coinsData[Object.keys(coinsData)[0]]?.displayed;              // Отображаемые данные (заголовок - свойство) 
    const tableHeaders = (displayedData) ? Object.keys(displayedData) : [];             // Массив заголовков таблицы

    function getUpdatedDataClasses(coinName, header = "") {
        const oldSocketPrice = previosSocketData[coinName];
        const newSocketPrice = socketsData[coinName];
        const newPrice = coinsData[coinName]?.displayed[header];
        const oldPrice = previousData[coinName]?.displayed[header];

        if (!header) {
            if (newSocketPrice > oldSocketPrice) {
                return `table__data-up`;
            } else if (newSocketPrice < oldSocketPrice) {
                return `table__data-down`;
            }
        }

        if (newPrice > oldPrice) {
            return `table__data-up`;
        } else if (newPrice < oldPrice) {
            return `table__data-down`;
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
                        return (
                            <TableData key={coinID + index}>
                                <span>{rowIndex + 1}</span>
                            </TableData>
                        )
                    } else if (header === "Name") {
                        return (
                            <TableData key={coinID + index} className="table__title">
                                <img className="table__coin-icon" src={`${rootURL}${coinsData[coinName].image}`} alt={`${coinName} icon`} />
                                {coinInfo[header]}
                                <span>{coinName}</span>
                            </TableData>
                        )
                    } else if (header === "Price") {
                        const price = socketsData[coinName] || coinInfo[header];
                        return (
                            <TableData className={getUpdatedDataClasses(coinName)} key={coinID + index}>
                                <span>{getFormattedData(header, price, coinName)}</span>
                            </TableData>
                        )
                    }

                    return (
                        <TableData key={coinID + index} header={header} className={getUpdatedDataClasses(coinName, header)}>
                            <span>{getFormattedData(header, coinInfo[header], coinName)}</span>
                        </TableData>
                    )
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