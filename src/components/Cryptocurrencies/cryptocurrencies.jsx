import { Button } from "../Button/button";
import { Table } from "../Table/table";
import { Title } from "../Title/title";
import "./cryptocurrencies.css"

export function Cryptocurrencies() {
    return (
        <article className="light-crypto__cryptocurrencies cryptocurrencies">
            <div className="cryptocurrencies__container container">
                <div className="cryptocurrencies__header">
                    <Title className={"cryptocurrencies__title"} content={"🔥 Top 10 Today's Cryptocurrencies"} />
                    <Button className={"cryptocurrencies__button"} content={"all coins"} />
                </div>
                <div className="cryptocurrencies__body">
                    <Table className={"cryptocurrencies__table"} />
                </div>
            </div>
        </article>
    );
}