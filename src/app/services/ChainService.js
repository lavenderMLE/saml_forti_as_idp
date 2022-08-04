
import axios from "axios";
import apiConfig from '../static/Constant' ;
import { isset } from "../utils/Helper";

export const CurrencyRates = async (symbol) => {
    try {
        let res = await axios.get(`${apiConfig.PUBLIC_COINBASE_API}exchange-rates?currency=${symbol}`) ;

        return res.data.data.rates ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const CoinGecko = async (symbol, pair) => {
    try {
      
      let coinList = await axios.get(`${apiConfig.PUBLIC_COINGECKO_API}list`);
      let filter = coinList.data.filter(list => list.symbol === symbol.toLowerCase());
      
      if(filter.length === 0)
        return false;
      let filter_id = filter[0].id;
      console.log(filter_id);
      filter = await axios.get(`${apiConfig.PUBLIC_COINGECKO_API}${filter_id}/tickers`);

      if(filter.length === 0)
        return false;

      let ticker = filter.data.tickers.filter(list => list.base === symbol && list.target === pair || (list.base === pair && list.target === symbol));
      
      return ticker;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const CurrencyList = async () => {
    try {
        let res = await axios.get(`${apiConfig.PUBLIC_POLONIEX_API}command=returnCurrencies`) ;

        return res.data ;
    } catch(err) {
        return false ;
    }
}

export const PairInfoList = async () => {
    try {
        let res = await axios.get(`${apiConfig.PUBLIC_POLONIEX_API}command=returnTicker`) ;

        return res.data ;
    } catch(err) {
        return false ;
    }
}

export const OrderList = async (pair) => {
    try {
        let res = await axios.get(`${apiConfig.PUBLIC_POLONIEX_API}command=returnOrderBook&currencyPair=${pair}&depth=50`) ;

        
        if(isset(res.data.error)) return false ;

        return res.data ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}

export const MarketTradeHistory = async (pair) => {
    try {
        let res = await axios.get(`${apiConfig.PUBLIC_POLONIEX_API}currencyPair=${pair}&command=returnTradeHistory`) ;

        if(isset( res.data.error)) return false ;
        return res.data ;
    } catch(err) {
        console.log(err);
        return false ;
    }
} 

export const NowPayment = async (amount, unit, user_id, order_id) => {
    try {

        let res = await axios.post(`${apiConfig.PAYMENT_API}` , {
            price_amount : amount,
            price_currency : unit,
            order_id : "FiatDeposit-" + user_id + "-" + order_id,
            order_description : 'CALAHEX Deposit Fiat 2022 x 1',
            ipn_callback_url : 'https://nowpayments.io',
            success_url: "https://nowpayments.io",
            cancel_url: "https://nowpayments.io"
        } , {
            headers :{
                'x-api-key' : 'S7NVMMP-T7VMSG5-JKYV2WW-RP2V62N',
                'Content-Type' : 'application/json'
            }
        });

        console.log(res.data.invoice_url);
        return res.data.invoice_url;
    } catch(err){
        console.log(err);
        return false ;
    }
}
