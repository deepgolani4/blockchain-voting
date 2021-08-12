const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

module.exports = {
  sign: (data) => {
    console.log(data, secret);
    const tkn = jwt.sign(data, secret);

    console.log(tkn);
    return tkn;
  },

  verify: (req, res, next) => {
    try {
      const tkn = req.headers.authorization;
      if (typeof tkn !== "undefined") {
        jwt.verify(tkn, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send("JWTVerifyFailed");
          }
          req.authorizedUser = decoded;
          next();
        });
      } else {
        return res.status(403).send("noAuthHeader");
      }
    } catch (err) {
      console.log(err);
      res.status(503).send("error");
    }
  },
};
