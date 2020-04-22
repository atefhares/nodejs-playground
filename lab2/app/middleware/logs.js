function log(request, response, next) {
  console.log(new Date(), request.method, request.url, "| body => ", request.body);
  next();
}

module.exports = {
  log
};
