"use strict";
let crypto = require("crypto");

const headerLength = 8*2;
const dataLength = 16*2;
const nonceLength = 4*2;
const salt = new Buffer("58C71570D459271D", "hex");
const key = new Buffer("0123456789ABCDEF", "ascii");
//let rawData = "0201061BFF990406C10A750A4208C5390011F93594440A7628C32B3000000000";
let rawData = "0201061BFF99040697559BB9B655C9C1412E8975370E2E1B3781DE4000000000";
let header = new Buffer(rawData.slice(0, headerLength), "hex");
let ciphertext = new Buffer(rawData.slice(headerLength, headerLength+dataLength), 'hex');
let nonce = new Buffer(rawData.slice(headerLength+dataLength, headerLength + dataLength + nonceLength), "hex");
let salted_key = new Buffer(key);


for(let ii = 0; ii < key.length; ii++){
	if(ii < 4) salted_key[ii] ^= nonce[ii];
	if(ii > 7) salted_key[ii] ^= salt[ii-8];
}

console.log("Encryption key is:", salted_key.toString("hex"));
console.log("Ciphertext is:", ciphertext.toString("hex"));
console.log("Nonce is:", nonce.toString("hex"));

var decipher = crypto.createDecipheriv("aes-128-ecb", salted_key, '');
decipher.setAutoPadding(false);
var result = decipher.update(ciphertext).toString('hex');
result += decipher.final().toString('hex');
console.log("Cleartext is: ", result);
