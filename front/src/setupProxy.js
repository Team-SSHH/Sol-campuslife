const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 프록시1 설정
  app.use(
    "/api1",
    createProxyMiddleware({
      target: "https://shbhack.shinhan.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
    })
  );

  // 프록시2 설정
  app.use(
    "/api2",
    createProxyMiddleware({
      target: "http://13.124.41.92:8080/",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    })
  );
};
