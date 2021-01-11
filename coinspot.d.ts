interface ICallBack {
    (e : Error, data : any) : void;
}

declare module 'coinspot-api' {
    /**
     * @param key
     * @param secret
     * @param readonlyKey
     * @param readonlySecret
    */
    class coinspot {
        constructor(key? : string | null, secret? : string | null, readonlyKey? : string | null, readonlySecret? : string | null);

        checkPath (path : string) : boolean;

        request (path : string, postdata : any, callback : ICallBack, useReadonly? : boolean, cointype? : string | null) : void;

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

        readonlyDepositHistory (startDate? : string, endDate? : string, callback : ICallBack) : void;

        readonlyWithdrawalHistory (startDate? : string, endDate? : string, callback : ICallBack) : void;

        readonlyTransactionHistory (startDate? : string, endDate? : string, callback : ICallBack) : void;

        readonlyCoinTransactionHistory (startDate? : string, endDate? : string, cointype : string, callback : ICallBack) : void;

        readonlyOpenTransactions (callback : ICallBack) : void;

        readonlyOpenCoinTransactions (cointype : string, callback : ICallBack) : void;

        readonlySendReceiveTransactionHistory (callback : ICallBack) : void;

        readonlyAffiliatePayments (callback : ICallBack) : void;

        readonlyReferralPayments (callback : ICallBack) : void;

    }
}