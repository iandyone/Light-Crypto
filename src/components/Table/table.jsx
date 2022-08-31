import { useSelector } from "react-redux";
import { getFormattedData } from "../../helpers/getFormattedData";
import { TableData } from "../TableData/tableData";
import "./table.css";

export function Table(props) {
    const coinsData = useSelector((store) => store.coins.data);
    const previousData = useSelector((store) => store.coins.previousData);
    const socketsData = useSelector((store) => store.sockets.socketsData);
    const previosSocketData = useSelector((store) => store.sockets.previosSocketData);  
    const coinsList = Object.keys(coinsData);                                           
    const displayedData = coinsData[Object.keys(coinsData)[0]]?.displayed;              
    const tableHeaders = (displayedData) ? Object.keys(displayedData) : [];             

    function getDataClasses(coinName, header) {
        const socketPrice = socketsData[coinName];
        const oldSocketPrice = previosSocketData[coinName];
        const dataPrice = coinsData[coinName]?.displayed[header];
        const oldDataPrice = previousData[coinName]?.displayed[header];
    
        const newPrice = (header === "Price") ? socketPrice || dataPrice : dataPrice;
        const oldPrice = (header === "Price") ? oldSocketPrice || oldDataPrice : oldDataPrice;

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
                            <TableData key={coinID + index} className="table__data-id">
                                <span>{rowIndex + 1}</span>
                            </TableData>
                        );
                    } else if (header === "Name") {
                        return (
                            <TableData key={coinID + index} className="table__title table__data-name">
                                <img className="table__coin-icon" src={`${rootURL + coinsData[coinName].image}`} alt={`${coinName} icon`} />
                                {coinInfo[header]}
                                <span>{coinName}</span>
                            </TableData>
                        );
                    } else if (header === "Price") {
                        const price = socketsData[coinName] || coinInfo[header];
                        return (
                            <TableData className={getDataClasses(coinName, header)} key={coinID + index}>
                                <span>{getFormattedData(header, price)}</span>
                            </TableData>
                        );
                    }

                    return (
                        <TableData key={coinID + index} header={header} className={getDataClasses(coinName, header)}>
                            <span>{getFormattedData(header, coinInfo[header])}</span>
                        </TableData>
                    );
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