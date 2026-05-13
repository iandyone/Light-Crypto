/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../Table/table";
import { Title } from "../Title/title";
import { setCoinOldPriceAction, setCoinPriceAction } from "../../store/actions/socketsActions";
import "./cryptocurrencies.css";

const apiKey = process.env.REACT_APP_CRYPTOCOMPARE_API_KEY;

export function Cryptocurrencies() {
    const dispatch = useDispatch();
    const cryptocurrencies = useSelector((store) => store.coins?.cryptocurrencies);

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
        const coins = cryptocurrencies || {};

        if (apiKey && Object.keys(coins).length) {
            const ccStreamer = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${apiKey}`);

            ccStreamer.onopen = function onStreamOpen() {
                const subLinks = getSocketSublinks(coins);
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
    }, [cryptocurrencies, dispatch])

    return (
        <article className="light-crypto__cryptocurrencies cryptocurrencies">
            <div className="cryptocurrencies__container container">
                <div className="cryptocurrencies__header">
                    <Title className={"cryptocurrencies__title"} content={"Top 10 Today's Cryptocurrencies"} />
                </div>
                <div className="cryptocurrencies__body">
                    <Table className={"cryptocurrencies__table"} />
                </div>
            </div>
        </article>
    );
}
