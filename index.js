"use strict";
let crypto = require("crypto");
const IOTA = require('iota.lib.js');
const endpoints = require('ruuvi.endpoints.js')

const headerLength = 8*2;
const dataLength = 16*2;
const nonceLength = 4*2;
const salt = new Buffer("58C71570D459271D", "hex");
const key = new Buffer("0123456789ABCDEF", "ascii");

var iota = new IOTA({
  host: "http://iri1.iota.fm:80"
});

iota.api.getNodeInfo((error, nodeInfo) => {
	console.log("Querying");
    if (error) {
        console.error('getNodeInfo error', error);
    } else {
        console.log('getNodeInfo result', nodeInfo);
    }
});
var targetTag = "9999HELLOIOTAFROMIOTHON9999";
var targetAddress = "999999999999999999999999999999999999999999999999999999999999999999FILTERAESIOTHON"

const searchTags = {'tags': [targetTag] };
const searchAddresses = {'addresses': [targetAddress]};
let transfers = iota.api.findTransactionObjects(searchAddresses, (error, transactions) => {
        if (error) {
          console.error('find error', error);
        } else {
          console.log('transactions found!');
          for(let ii = 0; ii < transactions.length; ii++){
            
            //console.log(transactions[ii].signatureMessageFragment);
            let asciidata = iota.utils.fromTrytes(transactions[ii].signatureMessageFragment.slice(0, transactions[ii].signatureMessageFragment.indexOf("99")));
            let transactionObject = JSON.parse(asciidata);
          	let rawData = transactionObject.rawData;
            let header = new Buffer(rawData.slice(0, headerLength), "hex");
            let ciphertext = new Buffer(rawData.slice(headerLength, headerLength+dataLength), 'hex');
            let nonce = new Buffer(rawData.slice(headerLength+dataLength, headerLength + dataLength + nonceLength), "hex");
            let salted_key = new Buffer(key);
            console.log("Raw data is: ", rawData);

            for(let ii = 0; ii < key.length; ii++){
	          if(ii < 4) salted_key[ii] ^= nonce[ii];
	          if(ii > 7) salted_key[ii] ^= salt[ii-8];
            }

            var decipher = crypto.createDecipheriv("aes-128-ecb", salted_key, '');
            decipher.setAutoPadding(false);
            var result = "03" + decipher.update(ciphertext).toString('hex');
            result += decipher.final().toString('hex');
            console.log("Encryption key is:", salted_key.toString("hex"));
            console.log("Ciphertext is:", ciphertext.toString("hex"));
            console.log("Nonce is:", nonce.toString("hex"));
            console.log("Cleartext is: ", result);
            console.log("");

            let latestSample = endpoints.parse(Buffer.from(result, 'hex'));
            latestSample.timestamp = transactionObject.timestamp;
            latestSample.mac = transactionObject.mac;
            latestSample.rssi = transactionObject.rssi;
            console.log(latestSample);
          }
        }
});

