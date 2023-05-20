export function getFormattedData(header, value) {
    switch (header) {
        case "Price":
            return (value > 1000) ? `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}` : `$${value}`;
        case "1h %":
        case "24h %":
            return `${(Math.ceil(value * 100) / 100).toFixed(2)}%`;
        case "Market Cap":
        case "Volume24h":
            return `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}`;
        case "Median":
            return (value > 1000) ? `$${new Intl.NumberFormat(["ban", "id"]).format(value.toFixed(2))}` : `$${value.toFixed(4)}`;
        default:
            return value;
    }
}