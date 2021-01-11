interface ICallBack {
    (e : Error, data : any) : void;
}

declare module 'coinspot-api' {

    class Coinspot {
        /**
            * @param key Full access API key
            * @param secret Full access API secret
            * @param readonlyKey Readonly API key
            * @param readonlySecret Readonly API secret
        */
        constructor(key? : string, secret? : string, readonlyKey? : string, readonlySecret? : string);

        /**
            * @param path Relative path for API request eg. '/api/my/coin/deposit'
            * @returns true if the path is in the list of valid paths for the API key pairs available
        */
        checkPath (path : string) : boolean;

        /**
         * @param path Relative path for API request eg. '/api/my/coin/deposit'
         * @param postdata
         * @param callback
         * @param useReadonly Set to true for readonly API - Default false
         * @param cointype Coin ticker eg. 'BTC' 'ETH' etc.
         */
        request (path : string, postdata : any, callback : ICallBack, useReadonly? : boolean, cointype? : string) : void;

        latestPrices (callback : ICallBack) : void

        orders (cointype : string, callback : ICallBack) : void;

        ordersHistory (cointype : string, callback : ICallBack) : void;

        coindeposit (cointype : string, callback : ICallBack) : void;

        sendcoin (cointype : string, amount : number, address : string, callback : ICallBack) : void;

        quotebuy (cointype : string, amount : number, callback : ICallBack) : void;

        quotesell (cointype : string, amount : number, callback : ICallBack) : void;

        balances (callback : ICallBack) : void;

        myorders (callback : ICallBack) : void;

        buy (cointype : string, amount : number, rate : number, callback : ICallBack) : void;

        sell (cointype : string, amount : number, rate : number, callback : ICallBack) : void;

        cancelBuy (id : number, callback : ICallBack) : void;

        cancelSell (id : number, callback : ICallBack) : void;

        spot (callback : ICallBack) : void;

        readonlyBalances (callback : ICallBack) : void;

        readonlyCoinBalance (cointype : string, callback : ICallBack) : void;

        readonlyDepositHistory (callback : ICallBack, startDate? : string, endDate? : string) : void;

        readonlyWithdrawalHistory (callback : ICallBack, startDate? : string, endDate? : string) : void;

        readonlyTransactionHistory (callback : ICallBack, startDate? : string, endDate? : string) : void;

        readonlyCoinTransactionHistory (cointype : string, callback : ICallBack, startDate? : string, endDate? : string) : void;

        readonlyOpenTransactions (callback : ICallBack) : void;

        readonlyOpenCoinTransactions (cointype : string, callback : ICallBack) : void;

        readonlySendReceiveTransactionHistory (callback : ICallBack) : void;

        readonlyAffiliatePayments (callback : ICallBack) : void;

        readonlyReferralPayments (callback : ICallBack) : void;

    }
}