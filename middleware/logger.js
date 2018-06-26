
 const logger = function(req, res, next) {
     let now = new Date();
     console.log(`${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
     next();
 }

module.exports = {logger};