import axios from "axios";
import { setCoinsDataAction, setCryptosAction } from "../store/actions/coinsActions";
import { setCryptoScaleAction, setCurrencyScaleAction } from "../store/actions/inputActions";

async function getCoinsPrices(cryptosList, currencyList) {
    try {
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
    // При изменении cтобцов необходимо дополнить функцию форматирования данных getFormattedData в table.jsx для нового заголовка.

    const data = {};
    response.forEach((item, index) => {
        const coin = item.CoinInfo.Name;
        data[coin] = {};
        data[coin].id = item.CoinInfo.Id;
        data[coin].name = item.CoinInfo.Name;
        data[coin].fullName = item.CoinInfo.FullName;
        data[coin].image = item.CoinInfo.ImageUrl;
        data[coin].marketCapFull = item.RAW.USD.MKTCAP;
        data[coin].price = item.DISPLAY.USD.PRICE;
        data[coin].displayed = {};
        data[coin].displayed["#"] = index + 1;
        data[coin].displayed["Name"] = item.CoinInfo.FullName;
        data[coin].displayed["Price"] = item.DISPLAY.USD.PRICE;
        data[coin].displayed["1h %"] = item.RAW.USD.CHANGEPCTHOUR;
        data[coin].displayed["24h %"] = item.RAW.USD.CHANGEPCTDAY;
        data[coin].displayed["Median"] = item.RAW.USD.MEDIAN;
        data[coin].displayed["Market Cap"] = item.RAW.USD.MKTCAP;
        data[coin].displayed["Volume24h"] = item.RAW.USD.VOLUME24HOURTO;
        /* data[coin].displayed["Circulating Supply"] = item.RAW.USD.SUPPLY; */
    });
    return data;
}

export function getCoinsData(currencyList, refreshDataFlag = false) {
    return async function (dispatch) {
        try {
           /*  const dataURL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"; */
            const dataURL = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const request = await axios.get(dataURL);
            const response = await request.data.Data;                                       // полные данные, полученные от API
            const data = getFilteredCoinsData(response);
            const cryptosList = [];
            const cryptosData = {};

            for (let coin in data) {
                cryptosList.push(coin);                                                      // ['BTC', 'ETH', 'SOL', 'BUSD', 'BNB', 'USDT', 'USDC', 'XRP', 'ADA', 'EOS`]
                cryptosData[coin] = { name: coin, fullName: data[coin].fullName };           // {BTC: {name: "BTC", fullname: "Bitcoin"}, ...}
            }

            const priceList = await getCoinsPrices(cryptosList, currencyList);               // массив цен в разных валютах для каждой крипты

            for (let coin in data) {
                data[coin].prices = priceList[coin];
                data[coin].displayed.Price = priceList[coin].USD;
            }

            console.log(data);

            if (!refreshDataFlag) {
                dispatch(setCryptoScaleAction(Object.keys(data)[0]));
                dispatch(setCurrencyScaleAction(currencyList[Object.keys(currencyList)[0]].name));
            }

            /*        console.log(`old ${previousData.BTC.Price} - new: ${data.BTC.displayed.Price}`, ); */
            dispatch(setCryptosAction(cryptosData));
            dispatch(setCoinsDataAction(data));
        }
        catch (e) {
            console.log(e.message);
        }
    }
} 