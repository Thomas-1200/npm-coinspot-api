export class Coinspot {

	crypto = require('crypto');
 	https = require('https');

	constructor(key, secret, readonlyKey, readonlySecret) {
		this. validPaths = ['/pubapi/latest'];

		if (key && secret) {
			this.key = key;
			this.secret = secret;

			let mainPaths = [
				'/api/orders',
				'/api/orders/history',
				'/api/my/coin/deposit',
				'/api/my/coin/send',
				'/api/quote/buy',
				'/api/quote/sell',
				'/api/my/balances',
				'/api/my/orders',
				'/api/my/buy',
				'/api/my/sell',
				'/api/my/buy/cancel',
				'/api/my/sell/cancel',
				'/api/spot'
			];
			this.validPaths = [...this.validPaths, ...mainPaths];
		}

		if (readonlyKey && readonlySecret) {
			this.readonlyKey = readonlyKey;
			this.readonlySecret = readonlySecret;

			let readonlyPaths = [
				'/api/ro/my/balances',
				'/api/ro/my/balances/:cointype',
				'/api/ro/my/deposits',
				'/api/ro/my/withdrawals',
				'/api/ro/my/transactions',
				'/api/ro/my/transactions/:cointype',
				'/api/ro/my/transactions/open',
				'/api/ro/my/transactions/:cointype/open',
				'/api/ro/my/sendreceive',
				'/api/ro/my/affiliatepayments',
				'/api/ro/my/referralpayments'
			];
			this.validPaths = [...this.validPaths, ...readonlyPaths];
		}
	}

	checkPath (path) {
		if (this.validPaths.indexOf(path) != -1) {
			return true;
		}
		return false
	}

	request (path, postdata = {}, callback, useReadonly = false, cointype = null) {

		if (!this.checkPath(path)) {
			throw `Path is not valid or you do not have the required access to execute this request: ${path}. See https://coinspot.com.au/api for more details.`;
		}

		if (cointype) {
			path = path.replace('cointype', cointype);
		}

		let nonce = new Date().getTime();

		postdata.nonce = nonce;

		let stringmessage = JSON.stringify(postdata);

		let signedMessage;
		let sign;
		let options;

		if (path === '/pubapi/latest') {
			options = {
				rejectUnauthorized: false,
				method: 'POST',
				host: 'www.coinspot.com.au',
				port: 443,
				path: path,
				headers: {
					'Content-Type': 'application/json',
				}
			}
		} else if (useReadonly) {
			signedMessage = crypto.createHmac("sha512", this.readonlySecret);
			signedMessage.update(stringmessage);
			sign = signedMessage.digest('hex');

			options = {
				rejectUnauthorized: false,
				method: 'POST',
				host: 'www.coinspot.com.au',
				port: 443,
				path: path,
				headers: {
					'Content-Type': 'application/json',
					'sign': sign,
					'key': this.readonlyKey
				}
			};
		} else {
			signedMessage = crypto.createHmac("sha512", this.secret);
			signedMessage.update(stringmessage);
			sign = signedMessage.digest('hex');

			options = {
				rejectUnauthorized: false,
				method: 'POST',
				host: 'www.coinspot.com.au',
				port: 443,
				path: path,
				headers: {
					'Content-Type': 'application/json',
					'sign': sign,
					'key': this.key
				}
			};
		}

		let req = https.request(options, function(resp){
			let data = '';
			resp.on('data', function(chunk){
				data += chunk;
			});
			resp.on('end', function(chunk){
				callback(null, data);
			});
		}).on("error", function(e){
			callback(e, data);
		});

		req.write(stringmessage);
		req.end();
	}

	/* ---------------------
		Public API requests
	--------------------- */

	latestPrices (callback) {
		this.request('/pubapi/latest', {}, callback);
	}

	/* ---------------------
		Main API requests
	--------------------- */

	orders (cointype, callback) {
		this.request('/api/orders', {cointype:cointype}, callback);
	}

	ordersHistory (cointype, callback) {
		this.request('/api/orders/history', {cointype:cointype}, callback);
	}

	coindeposit (cointype, callback) {
		this.request('/api/my/coin/deposit', {cointype:cointype}, callback);
	}

	// Removed from API not sure if still works
	sendcoin (cointype, amount, address, callback) {
		this.request('/api/my/coin/send', {cointype:cointype, amount:amount, address:address}, callback);
	}

	quotebuy (cointype, amount, callback) {
		this.request('/api/quote/buy', {cointype:cointype, amount:amount}, callback);
	}

	quotesell (cointype, amount, callback) {
		this.request('/api/quote/sell', {cointype:cointype, amount:amount}, callback);
	}

	balances (callback) {
		this.request('/api/my/balances', {}, callback);
	}

	myorders (callback) {
		this.request('/api/my/orders', {}, callback);
	}

	buy (cointype, amount, rate, callback) {
		var data = {cointype:cointype, amount:amount, rate: rate}
		this.request('/api/my/buy', data, callback);
	}

	sell (cointype, amount, rate, callback) {
		var data = {cointype:cointype, amount:amount, rate: rate}
		this.request('/api/my/sell', data, callback);
	}

	cancelBuy (id, callback) {
		var data = {id:id}
		this.request('/api/my/buy/cancel', data, callback);
	}

	cancelSell (id, callback) {
		var data = {id:id}
		this.request('/api/my/sell/cancel', data, callback);
	}

	// Cant find this in the API
	spot (callback) {
		this.request('/api/spot', {}, callback);
	}

	/* ---------------------
		Readonly API requests
	--------------------- */

	readonlyBalances (callback) {
		this.request('/api/ro/my/balances', {}, callback, true);
	}

	readonlyCoinBalance (cointype, callback) {
		this.request('/api/ro/my/balances/:cointype', {}, callback, true, cointype);
	}

	readonlyDepositHistory (callback, startDate = null, endDate = null) {
		let data = {};
		if (startDate) {
			data.startdate = startDate;
		}
		if (endDate) {
			data.enddate = endDate;
		}
		this.request('/api/ro/my/deposits', data, callback, true);
	}

	readonlyWithdrawalHistory (callback, startDate = null, endDate = null) {
		let data = {};
		if (startDate) {
			data.startdate = startDate;
		}
		if (endDate) {
			data.enddate = endDate;
		}
		this.request('/api/ro/my/withdrawals', data, callback, true);
	}

	readonlyTransactionHistory (callback, startDate = null, endDate = null) {
		let data = {};
		if (startDate) {
			data.startdate = startDate;
		}
		if (endDate) {
			data.enddate = endDate;
		}
		this.request('/api/ro/my/transactions', data, callback, true);
	}

	readonlyCoinTransactionHistory (cointype, callback, startDate = null, endDate = null) {
		let data = {};
		if (startDate) {
			data.startdate = startDate;
		}
		if (endDate) {
			data.enddate = endDate;
		}
		this.request('/api/ro/my/transactions/:cointype', data, callback, true, cointype);
	}

	readonlyOpenTransactions (callback) {
		this.request('/api/ro/my/transactions/open', {}, callback, true);
	}

	readonlyOpenCoinTransactions (cointype, callback) {
		this.request('/api/ro/my/transactions/:cointype/open', {}, callback, true, cointype);
	}

	readonlySendReceiveTransactionHistory (callback) {
		this.request('/api/ro/my/sendreceive', {}, callback, true);
	}

	readonlyAffiliatePayments (callback) {
		this.request('/api/ro/my/affiliatepayments', {}, callback, true);
	}

	readonlyReferralPayments (callback) {
		this.request('/api/ro/my/referralpayments', {}, callback, true);
	}

}