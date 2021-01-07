const util = require("util");
const jwt = require("jsonwebtoken");

const generateToken = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.sign);

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
