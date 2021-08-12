const builder = require("xmlbuilder");
const crypto = require("crypto");
const { SignedXml, FileKeyInfo } = require("xml-crypto");
const fs = require("fs");
const { encryptXML } = require("./crypto");
const { version, publicData, keys } = require("./const");

const buildPIDBlock = () => {
  var pid = builder.create("Pid");

  const date = new Date(Date.now());
  pid.attribute({
    ver: "2.0",
    ts: date.toISOString().slice(0, 19),
    wadh: "",
  });

  pid.element("Demo");

  return pid.end().toString();
};

const buildReqXML = (uid) => {
  var sKey = crypto.randomBytes(32).toString();

  const pid = buildPIDBlock(); //Encrypted PID Block

  const encryptedPid = encryptXML(pid, sKey);

  const xmlObj = {
    Auth: {
      "@uid": uid,
      "@rc": "Y",
      "@tid": publicData.tid,
      "@ac": publicData.ac,
      "@sa": publicData.sa,
      "@ver": version,
      "@txn": "", //Check
      "@lk": publicData.lk,
      Uses: {
        "@pi": "y",
        "@pa": "n",
        "@pfa": "n",
        "@bio": "n",
        "@bt": "n",
        "@pin": "n",
        "@otp": "n",
      },
      Meta: {},
      Skey: {
        "@ci": publicData.certExpCI,
        "#text": encryptedPid.encryptedSKey,
      },
      Data: {
        "@type": "X",
        "#text": encryptedPid.encryptedXML,
      },
      Hmac: {
        "#text": encryptedPid.hmacXML,
      },
    },
  };

  var xml = builder.create(xmlObj).end({ pretty: true });
  // console.log(xml);
  return xml;
};

const signXML = (xml) => {
  var subjectName =
    "CN=Public AUA for Staging Services,OU=Staging Services,O=Public AUA,L=Bangalore,ST=KA,C=IN";

  function AadhaarKeyInfo() {
    this.getKeyInfo = function (key, prefix) {
      var x509XML = builder
        .create(
          "X509Data",
          { version: "2.0", encoding: "UTF-8", standalone: true },
          { pubID: null, sysID: null },
          {
            allowSurrogateChars: false,
            skipNullAttributes: false,
            headless: true,
            ignoreDecorators: false,
            separateArrayItems: false,
            noDoubleEncoding: false,
            stringify: {},
          }
        )
        .ele("X509Certificate", null, keys.pkcs12Pub)
        .up()
        .ele("X509SubjectName", null, subjectName)
        .end();
      return x509XML;
    };
    this.getKey = function (keyInfo) {};
  }

  var sig = new SignedXml();
  sig.signingKey = fs.readFileSync(__dirname + "/../aadhar_keys/key.pem");
  sig.addReference(
    "//*[local-name(.)='Auth']",
    ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"],
    "http://www.w3.org/2000/09/xmldsig#sha1",
    "",
    "",
    "",
    true
  );
  sig.keyInfoProvider = new AadhaarKeyInfo();

  sig.computeSignature(xml);

  return sig.getSignedXml();
};

module.exports = (uid, bday) => {
  const xml = buildReqXML(uid);
  console.log(xml);
  const signedXML = signXML(xml);
  console.log(signedXML);
  return signedXML;
};
