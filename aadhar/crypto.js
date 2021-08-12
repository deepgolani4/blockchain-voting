const NodeRSA = require("node-rsa");
const crypto = require("crypto-js");

const { keys } = require("./const");

module.exports = {
  encryptXML: (inXML, sKey) => {
    // console.log(inXML);

    var cipher = crypto.AES.encrypt(inXML, sKey, {
      mode: crypto.mode.CTR,
    });

    // var cipher = crypto.createCipheriv("aes-256-gcm", sKey, IV, {
    //   encoding: "utf-8",
    // });
    // cipher.update(inXML, "utf-8", "base64");
    var encryptedXML = cipher.toString();

    var hmac = crypto.HmacSHA256(inXML, sKey);
    // crypto.createHmac("sha256", sKey);
    // hmac.update(inXML);
    var hmacXML = hmac.toString(crypto.enc.Base64);

    var rsa = new NodeRSA(keys.uidaiAuthStagePub);
    var encryptedSKey = rsa.encrypt(sKey, "base64");

    return {
      encryptedXML,
      hmacXML,
      encryptedSKey,
    };
  },
};
