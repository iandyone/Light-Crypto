import { useEffect } from "react";
import { useState } from "react";
import "./tableData.css";

export function TableData(props) {
    const baseClassName = "table__data";
    const [className, setClassName] = useState(baseClassName);

    useEffect(() => {
        if (props.className) {
            setClassName(`${baseClassName} ${props.className}`);
        }
    }, [props.className])

    return (
        <td className={className} key={props.key}>{props.children}</td>
    );
}