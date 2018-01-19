"use strict";
let crypto = require("crypto");

const headerLength = 8*2;
const dataLength = 16*2;
const nonceLength = 4*2;
const salt = new Buffer("58C71570D459271D", "hex");
const key = new Buffer("0123456789ABCDEF", "ascii");
let rawData = "0201061BFF990406C174708A1A99657F65E2CDAFFC082C95989B2C4C00000000";
let header = new Buffer(rawData.slice(0, headerLength), "hex");
let ciphertext = new Buffer(rawData.slice(headerLength, headerLength+dataLength), 'hex');
let nonce = new Buffer(rawData.slice(headerLength+dataLength, headerLength + dataLength + nonceLength), "hex");


for(let ii = 0; ii < key.length; ii++){
	if(ii < 4) key[ii] ^= nonce[ii];
	if(ii > 7) key[ii] ^= salt[ii-8];
}

console.log("Encryption key is:", key.toString("hex"));
console.log("Ciphertext is:", ciphertext.toString("hex"));
console.log("Nonce is:", nonce.toString("hex"));

var decipher = crypto.createDecipheriv("aes-128-ecb", key, '');
decipher.setAutoPadding(false);
var result = decipher.update(ciphertext).toString('hex');
result += decipher.final().toString('hex');
console.log("Cleartext is: ", result);
