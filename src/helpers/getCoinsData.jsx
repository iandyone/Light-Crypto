import axios from "axios";
import { setCoinsDataAction } from "../store/actions/coinsActions";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../store/actions/inputActions";

async function getCoinsPrices(coinsList, currencyList) {
    try {
        const coins = coinsList.join(",");
        const currencies = Object.keys(currencyList);
        const pricesURL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins}&tsyms=${currencies}`;
        const prices = await axios.get(pricesURL);
        return prices.data;
    }
    catch (e) {
        console.log(e.message);
    }
}

function getFilteredCoinsData(response) {
    const data = {};
    response.forEach(item => {
        const coin = item.CoinInfo.Name;
        data[coin] = {};
        data[coin].id = item.CoinInfo.Id;
        data[coin].name = item.CoinInfo.Name;
        data[coin].fullName = item.CoinInfo.FullName;
        data[coin].image = item.CoinInfo.ImageUrl;
        data[coin].changeHour = item.DISPLAY.USD.CHANGEHOUR;
        data[coin].changeDay = item.DISPLAY.USD.CHANGEDAY;
        data[coin].supply = item.DISPLAY.USD.SUPPLY;
        data[coin].marketCap = item.DISPLAY.USD.MKTCAP;
        data[coin].marketCapFull = item.RAW.USD.MKTCAP;
    });
    return data;
}

export function getCoinsData(currencyList, refreshDataFlag = false) {
    return async function (dispatch) {
        try {
            const dataURL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
            const request = await axios.get(dataURL);
            const response = await request.data.Data;
            const data = getFilteredCoinsData(response);
            const coinsList = [];

            for (let i in data) {
                coinsList.push(i)
            }

            const priceList = await getCoinsPrices(coinsList, currencyList);

            for (let i in data) {
                data[i].prices = priceList[i];
            }

            console.log(data);
            if (!refreshDataFlag) {
                dispatch(setCryptoScaleAction(Object.keys(data)[0]));
                dispatch(setCurrencyScaleAction(currencyList[Object.keys(currencyList)[0]].name))
            }
            dispatch(setCoinsDataAction(data));
        }
        catch (e) {
            console.log(e.message);
        }
    }
} 