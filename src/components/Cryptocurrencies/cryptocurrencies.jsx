/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/button";
import { Table } from "../Table/table";
import { Title } from "../Title/title";
import { apiKey } from "../../keys";
import "./cryptocurrencies.css";
import { setCoinOldPriceAction, setCoinPriceAction } from "../../store/actions/socketsActions";

export function Cryptocurrencies() {
    const dispatch = useDispatch();
    const cryptocurrencies = useSelector(store => store.coins?.cryptocurrencies) || {};

    function getSocketSublinks(cryptocurrencies) {
        if (cryptocurrencies) {
            const coinSubLinks = [];

            for (let coin in cryptocurrencies) {
                coinSubLinks.push(`2~Coinbase~${coin}~USD`);
            }

            return coinSubLinks;
        }
    }

     useEffect(() => {
        if (cryptocurrencies) {
            const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);

            ccStreamer.onopen = function onStreamOpen() {
                const subLinks = getSocketSublinks(cryptocurrencies);
                const subRequest = {
                    "action": "SubAdd",
                    "subs": [...subLinks]
                };
                ccStreamer.send(JSON.stringify(subRequest));
            };

            ccStreamer.onmessage = function onStreamMessage() {
                const message = event.data;
                const json = JSON.parse(message)

                if (json.TYPE === "2") {
                    const coin = json.FROMSYMBOL;
                    const price = json.PRICE;
                    
                   /* console.log(json); */
                    if (price) {
                        dispatch(setCoinOldPriceAction(coin));
                        dispatch(setCoinPriceAction({ coin, price }));
                    }
                }
            };

            return (() => {
                ccStreamer.close();
            });
        }
    })

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