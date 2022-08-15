import { useSelector } from "react-redux";
import "./table.css";

export function Table(props) {
    const coinData = useSelector(store => store.coins.data);
    const displayedData = coinData[Object.keys(coinData)[0]]?.displayed;

    return (
        <table className={`${props.className} table`}>
            <thead className="table__head">
                <tr>
                    {displayedData && Object.keys(displayedData).map((item, index) => {
                        return <th key={index}>{item}</th>
                    })}
                </tr>
            </thead>
            <tbody className="table__body">
                {coinData && Object.keys(coinData).map((coin) => {
                    return (
                        <tr className="table__coin" key={coinData[coin].id}>{
                            Object.keys(displayedData).map((data, index) => {
                                return <td key={coinData[coin].displayed["#"] + index}>{coinData[coin].displayed[data]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}