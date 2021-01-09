interface ICallBack {
    (e : Error, data : any) : void;
}

declare module 'coinspot-api' {
    /**
     * @param key
     * @param secret
    */
    class coinspot {
        constructor(key : string, secret : string);

        request (path : string, postdata : any, callback : ICallBack) : void;

        sendcoin (cointype : string, amount : number, address : string, callback : ICallBack) : void;

        coindeposit (cointype : string, callback : ICallBack) : void;

        quotebuy (cointype : string, amount : number, callback : ICallBack) : void;

        quotesell (cointype : string, amount : number, callback : ICallBack) : void;

        balances (callback : ICallBack) : void;

        orders (cointype : string, callback : ICallBack) : void;

        myorders (callback : ICallBack) : void;

        spot (callback : ICallBack) : void;

        buy (cointype : string, amount : number, rate : number, callback : ICallBack) : void;

        sell (cointype : string, amount : number, rate : number, callback : ICallBack) : void;
    }
}