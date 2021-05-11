const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) next();

    const isCustomAuth = token.length < 500;

    let decodedData;
    if (isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      if (decodedData) req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      if (decodedData) req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = auth;
