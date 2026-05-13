import axios from "axios";
import { setCoinsDataAction, setCoinsErrorAction, setCoinsLoadingAction, setCryptosAction } from "../store/actions/coinsActions";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../store/actions/inputActions";

async function getCoinsPrices(cryptosList, currencyList) {
    try {
        if (!cryptosList.length) {
            return {};
        }

        const coins = cryptosList.join(",");
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
    // Вычисляемые свойства объекта displayed используются для создания столбцов таблицы. 
    // При изменении cтобцов необходимо дополнить функцию форматирования данных getFormattedData для нового заголовка.

    const data = {};
    let displayedIndex = 1;

    if (!Array.isArray(response)) {
        return data;
    }

    response.forEach((item) => {
        const coin = item.CoinInfo?.Name;
        const rawUsd = item.RAW?.USD;
        const displayUsd = item.DISPLAY?.USD;

        if (!coin || !rawUsd || !displayUsd) {
            return;
        }

        data[coin] = {};
        data[coin].id = item.CoinInfo.Id;
        data[coin].name = item.CoinInfo.Name;
        data[coin].fullName = item.CoinInfo.FullName;
        data[coin].image = item.CoinInfo.ImageUrl;
        data[coin].marketCapFull = rawUsd.MKTCAP;
        data[coin].price = rawUsd.PRICE;
        data[coin].displayed = {};
        data[coin].displayed["#"] = displayedIndex;
        data[coin].displayed["Name"] = item.CoinInfo.FullName;
        data[coin].displayed["Price"] = rawUsd.PRICE;
        data[coin].displayed["1h %"] = rawUsd.CHANGEPCTHOUR;
        data[coin].displayed["24h %"] = rawUsd.CHANGEPCTDAY;
        data[coin].displayed["Median"] = rawUsd.MEDIAN;
        data[coin].displayed["Market Cap"] = rawUsd.MKTCAP;
        data[coin].displayed["Volume24h"] = rawUsd.VOLUME24HOURTO;

        displayedIndex += 1;
    });
    return data;
}

function getCryptosData(data) {
    const cryptosList = [];
    const cryptosData = {};

    for (let coin in data) {
        cryptosList.push(coin);                                                      // ['BTC', 'ETH', 'SOL', 'BUSD', 'BNB', 'USDT', 'USDC', 'XRP', 'ADA', 'EOS`]
        cryptosData[coin] = { name: coin, fullName: data[coin].fullName };           // {BTC: {name: "BTC", fullname: "Bitcoin"}, ...}
    }

    return { cryptosList, cryptosData };
}

function addPricesToCoinsData(data, priceList) {
    for (let coin in data) {
        data[coin].prices = {
            USD: data[coin].displayed.Price,
            ...priceList?.[coin],
        };
        data[coin].displayed.Price = data[coin].prices.USD;
    }

    return data;
}

function sortCoinsDataByPrice(data) {
    return Object.entries(data)
        .sort(([, firstCoinData], [, secondCoinData]) => secondCoinData.displayed.Price - firstCoinData.displayed.Price)
        .reduce((sortedData, [coin, coinData], index) => {
            sortedData[coin] = {
                ...coinData,
                displayed: {
                    ...coinData.displayed,
                    "#": index + 1,
                },
            };

            return sortedData;
        }, {});
}

export function getCoinsData(currencyList, refreshDataFlag = false) {
    return async function (dispatch) {
        try {
            dispatch(setCoinsLoadingAction(true));
            dispatch(setCoinsErrorAction(""));

            const dataURL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";
            const request = await axios.get(dataURL);
            const response = await request.data.Data;                                       // полные данные, полученные от API
            const data = getFilteredCoinsData(response);
            const { cryptosList } = getCryptosData(data);

            const priceList = await getCoinsPrices(cryptosList, currencyList);               
            addPricesToCoinsData(data, priceList);
            const sortedData = sortCoinsDataByPrice(data);
            const { cryptosData } = getCryptosData(sortedData);

            if (!Object.keys(sortedData).length) {
                dispatch(setCoinsErrorAction("No data available"));
                return;
            }

            if (!refreshDataFlag) {
                dispatch(setCryptoScaleAction(Object.keys(sortedData)[0]));
                dispatch(setCurrencyScaleAction(currencyList[Object.keys(currencyList)[0]].name));
            }

            dispatch(setCryptosAction(cryptosData));
            dispatch(setCoinsDataAction(sortedData));
        }
        catch (e) {
            console.log(e.message);
            dispatch(setCoinsErrorAction("Failed to load data"));
        }
        finally {
            dispatch(setCoinsLoadingAction(false));
        }
    }
} 
