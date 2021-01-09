import { createHmac as hmac } from "crypto";
import { request as _request } from 'https';

class coinspot {

	constructor(key, secret) {
		this.key = key;
  		this.secret = secret;
	}

	request = function(path, postdata, callback) {
		var nonce = new Date().getTime();

		var postdata = postdata || {};
		postdata.nonce = nonce;

		var stringmessage = JSON.stringify(postdata);
		var signedMessage = hmac("sha512", this.secret);

		signedMessage.update(stringmessage);

		var sign = signedMessage.digest('hex');

		var options = {
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

		var req = _request(options, function(resp){
			var data = '';
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
		Main API requests
	--------------------- */

	orders = function(cointype, callback) {
		request('/api/orders', {cointype:cointype}, callback);
	}

	ordersHistory = function(cointype, callback) {
		request('/api/orders/history', {cointype:cointype}, callback);
	}

	coindeposit = function(cointype, callback) {
		request('/api/my/coin/deposit', {cointype:cointype}, callback);
	}

	// Removed from API not sure if still works
	sendcoin = function(cointype, amount, address, callback) {
		request('/api/my/coin/send', {cointype:cointype, amount:amount, address:address}, callback);
	}

	quotebuy = function(cointype, amount, callback) {
		request('/api/quote/buy', {cointype:cointype, amount:amount}, callback);
	}

	quotesell = function(cointype, amount, callback) {
		request('/api/quote/sell', {cointype:cointype, amount:amount}, callback);
	}

	balances = function(callback) {
		request('/api/my/balances', {}, callback);
	}

	myorders = function(callback) {
		request('/api/my/orders', {}, callback);
	}

	buy = function(cointype, amount, rate, callback) {
		var data = {cointype:cointype, amount:amount, rate: rate}
		request('/api/my/buy', data, callback);
	}

	sell = function(cointype, amount, rate, callback) {
		var data = {cointype:cointype, amount:amount, rate: rate}
		request('/api/my/sell', data, callback);
	}

	cancelBuy = function(id, callback) {
		var data = {id:id}
		request('/api/my/buy/cancel', data, callback);
	}

	cancelSell = function(id, callback) {
		var data = {id:id}
		request('/api/my/sell/cancel', data, callback);
	}

	// Cant find this in the API
	spot = function(callback) {
		request('/api/spot', {}, callback);
	}
}

export default coinspot;