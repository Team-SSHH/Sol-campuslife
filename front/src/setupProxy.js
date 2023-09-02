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
};
